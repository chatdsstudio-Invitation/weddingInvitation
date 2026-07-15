"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/context/sound-context";

/**
 * Loops a background music track across the whole site. Registers with the
 * shared sound context so the top-right mute button controls it too, and
 * starts it the moment the envelope seal is tapped — the same real user
 * gesture that unlocks the hero video, which browsers require before any
 * audio can play with sound.
 *
 * Drop your track at public/audio/bgm.mp3 (or change BGM_SRC below to
 * match whatever filename you use).
 */
const BGM_SRC = "/audio/bgm.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { videoStarted, registerMedia } = useSound();

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    return registerMedia(el);
  }, [registerMedia]);

  useEffect(() => {
    if (!videoStarted) return;
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.4; // sits under the hero video's own audio, not over it
    el.play().catch(() => {
      // Autoplay can still be blocked in some browsers even after a tap;
      // the mute toggle button lets the visitor start it manually.
    });
  }, [videoStarted]);

  return <audio ref={audioRef} src={BGM_SRC} loop preload="auto" aria-hidden="true" />;
}
