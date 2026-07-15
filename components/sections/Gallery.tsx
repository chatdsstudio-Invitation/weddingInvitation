"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { galleryImages } from "@/lib/wedding-data";

const AUTO_ADVANCE_MS = 2000;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % galleryImages.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(delta > 0 ? index - 1 : index + 1);
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section aria-label="Photo gallery" className="w-full bg-blush-100 px-4 py-20 sm:px-6">
      <ScrollReveal className="mx-auto flex max-w-4xl flex-col items-center">
        <div className="divider mb-8 w-40 text-maroon-300">
          <span aria-hidden>&#9825;</span>
        </div>

        <div
          className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(140,30,60,0.35)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="group"
          aria-roledescription="carousel"
          aria-label="Wedding photo gallery"
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[index].src}
                alt={galleryImages[index].alt}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1} of ${galleryImages.length}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-maroon-500" : "w-1.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
