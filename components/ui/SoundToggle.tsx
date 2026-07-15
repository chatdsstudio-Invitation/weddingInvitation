"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/context/sound-context";

export default function SoundToggle() {
  const { muted, toggleMuted } = useSound();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Unmute background sound" : "Mute background sound"}
      aria-pressed={!muted}
      className="fixed top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/35 hover:scale-105 active:scale-95 mix-blend-difference"
    >
      {muted ? <VolumeX size={18} strokeWidth={1.75} /> : <Volume2 size={18} strokeWidth={1.75} />}
    </button>
  );
}
