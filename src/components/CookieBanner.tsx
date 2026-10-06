import { useEffect, useState } from "react";
import { siteConfig } from "../config";

const COOKIE = "cookie_preferences";
const getChoice = () => document.cookie.split("; ").find(v => v.startsWith(`${COOKIE}=`))?.split("=")[1];
const eraseMetricaCookies = () => document.cookie.split(";").map(v => v.split("=")[0].trim()).filter(n => n.startsWith("_ym_") || n === "yandexuid").forEach(n => { document.cookie = `${n}=; Max-Age=0; path=/; SameSite=Lax`; });

export function CookieBanner() {
  const [open, setOpen] = useState(() => !getChoice());
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);
  const choose = (allowed: boolean) => {
    const value = encodeURIComponent(JSON.stringify({ analytics: allowed, version: siteConfig.analyticsConsentVersion, at: new Date().toISOString() }));
    document.cookie = `${COOKIE}=${value}; Max-Age=${180 * 86400}; path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    if (!allowed) eraseMetricaCookies();
    setOpen(false);
    window.dispatchEvent(new CustomEvent("analytics-choice", { detail: allowed }));
  };
  if (!open) return null;
  return <aside className="cookie-banner" aria-label="Настройки cookie"><p>Используем технические файлы cookie для работы сайта. С вашего согласия подключим Яндекс Метрику для анализа посещений и эффективности рекламы. Можно отказаться от аналитики.</p><div className="cookie-links"><a href="/cookies">Cookie</a><a href="/analytics-consent">Согласие на аналитику</a><a href="/privacy">Политика</a></div><div className="cookie-actions"><button type="button" onClick={() => choose(true)}>Разрешить аналитику</button><button type="button" onClick={() => choose(false)}>Без аналитики</button></div></aside>;
}
