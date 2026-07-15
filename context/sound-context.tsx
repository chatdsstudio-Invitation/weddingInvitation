"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface SoundContextValue {
  muted: boolean;
  toggleMuted: () => void;
  registerMedia: (el: HTMLVideoElement | HTMLAudioElement | null) => void;
  /** Envelope has been tapped — the hero video should start playing now. */
  videoStarted: boolean;
  startVideo: () => void;
  /** The envelope has finished its opening animation and is unmounted. */
  entered: boolean;
  enterSite: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [entered, setEntered] = useState(false);
  const mediaRefs = useRef<Set<HTMLVideoElement | HTMLAudioElement>>(new Set());

  const registerMedia = useCallback((el: HTMLVideoElement | HTMLAudioElement | null) => {
    if (!el) return;
    mediaRefs.current.add(el);
    el.muted = muted;
    return () => {
      mediaRefs.current.delete(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      mediaRefs.current.forEach((el) => {
        el.muted = next;
      });
      return next;
    });
  }, []);

  // Tapping the wax seal is a real user gesture: unlock audio-enabled
  // playback immediately and let the hero video start right away, even
  // while the envelope is still animating closed on top of it.
  const startVideo = useCallback(() => {
    setMuted(false);
    mediaRefs.current.forEach((el) => {
      el.muted = false;
    });
    setVideoStarted(true);
  }, []);

  const enterSite = useCallback(() => {
    setEntered(true);
  }, []);

  return (
    <SoundContext.Provider
      value={{ muted, toggleMuted, registerMedia, videoStarted, startVideo, entered, enterSite }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
