import { ArrowUpRight, Clock3, FolderOpen, MapPin, Ruler } from "lucide-react";
import { images } from "../data";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <Reveal className="section-heading project-heading">
          <div>
            <span className="section-kicker">Наши работы</span>
            <h2>Видно качество. Не видно границы.</h2>
          </div>
          <a className="text-link" href="#contact">
            Обсудить свой объект
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Reveal>

        <div className="project-gallery">
          {images.projects.map((project, index) => (
            <Reveal
              className={`project-gallery-card project-gallery-card-${index + 1}`}
              delay={index * 0.08}
              key={project.id}
            >
              <figure>
                <img src={project.src} alt={project.title} loading="lazy" />
                <figcaption>
                  <span>{project.meta}</span>
                  <strong>{project.title}</strong>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="case-heading"><span className="section-kicker">Реальные кейсы</span><h3>От задачи — к готовому результату</h3></div>
        <div className="case-folders">
          {[
            { title: "Терраса загородного дома", place: "Истринский район", size: "26 м²", time: "монтаж за 1 день", image: images.projects[0].src },
            { title: "Веранда для круглого года", place: "Одинцовский район", size: "18 м²", time: "монтаж за 1 день", image: images.projects[1].src },
            { title: "Садовая беседка", place: "Раменский район", size: "14 м²", time: "монтаж за 6 часов", image: images.projects[4].src },
          ].map((item, index) => <Reveal className="case-folder" delay={index * .08} key={item.title}>
            <div className="case-tab"><FolderOpen size={18} />Кейс {String(index + 1).padStart(2,"0")}</div>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="case-info"><h4>{item.title}</h4><div><span><MapPin size={15}/>{item.place}</span><span><Ruler size={15}/>{item.size}</span><span><Clock3 size={15}/>{item.time}</span></div></div>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}
