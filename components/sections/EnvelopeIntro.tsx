"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSound } from "@/context/sound-context";

// Position of the wax seal as it appears in the intro video's opening
// frame — the tap target sits right on top of it. Tweak these if the seal
// doesn't line up on your screen.
const SEAL_X = "50%";
const SEAL_Y = "57%";

export default function EnvelopeIntro() {
  const { entered, enterSite, startVideo } = useSound();
  const [opening, setOpening] = useState(false);

  // Lock scroll while the envelope gate is up.
  useEffect(() => {
    if (entered) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [entered]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Start the hero video immediately on tap — it plays underneath the
    // envelope while it animates open, so there's no visible "play" step.
    startVideo();
    window.setTimeout(() => {
      enterSite();
    }, 1350);
  };

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.15 } }}
        >
          {/* No background art here — the hero <video> underneath (Hero.tsx)
              is already showing its poster/first frame, so that's what's
              visible through this transparent overlay. Tapping just starts
              it playing. */}

          {/* Light burst on open */}
          <AnimatePresence>
            {opening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: [0, 0.95, 0], scale: [0.3, 2.4] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="pointer-events-none absolute h-72 w-72 rounded-full"
                style={{
                  left: SEAL_X,
                  top: SEAL_Y,
                  translate: "-50% -50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,222,232,0.6) 35%, rgba(255,222,232,0) 70%)",
                }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {/* Invisible tap target — the seal and "Tap to open" text are
              already baked into the video itself, so this hotspot has no
              visuals of its own. It just sits on top of the seal and
              starts the video playing when tapped. */}
          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={opening}
            aria-label="Tap the seal to play your wedding invitation video"
            animate={opening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 rounded-full bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              left: SEAL_X,
              top: SEAL_Y,
              translate: "-50% -50%",
              width: "clamp(140px, 26vmin, 260px)",
              height: "clamp(140px, 26vmin, 260px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
