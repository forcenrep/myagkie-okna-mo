import { Phone } from "lucide-react";

export function FloatingContacts() {
  return <aside className="floating-contacts" aria-label="Быстрая связь">
    <a className="floating-call" href="tel:+79267254858"><Phone size={20} /><span><strong>Бесплатный звонок</strong><small>09:00–19:00</small></span></a>
    <div className="floating-socials">
      <a href="https://t.me/+79267254858" aria-label="Telegram">TG</a>
      <a href="https://wa.me/79267254858" aria-label="WhatsApp">WA</a>
      <a href="https://max.ru/" aria-label="MAX">M</a>
      <a href="tel:+79267254858" aria-label="Позвонить"><Phone size={17} /></a>
    </div>
  </aside>;
}
