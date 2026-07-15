"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

interface FallingPetalsProps {
  count?: number;
  className?: string;
}

/**
 * Purely decorative, ARIA-hidden looping petal fall. Petal positions are
 * randomized client-side after mount (kept out of render to stay a pure
 * function), and the effect is skipped entirely when the user prefers
 * reduced motion (handled globally via CSS).
 */
export default function FallingPetals({ count = 18, className }: FallingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Randomized purely for decorative variety; generated post-mount (not
    // during render) so server and client markup match on first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 8,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 60,
        opacity: 0.35 + Math.random() * 0.4,
      }))
    );
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%] rounded-[60%_0]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            background: "linear-gradient(135deg, #e8a8b6, #c85d78)",
            opacity: p.opacity,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.drift],
            rotate: [0, 200],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
