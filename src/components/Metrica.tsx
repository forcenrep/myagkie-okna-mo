import { useEffect } from "react";
import { siteConfig } from "../config";

export function Metrica() {
  useEffect(() => {
    if (!siteConfig.metricaId || location.pathname.startsWith("/admin")) return;
    const update = (event?: Event) => {
      const detail = (event as CustomEvent<boolean>)?.detail;
      const raw = document.cookie.split("; ").find(v => v.startsWith("cookie_preferences="))?.split("=")[1];
      let allowed = detail === true;
      try { if (detail === undefined && raw) allowed = JSON.parse(decodeURIComponent(raw)).analytics === true; } catch { allowed = false; }
      if (!allowed) {
        const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym;
        ym?.(Number(siteConfig.metricaId), "destruct");
        document.getElementById("yandex-metrica")?.remove();
        return;
      }
      if (document.getElementById("yandex-metrica")) return;
      const s = document.createElement("script"); s.id = "yandex-metrica"; s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js";
      s.onload = () => { const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym; ym?.(Number(siteConfig.metricaId), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false }); };
      document.head.appendChild(s);
    };
    const goal = () => { const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym; ym?.(Number(siteConfig.metricaId), "reachGoal", "lead_submit_success"); };
    update(); window.addEventListener("analytics-choice", update); window.addEventListener("lead-submit-success", goal);
    return () => { window.removeEventListener("analytics-choice", update); window.removeEventListener("lead-submit-success", goal); };
  }, []);
  return null;
}
