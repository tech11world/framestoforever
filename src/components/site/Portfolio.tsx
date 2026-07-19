import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, photosFor, categoryFromSlug, type Category, type Photo } from "@/lib/photos";

interface PortfolioProps {
  lockedCategory?: Category;
  showFilters?: boolean;
  showHeader?: boolean;
  count?: number;
}

export function Portfolio({
  lockedCategory,
  showFilters = true,
  showHeader = true,
  count = 15,
}: PortfolioProps = {}) {
  const params = useParams({ strict: false });
  const routeCategory = params && "category" in params && typeof params.category === "string" 
    ? categoryFromSlug(params.category) 
    : undefined;

  const [active, setActive] = useState<Category>(lockedCategory ?? routeCategory ?? "Wedding");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lockedCategory) setActive(lockedCategory);
    else if (routeCategory) setActive(routeCategory);
  }, [lockedCategory, routeCategory]);

  const photos = useMemo(() => photosFor(active, count), [active, count]);

  const openAt = useCallback((i: number) => setLightboxIdx(i), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(() => setLightboxIdx((i) => (i === null ? i : (i + 1) % photos.length)), [photos.length]);
  const prev = useCallback(() => setLightboxIdx((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, close, next, prev]);

  return (
    <section id="portfolio" className={`relative bg-cream scroll-mt-20 ${showHeader ? "py-24 md:py-32" : "pb-24 pt-8 md:pb-32 md:pt-12"}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {showHeader && (
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow">Our Portfolio</span>
            <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
              Moments <span className="italic font-serif">captured</span>
            </h2>
            <p className="mt-4 max-w-xl text-coffee">
              Fifteen curated frames from every chapter — each carrying its own light, story, and feeling.
            </p>
          </div>
        )}

        {showFilters && !lockedCategory && (
          <div className={`${showHeader ? "mt-12" : ""} overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0`}>
            <div className="flex min-w-max md:min-w-0 gap-2 md:justify-center md:flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-4 py-2 rounded-full text-[11px] tracking-[0.24em] uppercase transition-all ${
                    active === c
                      ? "bg-ink text-ivory shadow-soft"
                      : "bg-transparent text-chocolate/70 border border-border hover:border-ink hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]"
          >
            {photos.map((p, i) => (
              <PhotoTile key={p.id} photo={p} onClick={() => openAt(i)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={close}
          >
            <button aria-label="Close" onClick={close} className="absolute top-6 right-6 p-3 text-ivory/80 hover:text-ivory">
              <X className="h-6 w-6" />
            </button>
            <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 p-3 text-ivory/70 hover:text-ivory">
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 p-3 text-ivory/70 hover:text-ivory">
              <ChevronRight className="h-8 w-8" />
            </button>
            <motion.img
              key={photos[lightboxIdx].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={photos[lightboxIdx].full}
              alt={photos[lightboxIdx].alt}
              className="max-h-[85vh] max-w-[92vw] object-contain shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center text-ivory/70 text-xs tracking-[0.3em] uppercase">
              {photos[lightboxIdx].category} · {lightboxIdx + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PhotoTile({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-4 block w-full overflow-hidden rounded-md bg-champagne/30 break-inside-avoid"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        width={photo.w}
        height={photo.h}
        className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute left-4 bottom-4 text-left translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="eyebrow !text-ivory/80">{photo.category}</p>
        <p className="font-display text-ivory text-lg mt-1">View frame →</p>
      </div>
    </motion.button>
  );
}
