import { ArrowRight, Camera, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useEffect, useState } from "react";
import { siteConfig } from "../config";
import { formatPhone, submitLead } from "../lib/leads";

export function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);
  const close = () => { setSent(false); setPhone(""); setConsent(false); setFile(null); setStatus(""); onClose(); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus("");
    if (!siteConfig.collectionEnabled) { setStatus("Онлайн-заявки пока недоступны. Свяжитесь с нами по телефону."); return; }
    if (!consent) { setStatus("Для отправки отметьте согласие на обработку данных."); return; }
    if (file && file.size > 4 * 1024 * 1024) { setStatus("Фото должно весить не более 4 МБ."); return; }
    const form = event.currentTarget; const data = new FormData(form);
    if (file) data.set("photo", file);
    setSending(true);
    try {
      await submitLead(data, "lead-modal");
      setSent(true);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Не удалось отправить заявку"); }
    finally { setSending(false); }
  };
  return <AnimatePresence>{open && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e) => e.target === e.currentTarget && close()}>
    <motion.div className={`lead-modal ${sent ? "is-sent" : ""}`} role="dialog" aria-modal="true" aria-label="Заказать консультацию" initial={{opacity:0,y:30,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.97}}>
      <button className="modal-close" type="button" onClick={close} aria-label="Закрыть"><X /></button>
      {sent ? <div className="success-screen"><motion.div className="success-mark" initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} transition={{type:"spring",delay:.15}}><Check size={38} /></motion.div><span>Заявка уже у нас</span><h2>Спасибо! Скоро на вашей веранде станет <em>прозрачнее.</em></h2><p>Свяжемся в ближайшее время, уточним детали и подскажем следующий шаг.</p><button className="button" type="button" onClick={close}>Вернуться на сайт</button></div> : <>
        <div className="modal-intro"><span>Бесплатная консультация</span><h2>Расскажите о вашей веранде</h2><p>Займёт около минуты. Фото необязательно, но поможет дать более точный ответ.</p></div>
        <form className="lead-form" onSubmit={submit}>
          {!siteConfig.collectionEnabled && <div className="collection-notice">Онлайн-заявки пока недоступны. Свяжитесь с нами по телефону: <a href="tel:+79267254858" target="_blank" rel="noreferrer">+7 (926) 725-48-58</a>.</div>}
          <label><span>Как к вам обращаться</span><input name="name" placeholder="Алексей" autoFocus /></label>
          <label><span>Номер телефона</span><input required name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} placeholder="+7 (___) ___-__-__" /></label>
          <label className="file-field"><Camera size={21} /><span><strong>{file ? file.name : "Добавить фото веранды"}</strong><small>Прикрепляйте только фото объекта без людей, документов и других лишних персональных данных. JPG, PNG или WebP, до 4 МБ.</small></span><span className="file-button">Выбрать фото</span><input type="file" name="photo" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} /></label>
          <label className="consent-field"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /><span>Даю <a href="/consent" target="_blank">согласие на обработку персональных данных</a> для рассмотрения заявки и обратной связи. Отдельно доступна <a href="/privacy" target="_blank">Политика обработки персональных данных</a>.</span></label>
          <p className="privacy-note">Заявка предназначена для консультации и предварительного расчёта. Условия изготовления и монтажа согласовываются отдельно.</p>
          {status && <p className="form-status" role="alert">{status}</p>}
          <button className="button lead-submit" type="submit" disabled={sending || !siteConfig.collectionEnabled}>{sending ? "Отправляем…" : "Отправить заявку"} <ArrowRight size={18}/></button>
        </form>
      </>}
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
