"use client";

import { useEffect, useState } from "react";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const ZERO_REMAINING: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

function computeRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff <= 0 };
}

export function useCountdown(targetDate: string) {
  const target = new Date(targetDate).getTime();
  // Start from a fixed, deterministic value so server-rendered HTML and the
  // client's first hydration pass match exactly (Date.now() would differ by
  // a second or two between them and trigger a hydration mismatch). The
  // real countdown kicks in a moment later, client-side only, below.
  const [remaining, setRemaining] = useState<Remaining>(ZERO_REMAINING);

  useEffect(() => {
    // Correct the placeholder to the real value right after mount. This is
    // a deliberate one-time sync with the system clock (an external source
    // of truth), not state derived from props/other state, so it's safe
    // outside the "don't setState in an effect body" guideline.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(computeRemaining(target));
    const id = setInterval(() => setRemaining(computeRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}
