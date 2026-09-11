import { SiteImage } from "./SiteImage";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen, Images, X } from "lucide-react";
import { useEffect, useState } from "react";
import { images } from "../data";
import { Reveal } from "./Reveal";

const MotionSiteImage = motion.create(SiteImage);

const gazeboPhotos = [
  { id: "gazebo-preview", src: "/images/cases/gazebos/preview.jpeg", title: "Беседка с мягкими окнами и тёмной окантовкой" },
  { id: "gazebo-01", src: "/images/cases/gazebos/01.jpeg", title: "Светлая деревянная беседка с мягкими окнами" },
  { id: "gazebo-02", src: "/images/cases/gazebos/02.jpeg", title: "Белая садовая беседка с прозрачными окнами" },
  { id: "gazebo-03", src: "/images/cases/gazebos/03.jpeg", title: "Красная беседка с мягкими окнами" },
  { id: "gazebo-04", src: "/images/cases/gazebos/04.jpeg", title: "Большая белая беседка, вид спереди" },
  { id: "gazebo-05", src: "/images/cases/gazebos/05.jpeg", title: "Большая белая беседка, вид сбоку" },
  { id: "gazebo-06", src: "/images/cases/gazebos/06.jpeg", title: "Садовая беседка с коричневой плёнкой" },
  { id: "gazebo-07", src: "/images/cases/gazebos/07.jpeg", title: "Компактная беседка с тёмной окантовкой" },
  { id: "gazebo-08", src: "/images/cases/gazebos/08.jpeg", title: "Открытая беседка с мягкими окнами" },
  { id: "gazebo-09", src: "/images/cases/gazebos/09.jpeg", title: "Белая беседка с тонированными окнами" },
] as const;

const verandaPhotos = [
  { id: "veranda-preview", src: "/images/cases/verandas/preview.jpeg", title: "Веранда с мягкими окнами и тёмной окантовкой" },
  ...Array.from({ length: 33 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `veranda-${number}`,
      src: `/images/cases/verandas/${number}.jpeg`,
      title: `Веранда с мягкими окнами — фото ${index + 1}`,
    };
  }),
];

const brickPhotos = [
  { id: "brick-01", src: "/images/cases/brick/01.jpeg", title: "Кирпичная веранда с мягкими окнами — вид сбоку" },
  { id: "brick-02", src: "/images/cases/brick/02.jpeg", title: "Кирпичная веранда с мягкими окнами — вход" },
  { id: "brick-03", src: "/images/cases/brick/03.jpeg", title: "Кирпичная веранда с прозрачными мягкими окнами" },
] as const;

const folders = [
  {
    title: "Беседки",
    description: "Садовые беседки и открытые зоны отдыха",
    preview: gazeboPhotos[0],
    photos: gazeboPhotos,
  },
  {
    title: "Веранды",
    description: "Веранды частных домов разных форм и размеров",
    preview: verandaPhotos[0],
    photos: verandaPhotos,
  },
  {
    title: "Кирпичные строения",
    description: "Террасы и летние кухни в кирпичных зданиях",
    preview: images.projects[3],
    photos: brickPhotos,
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
              <button className="case-folder" type="button" onClick={() => openGallery(folder)} aria-label={`${folder.title}: открыть фотографии`}>
                <span className="case-tab"><FolderOpen size={18} />Папка {String(folderIndex + 1).padStart(2, "0")}</span>
                <span className="case-photo-stack" aria-hidden="true">
                  {[folder.preview, ...folder.photos.filter((photo) => photo.id !== folder.preview.id).slice(0, 2)].map((photo) => (
                    <SiteImage src={photo.src} alt="" loading="lazy" key={photo.id} />
                  ))}
                </span>
                <span className="case-info">
                  <span className="case-count"><Images size={16} />{folder.photos.length} фото</span>
                  <strong>{folder.title}</strong><small>{folder.description}</small>
                  <span className="case-open">Открыть папку <ArrowUpRight size={18} /></span>
                </span>
              </button>
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
                <AnimatePresence mode="wait"><MotionSiteImage src={openFolder.photos[photoIndex].src} alt={openFolder.photos[photoIndex].title} key={openFolder.photos[photoIndex].id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.24 }} /></AnimatePresence>
                {openFolder.photos.length > 1 && <>
                  <button className="gallery-arrow gallery-arrow-left" type="button" onClick={showPrevious} aria-label="Предыдущее фото"><ChevronLeft /></button>
                  <button className="gallery-arrow gallery-arrow-right" type="button" onClick={showNext} aria-label="Следующее фото"><ChevronRight /></button>
                </>}
                <span className="gallery-counter">{photoIndex + 1} / {openFolder.photos.length}</span>
              </div>
              <div className="case-gallery-thumbs">
                {openFolder.photos.map((photo, index) => <button className={index === photoIndex ? "is-active" : ""} type="button" onClick={() => setPhotoIndex(index)} key={photo.id} aria-label={`Открыть фото ${index + 1}`}><SiteImage src={photo.src} alt="" /></button>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
