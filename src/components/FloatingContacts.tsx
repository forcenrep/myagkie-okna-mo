import { SiMax, SiTelegram, SiWhatsapp } from "react-icons/si";

export function FloatingContacts() {
  return <aside className="floating-contacts" aria-label="Быстрая связь">
    <div className="floating-socials">
      <a href="https://t.me/+79267254858" aria-label="Telegram"><SiTelegram /></a>
      <a href="https://wa.me/79267254858" aria-label="WhatsApp"><SiWhatsapp /></a>
      <a href="https://max.ru/" aria-label="MAX"><SiMax /></a>
    </div>
    <a className="floating-call" href="tel:+79267254858"><span><strong>Бесплатный звонок</strong><small>+7 (926) 725-48-58 · 09:00–19:00</small></span></a>
  </aside>;
}
