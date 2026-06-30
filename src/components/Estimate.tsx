import { ArrowRight, Camera, Palette, Ruler, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";

const factors = [
  { icon: Ruler, label: "Размер и форма проёмов" },
  { icon: Palette, label: "Цвет и ширина окантовки" },
  { icon: Wrench, label: "Крепления и фурнитура" },
] as const;

export function Estimate() {
  return (
    <section className="section estimate-section">
      <div className="container estimate-grid">
        <Reveal className="estimate-copy">
          <span className="section-kicker">Предварительный расчёт</span>
          <h2>Стоимость без сюрпризов после замера</h2>
          <p>
            Цена зависит не только от площади. Сначала подбираем конструкцию
            под ваш объект, затем фиксируем итоговую сумму в договоре.
          </p>
          <div className="factor-list">
            {factors.map((factor) => {
              const Icon = factor.icon;
              return (
                <div className="factor-row" key={factor.label}>
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  <span>{factor.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="estimate-card" delay={0.08}>
          <div className="estimate-card-icon">
            <Camera size={28} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span className="estimate-label">Самый быстрый способ</span>
          <h3>Пришлите фотографию веранды</h3>
          <p>
            По снимку и примерным размерам подготовим ориентир по стоимости до
            выезда мастера.
          </p>
          <a className="button button-light" href="#contact">
            Получить расчёт
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <small>Без обязательств и навязчивых звонков</small>
        </Reveal>
      </div>
    </section>
  );
}
