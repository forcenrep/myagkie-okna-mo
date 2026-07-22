import {
  CircleGauge,
  ScanLine,
  Snowflake,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const colors = [
  { name: "Белый", value: "#f0eee6" },
  { name: "Бежевый", value: "#cbb99c" },
  { name: "Коричневый", value: "#665044" },
  { name: "Графит", value: "#343b38" },
  { name: "Зелёный", value: "#405948" },
] as const;

export function EngineeringGrid() {
  return (
    <div className="engineering-grid">
      <motion.article
        className="engineering-card engineering-card-thickness"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline">
          <span>SPEC / PVC-700</span>
          <CircleGauge size={19} aria-hidden="true" />
        </div>
        <div className="engineering-photo-wrap engineering-film-photo">
          <img
            src="/images/pvc-film.jpg"
            alt="Рулон прозрачной ПВХ-плёнки"
            loading="lazy"
          />
          <motion.span
            className="engineering-photo-badge"
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            0,7 мм
          </motion.span>
        </div>
        <div className="engineering-copy">
          <strong>Плёнка 700 микрон</strong>
          <p>
            Плотное прозрачное полотно для уличной эксплуатации и стабильной
            геометрии проёма.
          </p>
        </div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-frost"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.06 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline">
          <span>CLIMATE TEST</span>
          <Snowflake size={19} aria-hidden="true" />
        </div>
        <div className="frost-visual">
          <div className="temperature-scale" aria-hidden="true">
            <motion.span
              initial={{ height: "8%" }}
              whileInView={{ height: "78%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div>
            <strong>−40 °C</strong>
            <span>нижняя граница эксплуатации</span>
          </div>
        </div>
        <div className="engineering-copy">
          <strong>Морозостойкость</strong>
          <p>Полотно рассчитано на круглогодичное использование.</p>
        </div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-uv"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.12 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-photo-wrap engineering-sun-photo">
          <img
            src="/images/bright-sun.jpg"
            alt="Яркое солнце в голубом небе"
            loading="lazy"
          />
        </div>
        <div className="engineering-copy">
          <strong>УФ-стабилизатор</strong>
          <p>Снижает риск помутнения и пожелтения материала на солнце.</p>
        </div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-hardware"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.18 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline">
          <span>FIXING SYSTEM</span>
          <Wrench size={19} aria-hidden="true" />
        </div>
        <div className="engineering-photo-wrap engineering-hardware-photo">
          <img
            src="/images/window-hardware.png"
            alt="Поворотные скобы для крепления мягких окон"
            loading="lazy"
          />
        </div>
        <div className="engineering-copy">
          <strong>Фурнитура и крепления</strong>
          <p>Люверсы, поворотные скобы и ремни подбираются под конструкцию.</p>
        </div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-tint"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline"><span>VISIBILITY / TINT</span><ScanLine size={19} aria-hidden="true" /></div>
        <div className="tint-visual"><span>прозрачная</span><span>тонированная</span></div>
        <div className="engineering-copy"><strong>Плёнка под ваш сценарий</strong><p>Прозрачная сохраняет максимум света, тонированная уменьшает блики и добавляет приватности.</p></div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-colors"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.22 }}
      >
        <div className="color-copy">
          <div className="engineering-card-topline">
            <span>FACADE MATCHING</span>
          </div>
          <strong>Окантовка в цвет фасада</strong>
          <p>
            Подбираем оттенок, чтобы мягкие окна стали частью архитектуры, а не
            отдельной конструкцией.
          </p>
        </div>
        <div className="color-swatches" aria-label="Доступные цвета окантовки">
          {colors.map((color) => (
            <div className="color-swatch" key={color.name}>
              <span style={{ backgroundColor: color.value }} />
              <small>{color.name}</small>
            </div>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
