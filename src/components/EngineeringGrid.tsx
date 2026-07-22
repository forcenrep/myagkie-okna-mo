import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, CircleGauge, Grip, LockKeyhole, ShieldCheck, Snowflake, Sun, Wrench } from "lucide-react";
import { useState } from "react";

const materials = [
  {
    short: "ПВХ 700",
    title: "Прозрачная ПВХ-плёнка",
    description: "Плотное полотно для ежедневной уличной эксплуатации. Сохраняет обзор и стабильную геометрию проёма.",
    facts: ["0,7 мм", "до −40 °C"],
    visual: "pvc",
  },
  {
    short: "Полиуретан",
    title: "Полиуретановая плёнка",
    description: "Более эластичный и износостойкий материал для объектов с повышенной нагрузкой и активным использованием.",
    facts: ["эластичная", "износостойкая"],
    visual: "polyurethane",
  },
  {
    short: "Тонировка",
    title: "Два уровня затемнения",
    description: "Светлая тонировка смягчает блики, тёмная создаёт больше приватности без ощущения глухой стены.",
    facts: ["светлая", "тёмная"],
    visual: "tint",
  },
] as const;

const colors = [
  { name: "Белый", value: "#f0eee6" },
  { name: "Бежевый", value: "#cbb99c" },
  { name: "Коричневый глянец", value: "#6f4b39", glossy: true },
  { name: "Коричневый матовый", value: "#59443a" },
  { name: "Светло-серый", value: "#b9bdba" },
  { name: "Серый", value: "#777d7b" },
  { name: "Тёмно-серый", value: "#3d4241" },
] as const;

const hardware = [
  { icon: Grip, label: "Молнии" },
  { icon: LockKeyhole, label: "Замки" },
  { icon: CircleGauge, label: "Люверсы" },
  { icon: Wrench, label: "Поворотные скобы" },
] as const;

export function EngineeringGrid() {
  const [activeMaterial, setActiveMaterial] = useState(0);
  const material = materials[activeMaterial];

  return (
    <div className="engineering-experience">
      <div className="material-lab">
        <div className="material-stage">
          <div className="material-stage-index">0{activeMaterial + 1}<span>/ 03</span></div>
          <AnimatePresence mode="wait">
            <motion.div className={`material-stage-visual material-stage-${material.visual}`} key={material.visual} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .45 }}>
              {material.visual === "pvc" && <img src="/images/pvc-film.jpg" alt="Прозрачная ПВХ-плёнка в рулоне" />}
              {material.visual === "polyurethane" && <div className="poly-sheet" aria-hidden="true"><i /><i /><span>ПУ</span></div>}
              {material.visual === "tint" && <div className="tint-samples" aria-label="Светлая и тёмная тонировка"><span>Светлая</span><span>Тёмная</span></div>}
            </motion.div>
          </AnimatePresence>
          <div className="material-stage-caption"><span>Материал / образец</span><strong>{material.short}</strong></div>
        </div>

        <div className="material-selector">
          <span className="material-selector-kicker">Выберите материал</span>
          <AnimatePresence mode="wait">
            <motion.div key={material.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <h3>{material.title}</h3><p>{material.description}</p>
              <div className="material-facts">{material.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
            </motion.div>
          </AnimatePresence>
          <div className="material-tabs">
            {materials.map((item, index) => <button className={activeMaterial === index ? "is-active" : ""} type="button" onClick={() => setActiveMaterial(index)} key={item.short}><span>0{index + 1}</span><strong>{item.short}</strong><ArrowDownRight /></button>)}
          </div>
        </div>
      </div>

      <div className="engineering-spec-line" aria-label="Основные характеристики">
        <div><Snowflake /><span>Рабочая температура</span><strong>до −40 °C</strong></div>
        <div><CircleGauge /><span>Толщина ПВХ</span><strong>700 микрон</strong></div>
        <div><Sun /><span>Солнечный свет</span><strong>УФ-стабилизатор</strong></div>
        <div><ShieldCheck /><span>Эксплуатация</span><strong>круглый год</strong></div>
      </div>

      <div className="engineering-assembly">
        <section className="hardware-feature">
          <div className="hardware-photo"><img src="/images/window-hardware.png" alt="Фурнитура для мягких окон" /><span>Комплектуем под конструкцию</span></div>
          <div className="hardware-copy"><span className="engineering-label">Система открывания</span><h3>Фурнитура — это часть сценария</h3><p>Подбираем крепления не «по умолчанию», а под частоту открывания, материал основания и геометрию каждого проёма.</p><div className="hardware-options">{hardware.map(({ icon: Icon, label }) => <span key={label}><Icon />{label}</span>)}</div></div>
        </section>

        <section className="mesh-feature">
          <div className="mesh-copy"><span className="engineering-label">Проветривание и защита</span><h3>Антикошка</h3><p>Усиленная москитная сетка в двух цветах.</p></div>
          <div className="mesh-swatch mesh-swatch-gray"><span>Серая</span></div>
          <div className="mesh-swatch mesh-swatch-black"><span>Чёрная</span></div>
        </section>
      </div>

      <section className="finish-studio">
        <div className="finish-heading"><div><span className="engineering-label">Визуальная комплектация</span><h3>Окантовка в цвет фасада</h3></div><p>Семь вариантов — от светлых нейтральных до глубоких тёмных. Глянцевый коричневый выделен отражением света.</p></div>
        <div className="finish-rack" aria-label="Доступные цвета окантовки">
          {colors.map((color, index) => <motion.div className="finish-sample" whileHover={{ y: -12 }} transition={{ type: "spring", stiffness: 320, damping: 20 }} key={color.name}><span className={"glossy" in color && color.glossy ? "is-glossy" : ""} style={{ backgroundColor: color.value }}><i>0{index + 1}</i></span><small>{color.name}</small></motion.div>)}
        </div>
      </section>
    </div>
  );
}
