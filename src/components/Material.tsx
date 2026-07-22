import { images } from "../data";
import { EngineeringGrid } from "./EngineeringGrid";
import { Reveal } from "./Reveal";

export function Material() {
  return (
    <section className="section material-section" id="material">
      <img
        className="material-background"
        src={images.lifestyle}
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <Reveal className="material-heading">
          <div>
            <span className="section-kicker">Инженерная часть</span>
            <h2>Материал, фурнитура и точность изготовления</h2>
          </div>
          <p>
            ПВХ и полиуретановая плёнка, два уровня тонировки, усиленная
            москитная сетка, фурнитура и семь вариантов окантовки — всё
            подбираем под конкретный объект.
          </p>
        </Reveal>
        <EngineeringGrid />
        <p className="engineering-footnote">
          Точные характеристики, комплектация и гарантийные условия
          фиксируются в договоре после замера.
        </p>
      </div>
    </section>
  );
}
