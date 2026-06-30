import { Plus } from "lucide-react";
import { faqItems } from "../data";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <Reveal className="faq-heading">
          <span className="section-kicker">Частые вопросы</span>
          <h2>Что важно знать до заказа</h2>
          <p>
            Если вашего вопроса нет в списке, позвоните — спокойно разберём
            особенности объекта.
          </p>
          <a className="phone-large" href="tel:+79267254858">
            +7 (926) 725-48-58
          </a>
        </Reveal>

        <Reveal className="faq-list" delay={0.08}>
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>
                <span>{item.question}</span>
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
