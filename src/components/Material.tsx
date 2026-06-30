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
            Не ограничиваемся словами «качественная плёнка». Показываем
            параметры материала, систему креплений и варианты отделки, которые
            будут зафиксированы в комплектации.
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
