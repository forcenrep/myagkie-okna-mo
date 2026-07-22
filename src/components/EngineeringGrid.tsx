import {
  CircleGauge,
  Grip,
  Layers,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Snowflake,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const colors = [
  { name: "Белый", value: "#f0eee6" },
  { name: "Бежевый", value: "#cbb99c" },
  { name: "Коричневый глянец", value: "#6f4b39", glossy: true },
  { name: "Коричневый матовый", value: "#59443a" },
  { name: "Светло-серый", value: "#b9bdba" },
  { name: "Серый", value: "#777d7b" },
  { name: "Тёмно-серый", value: "#3d4241" },
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
          <span>Характеристики · ПВХ 700</span>
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
          <span>Климатический тест</span>
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
        <div className="engineering-card-topline"><span>Защита от солнца</span><span>УФ</span></div>
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
          <span>Система креплений</span>
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
        className="engineering-card engineering-card-polyurethane"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline"><span>Материал повышенной прочности</span><Layers size={19} aria-hidden="true" /></div>
        <div className="polyurethane-visual" aria-hidden="true"><span>ПУ</span><i /><i /><i /></div>
        <div className="engineering-copy"><strong>Полиуретановая плёнка</strong><p>Эластичный и износостойкий материал для объектов с повышенной нагрузкой.</p></div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-tint"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline"><span>Прозрачность · Тонировка</span><ScanLine size={19} aria-hidden="true" /></div>
        <div className="tint-visual"><span>прозрачная</span><span>светлая</span><span>тёмная</span></div>
        <div className="engineering-copy"><strong>Два уровня затемнения</strong><p>Светлая тонировка уменьшает блики, тёмная добавляет больше приватности.</p></div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-accessories"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.24 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline"><span>Комплектация проёма</span><LockKeyhole size={19} aria-hidden="true" /></div>
        <div className="accessory-list" aria-label="Варианты фурнитуры">
          <span><Grip />Молнии</span><span><LockKeyhole />Замки</span><span><CircleGauge />Люверсы</span><span><Wrench />Скобы</span>
        </div>
        <div className="engineering-copy"><strong>Разнообразная фурнитура</strong><p>Подбираем молнии, замки, люверсы и крепления под способ открывания и конструкцию.</p></div>
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
            <span>Подбор под фасад</span>
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
              <span className={"glossy" in color && color.glossy ? "is-glossy" : ""} style={{ backgroundColor: color.value }} />
              <small>{color.name}</small>
            </div>
          ))}
        </div>
      </motion.article>

      <motion.article
        className="engineering-card engineering-card-mesh"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="engineering-card-topline"><span>Защита от насекомых и когтей</span><ShieldCheck size={19} aria-hidden="true" /></div>
        <div className="mesh-options" aria-label="Цвета москитной сетки антикошка"><span>Серая</span><span>Чёрная</span></div>
        <div className="engineering-copy"><strong>Москитная сетка «Антикошка»</strong><p>Усиленная сетка в сером и чёрном цвете для проветривания и дополнительной защиты.</p></div>
      </motion.article>
    </div>
  );
}
