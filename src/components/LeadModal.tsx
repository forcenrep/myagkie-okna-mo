import { ArrowRight, Camera, Check, Clock3, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useEffect, useState } from "react";

export function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);
  const close = () => { setSent(false); onClose(); };
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <AnimatePresence>{open && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e) => e.target === e.currentTarget && close()}>
    <motion.div className={`lead-modal ${sent ? "is-sent" : ""}`} role="dialog" aria-modal="true" aria-label="Заказать консультацию" initial={{opacity:0,y:30,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.97}}>
      <button className="modal-close" type="button" onClick={close} aria-label="Закрыть"><X /></button>
      {sent ? <div className="success-screen"><motion.div className="success-mark" initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} transition={{type:"spring",delay:.15}}><Check size={38} /></motion.div><span>Заявка уже у нас</span><h2>Спасибо! Скоро на вашей веранде станет спокойнее.</h2><p>Свяжемся в выбранное время, уточним детали и подскажем следующий шаг.</p><button className="button" type="button" onClick={close}>Вернуться на сайт</button></div> : <>
        <div className="modal-intro"><span>Бесплатная консультация</span><h2>Расскажите о вашей веранде</h2><p>Займёт около минуты. Фото необязательно, но поможет дать более точный ответ.</p></div>
        <form className="lead-form" onSubmit={submit}>
          <label><span>Как к вам обращаться</span><input required name="name" placeholder="Алексей" autoFocus /></label>
          <label><span>Номер телефона</span><input required name="phone" type="tel" placeholder="+7 (___) ___-__-__" /></label>
          <fieldset><legend><Clock3 size={16} />Когда удобно позвонить</legend><div className="time-options">{["09:00–12:00","12:00–15:00","15:00–19:00"].map((time, i) => <label key={time}><input type="radio" name="time" defaultChecked={i===0} value={time}/><span>{time}</span></label>)}</div></fieldset>
          <label className="file-field"><Camera size={21} /><span><strong>Добавить фото веранды</strong><small>По желанию · JPG, PNG</small></span><input type="file" accept="image/*" /></label>
          <button className="button lead-submit" type="submit">Отправить заявку <ArrowRight size={18}/></button>
          <small className="privacy-note">Нажимая кнопку, вы соглашаетесь на обработку данных для обратной связи.</small>
        </form>
      </>}
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
