import { Navigation } from "lucide-react";
import { Reveal } from "./Reveal";

export function ServiceArea() {
  return (
    <section className="section area-section" id="area">
      <div className="container">
        <Reveal className="area-heading">
          <div><span className="section-kicker">География выездов</span><h2>Москва и вся Московская область</h2></div>
          <p>Выезжаем на замер в города, посёлки и СНТ. Расстояние не мешает точно снять размеры и привезти образцы.</p>
        </Reveal>
        <Reveal className="area-map" delay={0.08}>
          <iframe title="Карта Москвы и Московской области" src="https://yandex.ru/map-widget/v1/?ll=37.617698%2C55.755864&z=8" loading="lazy" />
          <div className="map-card"><Navigation size={22} /><div><strong>Работаем по всей Московской области</strong><span>Выезжаем на замер в города, посёлки и СНТ</span></div></div>
        </Reveal>
      </div>
    </section>
  );
}
