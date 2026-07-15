"use client";

import type { LucideIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  icon?: LucideIcon;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ title, icon: Icon, light, className }: SectionHeadingProps) {
  return (
    <ScrollReveal className={`flex flex-col items-center text-center ${className ?? ""}`}>
      {Icon && (
        <Icon
          className={`mb-3 h-6 w-6 ${light ? "text-blush-200" : "text-maroon-500"}`}
          strokeWidth={1.5}
        />
      )}
      <h2
        className={`font-script text-5xl sm:text-6xl leading-none ${
          light ? "text-blush-100" : "text-maroon-600"
        }`}
      >
        {title}
      </h2>
      <div className={`divider mt-4 w-40 ${light ? "text-blush-200/70" : "text-maroon-400/60"}`}>
        <span
          className={`inline-block h-1.5 w-1.5 rotate-45 ${
            light ? "bg-blush-200/80" : "bg-maroon-400/80"
          }`}
        />
      </div>
    </ScrollReveal>
  );
}
