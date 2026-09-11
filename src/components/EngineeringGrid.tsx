import { X, CircleGauge, ShieldCheck, Snowflake, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SiteImage } from "./SiteImage";
import imageManifest from "../image-manifest.json";

const materials = [
  {
    short: "ПВХ 750",
    title: "Прозрачная ПВХ-плёнка",
    description: "Плотное полотно для ежедневной уличной эксплуатации. Сохраняет обзор и стабильную геометрию проёма.",
    facts: ["750 микрон", "до −40 °C"],
    visual: "pvc",
    image: "/images/engineering/pvh-plenka.jpg",
  },
  {
    short: "Полиуретан",
    title: "Полиуретановая плёнка",
    description: "Более эластичный и износостойкий материал для объектов с повышенной нагрузкой и активным использованием.",
    facts: ["700 микрон", "эластичная", "износостойкая"],
    visual: "polyurethane",
    image: "/images/engineering/poliuretanovaya-plenka.jpg",
  },
  {
    short: "Тонировка",
    title: "Два уровня затемнения",
    description: "Светлая тонировка смягчает блики, тёмная создаёт больше приватности без ощущения глухой стены.",
    facts: ["750 микрон", "светлая", "тёмная"],
    visual: "tint",
    image: "/images/engineering/tonirovka.jpg",
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

const finishKeys = ["white", "beige", "brown-gloss", "brown-matte", "light-grey", "grey", "dark-grey"] as const;
const imageAssets = imageManifest as Record<string, { variants: Array<{ width: number; src: string }> }>;
const finishPhotos = finishKeys.map((key) =>
  Object.keys(imageAssets).find((path) =>
    path.startsWith("/images/finishes/") && path.split("/").pop()?.split(".")[0] === key,
  ),
);

function finishVariant(source: string, targetWidth: number) {
  const variants = imageAssets[source]?.variants ?? [];
  return variants.find((variant) => variant.width >= targetWidth)?.src ?? variants.at(-1)?.src;
}

const hardware = [
  {
    title: "Бортовая скоба",
    description: "Металлическое поворотное крепление: полотно надевается через люверс, а пружинный механизм прижимает его к основанию и поддерживает натяжение.",
    facts: ["поворотная фиксация", "металлическая"],
    images: ["/images/engineering/bortovaya-skoba.jpg"],
  },
  {
    title: "Пластиковая скоба",
    description: "Съёмное поворотное крепление для регулярного открывания мягкого окна. Можно подобрать в цвет окантовки и фасада.",
    facts: ["съёмное крепление", "несколько цветов"],
    images: ["/images/engineering/plastikovye-skoby.jpg"],
  },
  {
    title: "Французский замок",
    description: "Компактный металлический фиксатор для частого открывания: полотно надевается через овальный люверс и освобождается одним поворотом замка.",
    facts: ["быстрое открывание", "компактный"],
    images: ["/images/engineering/francuzskiy-zamok.jpg"],
  },
  {
    title: "Скоба-ремень",
    description: "Гибкий ремень фиксирует край полотна на металлической скобе. Подходит для аккуратного натяжения и удобного снятия мягкого окна.",
    facts: ["гибкая фиксация", "три цвета"],
    images: [
      "/images/engineering/skoba-remen-chernaya.jpg",
      "/images/engineering/skoba-remen-belaya.jpg",
      "/images/engineering/skoba-remen-korichnevaya.jpg",
    ],
  },
  {
    title: "Пряжка для сворачивания",
    description: "Ремень с пряжкой удерживает поднятое полотно в рулоне, чтобы проём оставался открытым и окно не разворачивалось от ветра.",
    facts: ["фиксация рулона", "в цвет окантовки"],
    images: ["/images/engineering/pryazhka-svorachivanie.jpg"],
  },
] as const;

export function EngineeringGrid() {
  const [selectedColor, setSelectedColor] = useState(0);
  const finishPhoto = finishPhotos[selectedColor];
  const finishSection = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [detail, setDetail] = useState<{ title: string; image: string } | null>(null);
  const enlarge = (title: string, image: string) => {
    setDetail({ title, image });
    dialog.current?.showModal();
  };

  useEffect(() => {
    const section = finishSection.current;
    if (!section) return;

    const preload = () => {
      const targetWidth = window.innerWidth <= 700 ? 640 : 960;
      finishPhotos.forEach((source) => {
        if (!source) return;
        const src = finishVariant(source, targetWidth);
        if (!src) return;
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        preload();
        observer.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="engineering-experience">
      <div className="materials-editorial">
        {materials.map((item, index) => <article className={`material-story material-story-${item.visual}`} key={item.visual}>
          <button className="catalog-photo" type="button" onClick={() => enlarge(item.title, item.image)} aria-label={`Рассмотреть: ${item.title}`}>
            <SiteImage src={item.image} alt={item.title} sizes="(max-width: 700px) 92vw, (max-width: 1000px) 46vw, 42vw" />
          </button>
          <div className="catalog-copy">
            <span className="catalog-number">0{index + 1} / {item.short}</span>
            <h3>{item.visual === "tint" ? "Тонированная плёнка" : item.title}</h3>
            {item.visual === "tint" && <span className="catalog-subtitle">{item.title}</span>}
            <p>{item.description}</p>
            <div className="catalog-facts">{item.facts.map(fact => <span key={fact}>{fact}</span>)}</div>
          </div>
        </article>)}
      </div>
      <div className="engineering-spec-line" aria-label="Основные характеристики">
        <div><Snowflake /><span>Рабочая температура</span><strong>до −40 °C</strong></div>
        <div><CircleGauge /><span>Толщина ПВХ</span><strong>750 микрон</strong></div>
        <div><Sun /><span>Солнечный свет</span><strong>УФ-стабилизатор</strong></div>
        <div><ShieldCheck /><span>Эксплуатация</span><strong>круглый год</strong></div>
      </div>
      <section className="hardware-section">
        <div className="hardware-section-heading">
          <span className="section-kicker">Системы крепления · 5 вариантов</span>
          <h3>Фурнитура</h3>
        </div>
        <div className="hardware-catalog">
          {hardware.map((item, index) => <article className={`hardware-story hardware-story-${index}`} key={item.title}>
            <div className={`hardware-images ${item.images.length > 1 ? "hardware-triptych" : ""}`}>
              {item.images.map((image, i) => <button className="catalog-photo" type="button" key={image} onClick={() => enlarge(item.title, image)} aria-label={`Рассмотреть: ${item.title}${item.images.length > 1 ? `, ${["чёрный", "белый", "коричневый"][i]}` : ""}`}>
                <SiteImage src={image} alt={`${item.title}${item.images.length > 1 ? ` — ${["чёрный", "белый", "коричневый"][i]}` : ""}`} sizes="(max-width: 700px) 92vw, 33vw" />
              </button>)}
            </div>
            <div className="catalog-copy">
              <span className="catalog-number">0{index + 1}</span>
              <h4>{item.title}</h4><p>{item.description}</p>
              <div className="catalog-facts">{item.facts.map(fact => <span key={fact}>{fact}</span>)}</div>
            </div>
          </article>)}
        </div>
      </section>
      <section className="mesh-feature">
        <div className="mesh-copy"><span className="engineering-label">Проветривание и защита</span><h3>Москитная сетка — антикошка</h3><p>Усиленная москитная сетка в двух цветах.</p></div>
        <button className="catalog-photo mesh-catalog-photo" type="button" onClick={() => enlarge("Москитная сетка — антикошка", "/images/engineering/antikoshka.jpg")} aria-label="Рассмотреть москитную сетку">
          <SiteImage src="/images/engineering/antikoshka.jpg" alt="Москитная сетка антикошка в сером и чёрном цветах" sizes="90vw" />
          <span className="mesh-color-labels"><span>Серая</span><span>Чёрная</span></span>
        </button>
      </section>
      <dialog ref={dialog} className="catalog-dialog" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
        <div className="catalog-dialog-head"><h3>{detail?.title}</h3><button type="button" onClick={() => dialog.current?.close()} aria-label="Закрыть фото"><X /></button></div>
        {detail && <SiteImage src={detail.image} alt={detail.title} sizes="90vw" loading="eager" />}
      </dialog>
      <section className="finish-studio" ref={finishSection}>
        <div className="finish-heading"><div><span className="engineering-label">Визуальная комплектация</span><h3>Окантовка в цвет фасада</h3></div><p>Семь вариантов — от светлых нейтральных до глубоких тёмных. Глянцевый коричневый выделен отражением света.</p></div>
        <div className="finish-configurator">
          <div className="finish-preview" aria-live="polite">
            {finishPhoto ? <SiteImage src={finishPhoto} alt={`Окантовка на фасаде: ${colors[selectedColor].name}`} /> : <div className="finish-placeholder"><span className="finish-outline" style={{ borderColor: colors[selectedColor].value }} aria-hidden="true" /><span>Фото на фасаде скоро появится</span><small>Здесь будет реальный пример выбранной окантовки</small></div>}
            <div className="finish-preview-caption"><span style={{ background: colors[selectedColor].value }} />{colors[selectedColor].name}</div>
          </div>
          <div className="finish-picker">
            <p className="finish-instruction"><span aria-hidden="true">↙</span> Выберите цвет — посмотрите, как он сочетается с фасадом</p>
            <div className="finish-color-options" aria-label="Цвет окантовки">
              {colors.map((color, index) => <button type="button" aria-pressed={selectedColor === index} onClick={() => setSelectedColor(index)} key={color.name}><span style={{ background: color.value }} className={"glossy" in color ? "finish-gloss" : ""} /><strong>{color.name}</strong><span className="finish-selected" aria-hidden="true">{selectedColor === index ? "✓" : "→"}</span></button>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
