import { MapPin, Navigation, Route } from "lucide-react";
import { Reveal } from "./Reveal";

const cities = ["Химки", "Мытищи", "Балашиха", "Подольск", "Одинцово", "Истра", "Дмитров", "Сергиев Посад", "Коломна", "Серпухов", "Домодедово", "Раменское"];

const markers = [
  { city: "Истра", className: "area-marker-istra" },
  { city: "Дмитров", className: "area-marker-dmitrov" },
  { city: "Сергиев Посад", className: "area-marker-sergiev" },
  { city: "Одинцово", className: "area-marker-odintsovo" },
  { city: "Балашиха", className: "area-marker-balashiha" },
  { city: "Подольск", className: "area-marker-podolsk" },
  { city: "Раменское", className: "area-marker-ramenskoe" },
  { city: "Коломна", className: "area-marker-kolomna" },
] as const;

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
          <div className="area-markers" aria-hidden="true">
            {markers.map((marker) => <span className={`area-marker ${marker.className}`} key={marker.city}><MapPin />{marker.city}</span>)}
          </div>
          <div className="map-card"><Navigation size={22} /><div><strong>Работаем по всей области</strong><span>До 150 км от МКАД и дальше — по договорённости</span></div></div>
        </Reveal>
        <div className="city-strip"><Route size={20} aria-hidden="true" />{cities.map((city) => <span key={city}>{city}</span>)}<strong>и другие</strong></div>
      </div>
    </section>
  );
}
