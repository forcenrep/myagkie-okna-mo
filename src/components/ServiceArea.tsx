import { SiteImage } from "./SiteImage";
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
          <SiteImage
            sizes="90vw" src="/images/moscow-region-map-4k.jpg"
            alt="Карта Москвы и Московской области"
            loading="lazy"
          />
          <div className="map-card"><Navigation size={22} /><div><strong>Работаем по всей Московской области</strong><span>Выезжаем на замер в города, посёлки и СНТ</span></div></div>
        </Reveal>
      </div>
    </section>
  );
}
