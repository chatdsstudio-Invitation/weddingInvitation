"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSound } from "@/context/sound-context";
import { couple } from "@/lib/wedding-data";

const TEXT_REVEAL_AT_SECONDS = 5;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { muted, videoStarted, registerMedia } = useSound();
  const [showText, setShowText] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    return registerMedia(el);
  }, [registerMedia]);

  // Tapping the envelope seal is the user gesture that unlocks autoplay;
  // start the video immediately once that happens.
  useEffect(() => {
    if (!videoStarted) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      el.muted = true;
      el.play();
    });
  }, [videoStarted]);

  // Let the video play on its own for the first few seconds, then bring
  // the overlay text in — driven by the video's own clock so it stays in
  // sync even if playback stalls or buffers.
  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || showText) return;
    if (el.currentTime >= TEXT_REVEAL_AT_SECONDS) {
      setShowText(true);
    }
  }, [showText]);

  const handleEnded = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.currentTime = el.duration || el.currentTime;
    }
    setShowText(true);
    setEnded(true);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Wedding introduction"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-navy-900"
    >
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        src="/videos/intro.mp4"
        poster="/videos/intro-poster.jpg"
        playsInline
        preload="metadata"
        muted={muted}
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        disablePictureInPicture
        disableRemotePlayback
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />

      <div className="relative z-20 flex max-w-3xl flex-col items-center px-6 text-center text-white text-shadow-soft">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-5 flex flex-col items-center gap-4"
        >
          <span aria-hidden className="text-2xl">&#9825;</span>
          <p className="font-serif text-lg sm:text-xl italic text-blush-100/95">
            We are honored to welcome you to
            <br />
            the Wedding ceremony of..
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="divider w-64 text-blush-100/60 mb-2"
        >
          <span aria-hidden className="text-sm">&#9825;</span>
        </motion.div>
        <NameBlock
          name={couple.groom.name}
          parents={couple.groom.parents}
          delay={0.5}
          show={showText}
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-script text-4xl my-2 text-blush-100/90"
        >
          &amp;
        </motion.span>

        <NameBlock
          name={couple.bride.name}
          parents={couple.bride.parents}
          delay={1.1}
          show={showText}
        />

        

        
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showText && !ended ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-1 text-white/80"
        aria-hidden="true"
      >
        <span className="text-[11px] tracking-[0.35em] font-serif">SCROLL</span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}

function NameBlock({
  name,
  parents,
  delay,
  show,
}: {
  name: string;
  parents: string;
  delay: number;
  show: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <h1 className="font-script text-6xl sm:text-8xl leading-none text-white">{name}</h1>
      <p className="mt-3 font-serif text-base sm:text-lg text-blush-100/90">{parents}</p>
    </motion.div>
  );
}
