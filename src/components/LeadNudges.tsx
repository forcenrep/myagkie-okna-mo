import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "../config";
import { QuickLeadForm } from "./QuickLeadForm";

type NudgeKind = "timer" | "exit";
const DISMISS_KEY = "lead-promo-dismissed-until";
const SESSION_KEY = "lead-promo-shown";
const DAY = 86_400_000;

function isSuppressed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1" || Number(localStorage.getItem(DISMISS_KEY) || 0) > Date.now();
  } catch {
    return false;
  }
}

export function LeadNudges({ leadModalOpen }: { leadModalOpen: boolean }) {
  const [kind, setKind] = useState<NudgeKind | null>(null);
  const leadModalOpenRef = useRef(leadModalOpen);
  const shownRef = useRef(false);

  useEffect(() => { leadModalOpenRef.current = leadModalOpen; }, [leadModalOpen]);

  useEffect(() => {
    if (!siteConfig.collectionEnabled || isSuppressed()) return;
    let timer = 0;
    let timerStarted = false;

    const show = (nextKind: NudgeKind) => {
      if (shownRef.current || leadModalOpenRef.current || isSuppressed()) return;
      shownRef.current = true;
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* storage can be unavailable */ }
      setKind(nextKind);
    };
    const startTimer = () => {
      if (timerStarted) return;
      timerStarted = true;
      timer = window.setTimeout(() => show("timer"), 35_000);
      window.removeEventListener("scroll", startTimer);
      window.removeEventListener("pointerdown", startTimer);
      window.removeEventListener("keydown", startTimer);
    };
    const onMouseOut = (event: MouseEvent) => {
      if (window.innerWidth < 900 || event.relatedTarget || event.clientY > 4) return;
      show("exit");
    };
    const onLeadSuccess = () => {
      try { localStorage.setItem(DISMISS_KEY, String(Date.now() + 30 * DAY)); } catch { /* storage can be unavailable */ }
    };

    window.addEventListener("scroll", startTimer, { passive: true });
    window.addEventListener("pointerdown", startTimer, { passive: true });
    window.addEventListener("keydown", startTimer);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("lead-submit-success", onLeadSuccess);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", startTimer);
      window.removeEventListener("pointerdown", startTimer);
      window.removeEventListener("keydown", startTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("lead-submit-success", onLeadSuccess);
    };
  }, []);

  useEffect(() => {
    if (!kind) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setKind(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [kind]);

  const close = () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now() + DAY)); } catch { /* storage can be unavailable */ }
    setKind(null);
  };

  const copy = kind === "exit"
    ? { title: "Уже уходите?", description: "Оставьте номер — подберём выгодный вариант и перезвоним без навязчивых продаж." }
    : { title: "Быстрый расчёт за один звонок", description: "Оставьте номер — уточним размеры и назовём ориентировочную стоимость." };

  return <AnimatePresence>{kind && <motion.div className="lead-nudge-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && close()}>
    <motion.aside className="lead-nudge" role="dialog" aria-modal="true" aria-label={copy.title} initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }}>
      <button className="lead-nudge-close" type="button" onClick={close} aria-label="Закрыть предложение"><X aria-hidden="true" /></button>
      <span className="lead-nudge-kicker">Бесплатная консультация</span>
      <QuickLeadForm formId={`lead-${kind}`} title={copy.title} description={copy.description} onSuccess={() => { try { localStorage.setItem(DISMISS_KEY, String(Date.now() + 30 * DAY)); } catch { /* storage can be unavailable */ } }} />
    </motion.aside>
  </motion.div>}</AnimatePresence>;
}
