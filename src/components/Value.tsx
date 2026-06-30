import { CloudRain, Eye, ShieldCheck, Wind } from "lucide-react";
import { images } from "../data";
import { RainOverlay } from "./RainOverlay";
import { Reveal } from "./Reveal";

const benefits = [
  {
    icon: Wind,
    title: "Без сквозняка",
    text: "Ветер остаётся снаружи, а веранда — светлой и открытой визуально.",
  },
  {
    icon: CloudRain,
    title: "Без дождя и снега",
    text: "Мебель, пол и текстиль защищены от косых осадков и грязи.",
  },
  {
    icon: Eye,
    title: "Без потери вида",
    text: "Прозрачная плёнка сохраняет ощущение сада прямо перед вами.",
  },
  {
    icon: ShieldCheck,
    title: "С гарантией",
    text: "Материал, комплектация, стоимость и сроки фиксируются в договоре.",
  },
] as const;

export function Value() {
  return (
    <section className="section value-section" id="comfort">
      <div className="container">
        <Reveal className="section-heading split-heading">
          <div>
            <span className="section-kicker">Комфорт без капитального остекления</span>
            <h2>Не закрываем веранду. Продлеваем её сезон.</h2>
          </div>
          <p>
            Мягкие окна незаметно защищают пространство и сворачиваются вверх,
            когда снова хочется полностью открыть террасу.
          </p>
        </Reveal>

        <div className="value-layout">
          <Reveal className="lifestyle-card">
            <img
              src={images.lifestyle}
              alt="Уютная терраса с видом на природу через мягкие окна"
              loading="lazy"
            />
            <div className="storm-shade" aria-hidden="true" />
            <RainOverlay />
            <div className="lifestyle-overlay">
              <span>За окном</span>
              <strong>дождь и ветер</strong>
            </div>
            <div className="lifestyle-overlay lifestyle-overlay-right">
              <span>На веранде</span>
              <strong>светло и спокойно</strong>
            </div>
          </Reveal>

          <div className="benefit-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal
                  className="benefit-card"
                  delay={index * 0.06}
                  key={benefit.title}
                >
                  <div className="benefit-icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
