import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { Phone } from "lucide-react";

export function FloatingContacts() {
  return <aside className="floating-contacts" aria-label="Быстрая связь">
    <div className="floating-socials">
      <a href="https://t.me/+79267254858" aria-label="Telegram"><SiTelegram /></a>
      <a href="https://wa.me/79267254858" aria-label="WhatsApp"><SiWhatsapp /></a>
      <a className="max-link" href="https://max.ru/" aria-label="Написать в MAX">
        <img src="/images/max-messenger.png" alt="" />
      </a>
    </div>
    <a className="floating-call" href="tel:+79267254858"><span className="floating-phone-icon"><Phone size={20} /></span><span><strong>Бесплатный звонок</strong><small>Ежедневно · 09:00–19:00</small></span></a>
  </aside>;
}
