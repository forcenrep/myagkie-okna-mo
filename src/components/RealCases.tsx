import { ArrowUpRight, FolderOpen, Images, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { images } from "../data";
import { Reveal } from "./Reveal";

const folders = [
  {
    title: "Беседки",
    description: "Компактные садовые беседки и открытые зоны отдыха",
    place: "Раменское · Домодедово",
    photos: [images.projects[4], images.projects[0], images.projects[2]],
  },
  {
    title: "Веранды",
    description: "Веранды частных домов для защиты от дождя, ветра и снега",
    place: "Истра · Одинцово",
    photos: [images.projects[1], images.projects[0], images.projects[4]],
  },
  {
    title: "Кирпичные строения",
    description: "Проёмы террас и летних кухонь в кирпичных зданиях",
    place: "Подольск · Балашиха",
    photos: [images.projects[3], images.projects[1], images.projects[0]],
  },
] as const;

export function RealCases() {
  return (
    <section className="section cases-section" id="cases">
      <div className="container">
        <Reveal className="section-heading cases-heading">
          <div>
            <span className="section-kicker">Реальные кейсы</span>
            <h2>Откройте папку с объектами</h2>
          </div>
          <p>Три типа построек — внутри живые примеры монтажа из Московской области.</p>
        </Reveal>

        <div className="case-folders">
          {folders.map((folder, folderIndex) => (
            <Reveal delay={folderIndex * 0.08} key={folder.title}>
              <motion.a
                className="case-folder"
                href="#contact"
                aria-label={`${folder.title}: посмотреть примеры и обсудить объект`}
                initial="rest"
                whileHover="hover"
                whileFocus="hover"
                whileTap={{ scale: 0.985 }}
              >
                <span className="case-tab"><FolderOpen size={18} />Папка {String(folderIndex + 1).padStart(2, "0")}</span>
                <span className="case-photo-stack" aria-hidden="true">
                  {folder.photos.map((photo, photoIndex) => (
                    <motion.img
                      src={photo.src}
                      alt=""
                      loading="lazy"
                      key={photo.id}
                      variants={{
                        rest: { rotate: (photoIndex - 1) * 2, y: photoIndex * 5, x: 0 },
                        hover: { rotate: (photoIndex - 1) * 7, y: -10 - photoIndex * 3, x: (photoIndex - 1) * 20 },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    />
                  ))}
                </span>
                <span className="case-info">
                  <span className="case-count"><Images size={16} />Подборка объектов</span>
                  <strong>{folder.title}</strong>
                  <small>{folder.description}</small>
                  <span className="case-meta"><MapPin size={15} />{folder.place}</span>
                  <span className="case-open">Открыть кейсы <ArrowUpRight size={18} /></span>
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
