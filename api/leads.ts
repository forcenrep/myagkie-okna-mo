const MAX_PHOTO_SIZE = 4 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store" },
});

const escapeHtml = (value: unknown) => String(value ?? "").replace(/[&<>]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
})[character] || character);

function allowedOrigins() {
  return new Set([
    "https://myagkie-okna-mo.vercel.app",
    "https://мягкиеокна-мо.рф",
    "https://xn----8sbnb4abecb3b7a.xn--p1ai",
    ...String(process.env.ALLOWED_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean),
  ]);
}

export function GET() {
  return json({
    ok: true,
    collectionEnabled: process.env.DATA_COLLECTION_ENABLED !== "false",
    telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
  });
}

export async function POST(request: Request) {
  if (process.env.DATA_COLLECTION_ENABLED === "false") {
    return json({ error: "Онлайн-заявки пока недоступны. Свяжитесь с нами по телефону." }, 503);
  }

  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins().has(origin)) return json({ error: "Недопустимый источник запроса" }, 403);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Lead delivery is not configured: missing Telegram environment variables");
    return json({ error: "Приём заявок временно недоступен. Позвоните нам по телефону." }, 503);
  }

  try {
    const data = await request.formData();
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const consent = String(data.get("consent") || "");
    const consentVersion = String(data.get("consentVersion") || "");
    const expectedConsentVersion = process.env.CONSENT_VERSION || "DRAFT-1";
    const formId = String(data.get("formId") || "unknown").slice(0, 80);
    const photoValue = data.get("photo");
    const photo = photoValue instanceof File && photoValue.size > 0 ? photoValue : null;

    if (consent !== "true" || consentVersion !== expectedConsentVersion) {
      return json({ error: "Не подтверждено актуальное согласие" }, 400);
    }
    if (!/^\+?[0-9 ()-]{10,22}$/.test(phone) || name.length > 100) {
      return json({ error: "Проверьте имя и номер телефона" }, 400);
    }
    if (photo && (!ALLOWED_PHOTO_TYPES.has(photo.type) || photo.size > MAX_PHOTO_SIZE)) {
      return json({ error: "Фото должно быть в формате JPG, PNG или WebP и весить не более 4 МБ" }, 400);
    }

    const caption = `<b>Новая заявка с сайта</b>\n\n<b>Имя:</b> ${escapeHtml(name || "не указано")}\n<b>Телефон:</b> <code>${escapeHtml(phone)}</code>\n<b>Форма:</b> ${escapeHtml(formId)}\n<b>Получена:</b> ${escapeHtml(new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }))} МСК`;
    const apiBase = String(process.env.TELEGRAM_API_BASE || "https://api.telegram.org").replace(/\/$/, "");
    let telegramResponse: Response;

    if (photo) {
      const telegramData = new FormData();
      telegramData.set("chat_id", chatId);
      telegramData.set("caption", caption);
      telegramData.set("parse_mode", "HTML");
      telegramData.set("protect_content", "true");
      telegramData.set("photo", photo, photo.name || "object-photo");
      telegramResponse = await fetch(`${apiBase}/bot${token}/sendPhoto`, {
        method: "POST",
        body: telegramData,
        signal: AbortSignal.timeout(15_000),
      });
    } else {
      telegramResponse = await fetch(`${apiBase}/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: caption, parse_mode: "HTML", protect_content: true }),
        signal: AbortSignal.timeout(15_000),
      });
    }

    const telegramResult = await telegramResponse.json().catch(() => ({})) as { ok?: boolean; description?: string };
    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error("Telegram delivery failed", telegramResponse.status, telegramResult.description || "Unknown error");
      return json({ error: "Не удалось передать заявку. Позвоните нам по телефону." }, 502);
    }

    return json({ ok: true }, 201);
  } catch (error) {
    console.error("Lead handler failed", error instanceof Error ? error.message : error);
    return json({ error: "Не удалось обработать заявку. Попробуйте ещё раз." }, 500);
  }
}
