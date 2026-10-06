import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import multer from "multer";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import sharp from "sharp";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.resolve(process.env.DATA_DIR || path.join(root, ".local-data"));
const uploadDir = path.join(dataDir, "uploads"); fs.mkdirSync(uploadDir, { recursive: true, mode: 0o700 });
const db = new Database(path.join(dataDir, "leads.sqlite")); db.pragma("journal_mode = WAL"); db.pragma("foreign_keys = ON");
db.exec(`CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, idempotency_key TEXT UNIQUE NOT NULL, name TEXT, phone TEXT NOT NULL, photo_name TEXT, created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', purge_at TEXT NOT NULL, closed_at TEXT);
CREATE TABLE IF NOT EXISTS consent_proofs (lead_id TEXT PRIMARY KEY REFERENCES leads(id) ON DELETE CASCADE, server_time TEXT NOT NULL, version TEXT NOT NULL, text_hash TEXT NOT NULL, action TEXT NOT NULL, form_id TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS telegram_delivery (lead_id TEXT PRIMARY KEY REFERENCES leads(id) ON DELETE CASCADE, status TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0, next_attempt TEXT NOT NULL, last_error TEXT, sent_at TEXT, message_id INTEGER);
CREATE TABLE IF NOT EXISTS access_log (id INTEGER PRIMARY KEY, at TEXT NOT NULL, action TEXT NOT NULL, lead_id TEXT);`);
const app = express(); const production = process.env.NODE_ENV === "production";
app.disable("x-powered-by"); app.set("trust proxy", 1); app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "same-site" } })); app.use(cookieParser()); app.use(express.json({ limit: "32kb" }));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024, files: 1 } });
const sessions = new Map<string, number>(); const attempts = new Map<string, { count: number; reset: number }>();
const sha = (v: string | Buffer) => crypto.createHash("sha256").update(v).digest("hex"); const now = () => new Date().toISOString(); const days = (n: number) => new Date(Date.now() + n * 864e5).toISOString();
const origins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:4173,http://localhost:3000").split(",");
const originGuard: express.RequestHandler = (req, res, next) => { const origin = req.get("origin"); if (origin && !origins.includes(origin)) return res.status(403).json({ error: "Недопустимый источник запроса" }); next(); };
const auth: express.RequestHandler = (req, res, next) => { const token = req.cookies.admin_session; const expiry = token && sessions.get(sha(token)); if (!expiry || expiry < Date.now()) return res.status(401).json({ error: "Требуется вход" }); next(); };
const rate = (req: express.Request, key: string, max: number, windowMs: number) => { const id = `${key}:${req.ip}`; const current = attempts.get(id); const t = Date.now(); if (!current || current.reset < t) { attempts.set(id, { count: 1, reset: t + windowMs }); return true; } current.count++; return current.count <= max; };
app.get("/api/health", (_req, res) => res.json({ ok: true, collectionEnabled: process.env.DATA_COLLECTION_ENABLED === "true" }));
app.post("/api/leads", originGuard, upload.single("photo"), async (req, res) => {
  if (process.env.DATA_COLLECTION_ENABLED !== "true") return res.status(503).json({ error: "Онлайн-заявки пока недоступны. Свяжитесь с нами по телефону." });
  if (!rate(req, "lead", 8, 3600_000)) return res.status(429).json({ error: "Слишком много запросов" });
  const { name = "", phone = "", consent, consentVersion, formId } = req.body; const expected = process.env.CONSENT_VERSION;
  if (consent !== "true" || !expected || consentVersion !== expected) return res.status(400).json({ error: "Не подтверждено актуальное согласие" });
  if (!/^\+?[0-9 ()-]{10,22}$/.test(phone) || String(name).length > 100 || String(formId).length > 80) return res.status(400).json({ error: "Проверьте поля формы" });
  const key = req.get("Idempotency-Key") || ""; if (!/^[\w-]{16,100}$/.test(key)) return res.status(400).json({ error: "Некорректный ключ запроса" });
  const previous = db.prepare("SELECT id FROM leads WHERE idempotency_key=?").get(key) as { id: string } | undefined; if (previous) return res.json({ id: previous.id });
  const id = crypto.randomUUID(); let photoName: string | null = null;
  try {
    if (req.file) { const meta = await sharp(req.file.buffer).metadata(); if (!["jpeg", "png", "webp"].includes(meta.format || "")) return res.status(415).json({ error: "Недопустимый формат фото" }); photoName = `${crypto.randomUUID()}.webp`; await sharp(req.file.buffer, { failOn: "error" }).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(uploadDir, photoName)); }
    const at = now(); const consentText = process.env.CONSENT_TEXT || `consent:${expected}`;
    db.transaction(() => { db.prepare("INSERT INTO leads VALUES (?,?,?,?,?,?, 'new',?,NULL)").run(id, key, String(name).trim() || null, String(phone).trim(), photoName, at, days(90)); db.prepare("INSERT INTO consent_proofs VALUES (?,?,?,?,?,?)").run(id, at, expected, sha(consentText), "checkbox-and-submit", String(formId || "unknown")); if (process.env.TELEGRAM_FULL_LEADS_ENABLED === "true") db.prepare("INSERT INTO telegram_delivery(lead_id,next_attempt) VALUES(?,?)").run(id, at); })();
    void deliverTelegramLead(id); return res.status(201).json({ id });
  } catch { if (photoName) fs.rmSync(path.join(uploadDir, photoName), { force: true }); return res.status(500).json({ error: "Не удалось сохранить заявку" }); }
});
const html = (value: unknown) => String(value ?? "").replace(/[&<>]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]!);
async function deliverTelegramLead(id: string) {
  if (process.env.TELEGRAM_FULL_LEADS_ENABLED !== "true") return;
  const token = process.env.TELEGRAM_BOT_TOKEN; const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  const lead = db.prepare("SELECT id,name,phone,photo_name,created_at FROM leads WHERE id=?").get(id) as { id: string; name?: string; phone: string; photo_name?: string; created_at: string } | undefined;
  const delivery = db.prepare("SELECT attempts,status FROM telegram_delivery WHERE lead_id=?").get(id) as { attempts: number; status: string } | undefined;
  if (!lead || !delivery || delivery.status === "sent") return;
  const caption = `<b>Новая заявка с сайта</b>\n\n<b>Имя:</b> ${html(lead.name || "не указано")}\n<b>Телефон:</b> <code>${html(lead.phone)}</code>\n<b>Получена:</b> ${html(new Date(lead.created_at).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }))} МСК`;
  const apiBase = (process.env.TELEGRAM_API_BASE || "https://api.telegram.org").replace(/\/$/, "");
  try {
    let response: Response;
    if (lead.photo_name) {
      const body = new FormData(); body.set("chat_id", chat); body.set("caption", caption); body.set("parse_mode", "HTML"); body.set("protect_content", "true");
      const bytes = await sharp(path.join(uploadDir, path.basename(lead.photo_name))).jpeg({ quality: 88 }).toBuffer(); body.set("photo", new Blob([bytes], { type: "image/jpeg" }), "object.jpg");
      response = await fetch(`${apiBase}/bot${token}/sendPhoto`, { method: "POST", body, signal: AbortSignal.timeout(15_000) });
    } else {
      response = await fetch(`${apiBase}/bot${token}/sendMessage`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: chat, text: caption, parse_mode: "HTML", protect_content: true }), signal: AbortSignal.timeout(15_000) });
    }
    const result = await response.json().catch(() => ({})) as { ok?: boolean; result?: { message_id?: number }; description?: string };
    if (!response.ok || !result.ok) throw new Error(result.description || `Telegram HTTP ${response.status}`);
    db.prepare("UPDATE telegram_delivery SET status='sent',attempts=attempts+1,sent_at=?,message_id=?,last_error=NULL WHERE lead_id=?").run(now(), result.result?.message_id || null, id);
  } catch (error) {
    const attempts = delivery.attempts + 1; const delayMinutes = Math.min(60, 2 ** Math.min(attempts, 6));
    db.prepare("UPDATE telegram_delivery SET status=?,attempts=?,next_attempt=?,last_error=? WHERE lead_id=?").run(attempts >= 10 ? "failed" : "pending", attempts, new Date(Date.now() + delayMinutes * 60_000).toISOString(), String(error instanceof Error ? error.message : error).slice(0, 300), id);
  }
}
app.post("/api/admin/login", originGuard, async (req, res) => { if (!rate(req, "login", 6, 15 * 60_000)) return res.status(429).json({ error: "Вход временно ограничен" }); const hash = process.env.ADMIN_PASSWORD_HASH || ""; if (req.body.username !== process.env.ADMIN_USERNAME || !hash || !(await bcrypt.compare(String(req.body.password || ""), hash))) return res.status(401).json({ error: "Неверные данные" }); const token = crypto.randomBytes(32).toString("base64url"); sessions.set(sha(token), Date.now() + 8 * 3600_000); res.cookie("admin_session", token, { httpOnly: true, secure: production, sameSite: "strict", maxAge: 8 * 3600_000, path: "/" }); res.status(204).end(); });
app.get("/api/admin/leads", auth, (_req, res) => res.json(db.prepare("SELECT l.id,l.name,l.phone,l.photo_name,l.created_at,l.status,t.status AS telegram_status FROM leads l LEFT JOIN telegram_delivery t ON t.lead_id=l.id ORDER BY l.created_at DESC").all()));
app.get("/api/admin/leads/:id/photo", auth, (req, res) => { const row = db.prepare("SELECT photo_name FROM leads WHERE id=?").get(req.params.id) as { photo_name?: string } | undefined; if (!row?.photo_name) return res.sendStatus(404); res.setHeader("Cache-Control", "no-store"); res.type("webp").sendFile(path.join(uploadDir, path.basename(row.photo_name))); });
const removeLead = (id: string) => { const row = db.prepare("SELECT photo_name FROM leads WHERE id=?").get(id) as { photo_name?: string } | undefined; db.prepare("DELETE FROM leads WHERE id=?").run(id); if (row?.photo_name) fs.rmSync(path.join(uploadDir, path.basename(row.photo_name)), { force: true }); };
app.post("/api/admin/leads/:id/close", originGuard, auth, (req, res) => { db.prepare("UPDATE leads SET status='closed', closed_at=?, purge_at=? WHERE id=?").run(now(), days(30), req.params.id); db.prepare("INSERT INTO access_log(at,action,lead_id) VALUES(?,?,?)").run(now(), "close", req.params.id); res.sendStatus(204); });
app.post("/api/admin/leads/:id/delete", originGuard, auth, (req, res) => { removeLead(req.params.id); db.prepare("INSERT INTO access_log(at,action,lead_id) VALUES(?,?,?)").run(now(), "delete", req.params.id); res.sendStatus(204); });
const purge = () => { (db.prepare("SELECT id FROM leads WHERE purge_at <= ?").all(now()) as { id: string }[]).forEach(r => removeLead(r.id)); db.prepare("DELETE FROM access_log WHERE at <= ?").run(new Date(Date.now() - 30 * 864e5).toISOString()); };
const retryTelegram = () => { const rows = db.prepare("SELECT lead_id FROM telegram_delivery WHERE status='pending' AND next_attempt<=? LIMIT 20").all(now()) as { lead_id: string }[]; rows.forEach(row => void deliverTelegramLead(row.lead_id)); };
setInterval(purge, 6 * 3600_000).unref(); setInterval(retryTelegram, 60_000).unref(); purge(); retryTelegram();
if (fs.existsSync(path.join(root, "dist"))) { app.use(express.static(path.join(root, "dist"))); app.use((_req, res) => res.sendFile(path.join(root, "dist", "index.html"))); }
app.listen(Number(process.env.PORT || 3000), () => console.log(`Server listening on ${process.env.PORT || 3000}`));
