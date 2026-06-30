import { ArrowUpRight, Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <Reveal className="contact-card">
          <div className="contact-glare" aria-hidden="true" />
          <div className="contact-copy">
            <span className="section-kicker section-kicker-light">
              Начнём с простого
            </span>
            <h2>Покажите веранду — предложим решение</h2>
            <p>
              Оставьте номер или пришлите фотографию. Подскажем по материалам,
              срокам и ориентировочной стоимости.
            </p>
            <div className="contact-links">
              <a href="tel:+79267254858">
                <Phone size={18} aria-hidden="true" />
                +7 (926) 725-48-58
              </a>
              <a href="mailto:myagkie-okna-mo@mail.ru">
                <Mail size={18} aria-hidden="true" />
                myagkie-okna-mo@mail.ru
              </a>
              <span>
                <Clock3 size={18} aria-hidden="true" />
                Ежедневно, 08:00–22:00
              </span>
            </div>
          </div>

          <div className="contact-form" aria-label="Форма предварительного расчёта">
            <label>
              <span>Ваше имя</span>
              <input type="text" placeholder="Например, Алексей" />
            </label>
            <label>
              <span>Номер телефона</span>
              <input type="tel" placeholder="+7 (___) ___-__-__" />
            </label>
            <button className="button button-light contact-button" type="button">
              Получить расчёт
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <div className="messenger-note">
              <MessageCircle size={16} aria-hidden="true" />
              Можно ответить в Telegram или WhatsApp
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
