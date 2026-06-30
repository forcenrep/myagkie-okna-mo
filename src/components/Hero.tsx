import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  CookingPot,
  House,
  Layers3,
  MapPinned,
  Snowflake,
  Store,
  Trees,
} from "lucide-react";
import { motion } from "motion/react";
import { images } from "../data";
import { GlassButton } from "./GlassButton";

const facts = [
  { icon: Layers3, value: "700", label: "микрон — плотность ПВХ" },
  { icon: Snowflake, value: "−40°", label: "рабочая температура" },
  { icon: Clock3, value: "1 день", label: "обычно занимает монтаж" },
] as const;

const objectTypes = [
  { icon: House, label: "Веранды" },
  { icon: Trees, label: "Террасы" },
  { icon: Store, label: "Беседки" },
  { icon: CookingPot, label: "Летние кухни" },
] as const;

export function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-region">
            <MapPinned size={21} strokeWidth={1.7} aria-hidden="true" />
            <span>
              Работаем по всей
              <strong>Московской области</strong>
            </span>
          </div>
          <h1>
            На веранде
            <span className="serif-accent"> по‑прежнему светло.</span>
            <br />
            Только без непогоды.
          </h1>
          <p className="hero-lead">
            Изготавливаем мягкие окна точно под ваши проёмы. Защитим террасу
            от ветра, дождя и снега, сохранив открытый вид на участок.
          </p>
          <div className="hero-actions">
            <GlassButton
              href="#contact"
              icon={<ArrowUpRight size={18} aria-hidden="true" />}
            >
              Узнать стоимость
            </GlassButton>
            <GlassButton
              href="#projects"
              variant="secondary"
              icon={<ArrowDown size={17} aria-hidden="true" />}
            >
              Посмотреть работы
            </GlassButton>
          </div>
          <ul className="hero-facts" aria-label="Основные характеристики">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <li key={fact.value}>
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  <span>
                    <strong>{fact.value}</strong>
                    <small>{fact.label}</small>
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={images.hero}
            alt="Светлая веранда, защищённая прозрачными мягкими окнами"
          />
        </motion.div>
      </div>
      <div className="container object-types" aria-label="Типы объектов">
        {objectTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div key={type.label}>
              <Icon size={24} strokeWidth={1.45} aria-hidden="true" />
              <span>{type.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
