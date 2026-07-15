"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FallingPetals from "@/components/ui/FallingPetals";
import { useScratchCard } from "@/hooks/useScratchCard";
import { inviteCard } from "@/lib/wedding-data";

export default function ScratchReveal() {
  const { canvasRef, containerRef, revealed, started } = useScratchCard({ threshold: 0.55 });

  return (
    <section
      aria-label="Scratch to reveal your invitation"
      className="relative flex min-h-[85svh] w-full flex-col items-center justify-center gap-10 overflow-hidden bg-blush-100 px-6 py-24"
    >
      {revealed && <FallingPetals />}

      {/* Single heading that swaps text once the card is revealed, instead
          of stacking a second "Our forever begins" title underneath.
          NOTE: no fixed-height/overflow-hidden wrapper here — the script
          font (Alex Brush) has tall swashes/descenders that get sliced off
          and look like broken glyphs if the box clips them. */}
      <ScrollReveal className="flex flex-col items-center text-center">
        {!revealed && (
          <Sparkles className="mb-3 h-6 w-6 text-maroon-500" strokeWidth={1.5} aria-hidden="true" />
        )}
        <AnimatePresence mode="wait">
          <motion.h2
            key={revealed ? "revealed" : "prompt"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-script px-2 py-3 text-5xl leading-[1.35] text-maroon-600 sm:text-6xl"
          >
            {revealed ? "Our forever begins" : "Scratch to Reveal"}
          </motion.h2>
        </AnimatePresence>
        <div className="divider mt-2 w-40 text-maroon-400/60">
          <span aria-hidden className="text-xs text-maroon-400/80">
            &#9825;
          </span>
        </div>
      </ScrollReveal>

      <div
        ref={containerRef}
        className="relative flex h-[380px] w-full max-w-md items-center justify-center sm:h-[420px]"
      >
        {/* Revealed content sits underneath the scratch canvas */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
            <HeartOutline className="absolute inset-0 h-full w-full text-maroon-400/80" />
            <div className="relative flex flex-col items-center gap-1 px-8 text-center">
              <p className="font-serif italic text-maroon-500">{inviteCard.eyebrow}</p>
              <p className="font-serif text-lg font-semibold text-ink">{inviteCard.dateLabel}</p>
              <p className="font-serif text-maroon-500/90">{inviteCard.day}</p>
              <p className="font-serif text-sm text-ink/70">{inviteCard.time}</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full cursor-pointer touch-none select-none [image-rendering:auto]"
              role="button"
              tabIndex={0}
              aria-label="Scratch card. Click and drag, or use touch, to reveal your invitation."
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!started && !revealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-2 flex flex-col items-center text-blush-50/90"
            >
              <span className="text-xs font-serif tracking-[0.2em]">SCRATCH HERE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function HeartOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <path
        d="M100 176C100 176 20 128 20 74C20 46 42 26 68 26C82 26 94 34 100 46C106 34 118 26 132 26C158 26 180 46 180 74C180 128 100 176 100 176Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
