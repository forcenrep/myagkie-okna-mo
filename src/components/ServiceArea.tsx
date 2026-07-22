import { MapPin, Navigation, Route } from "lucide-react";
import { Reveal } from "./Reveal";

const cities = ["Химки", "Мытищи", "Балашиха", "Подольск", "Одинцово", "Истра", "Дмитров", "Сергиев Посад", "Коломна", "Серпухов", "Домодедово", "Раменское"];

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
          <div className="coverage-outline" aria-hidden="true"><span /></div>
          <div className="map-center"><span><MapPin size={18} />Москва</span><small>центр зоны выездов</small></div>
          <span className="area-pin area-pin-one"><MapPin /></span><span className="area-pin area-pin-two"><MapPin /></span><span className="area-pin area-pin-three"><MapPin /></span><span className="area-pin area-pin-four"><MapPin /></span>
          <div className="map-card"><Navigation size={22} /><div><strong>Работаем по всей области</strong><span>До 150 км от МКАД и дальше — по договорённости</span></div></div>
        </Reveal>
        <div className="city-strip"><Route size={20} aria-hidden="true" />{cities.map((city) => <span key={city}>{city}</span>)}<strong>и другие</strong></div>
      </div>
    </section>
  );
}
