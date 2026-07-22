import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen, Images, X } from "lucide-react";
import { useEffect, useState } from "react";
import { images } from "../data";
import { Reveal } from "./Reveal";

const folders = [
  {
    title: "Беседки",
    description: "Садовые беседки и открытые зоны отдыха",
    photos: [images.projects[4], images.projects[0], images.projects[2], images.projects[1]],
  },
  {
    title: "Веранды",
    description: "Веранды частных домов разных форм и размеров",
    photos: [images.projects[1], images.projects[0], images.projects[2], images.projects[4], images.projects[3]],
  },
  {
    title: "Кирпичные строения",
    description: "Террасы и летние кухни в кирпичных зданиях",
    photos: [images.projects[3], images.projects[1], images.projects[0], images.projects[4]],
  },
] as const;

type OpenFolder = (typeof folders)[number] | null;

export function RealCases() {
  const [openFolder, setOpenFolder] = useState<OpenFolder>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const closeGallery = () => setOpenFolder(null);
  const showPrevious = () => openFolder && setPhotoIndex((photoIndex - 1 + openFolder.photos.length) % openFolder.photos.length);
  const showNext = () => openFolder && setPhotoIndex((photoIndex + 1) % openFolder.photos.length);

  useEffect(() => {
    document.body.style.overflow = openFolder ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const openGallery = (folder: (typeof folders)[number]) => {
    setPhotoIndex(0);
    setOpenFolder(folder);
  };

  return (
    <section className="section cases-section" id="cases">
      <div className="container">
        <Reveal className="section-heading cases-heading">
          <div><span className="section-kicker">Реальные кейсы</span><h2>Откройте папку с объектами</h2></div>
          <p>Фотографии выполненных работ собраны по типам построек. Открывайте папки и листайте галерею.</p>
        </Reveal>

        <div className="case-folders">
          {folders.map((folder, folderIndex) => (
            <Reveal delay={folderIndex * 0.08} key={folder.title}>
              <motion.button className="case-folder" type="button" onClick={() => openGallery(folder)} aria-label={`${folder.title}: открыть фотографии`} initial="rest" whileHover="hover" whileFocus="hover" whileTap={{ scale: 0.985 }}>
                <span className="case-tab"><FolderOpen size={18} />Папка {String(folderIndex + 1).padStart(2, "0")}</span>
                <span className="case-photo-stack" aria-hidden="true">
                  {folder.photos.slice(0, 3).map((photo, index) => (
                    <motion.img src={photo.src} alt="" loading="lazy" key={photo.id} variants={{ rest: { rotate: (index - 1) * 2, y: index * 5, x: 0 }, hover: { rotate: (index - 1) * 7, y: -10 - index * 3, x: (index - 1) * 20 } }} transition={{ type: "spring", stiffness: 260, damping: 22 }} />
                  ))}
                </span>
                <span className="case-info">
                  <span className="case-count"><Images size={16} />{folder.photos.length} фото</span>
                  <strong>{folder.title}</strong><small>{folder.description}</small>
                  <span className="case-open">Открыть папку <ArrowUpRight size={18} /></span>
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openFolder && (
          <motion.div className="case-gallery-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && closeGallery()}>
            <motion.div className="case-gallery-modal" role="dialog" aria-modal="true" aria-label={`Фотографии: ${openFolder.title}`} initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }}>
              <div className="case-gallery-head"><div><span>Реальные кейсы</span><h3>{openFolder.title}</h3></div><button type="button" onClick={closeGallery} aria-label="Закрыть галерею"><X /></button></div>
              <div className="case-gallery-stage">
                <AnimatePresence mode="wait"><motion.img src={openFolder.photos[photoIndex].src} alt={openFolder.photos[photoIndex].title} key={openFolder.photos[photoIndex].id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.24 }} /></AnimatePresence>
                <button className="gallery-arrow gallery-arrow-left" type="button" onClick={showPrevious} aria-label="Предыдущее фото"><ChevronLeft /></button>
                <button className="gallery-arrow gallery-arrow-right" type="button" onClick={showNext} aria-label="Следующее фото"><ChevronRight /></button>
                <span className="gallery-counter">{photoIndex + 1} / {openFolder.photos.length}</span>
              </div>
              <div className="case-gallery-thumbs">
                {openFolder.photos.map((photo, index) => <button className={index === photoIndex ? "is-active" : ""} type="button" onClick={() => setPhotoIndex(index)} key={photo.id} aria-label={`Открыть фото ${index + 1}`}><img src={photo.src} alt="" /></button>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
