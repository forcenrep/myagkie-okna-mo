import { ArrowUpRight } from "lucide-react";
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
      </div>
    </section>
  );
}
