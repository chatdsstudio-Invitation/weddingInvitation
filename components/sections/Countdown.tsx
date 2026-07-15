"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";
import { weddingDateTime } from "@/lib/wedding-data";

const UNITS = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
] as const;

export default function Countdown() {
  const remaining = useCountdown(weddingDateTime);

  return (
    <section aria-label="Countdown to the wedding" className="w-full bg-blush-100 px-6 pt-24 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <SectionHeading title="Counting Down to Forever" />

        <ScrollReveal delay={0.15} className="mt-10 grid w-full max-w-sm grid-cols-4 gap-2 sm:max-w-md sm:gap-6" y={16}>
          {UNITS.map((unit) => (
            <div
              key={unit.key}
              className="flex min-w-0 flex-col items-center rounded-xl border border-maroon-200/50 bg-blush-200/60 py-3 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:py-6"
            >
              <span
                className="font-serif text-2xl font-semibold tabular-nums text-ink sm:text-5xl"
                aria-live={unit.key === "seconds" ? "off" : undefined}
              >
                {String(remaining[unit.key]).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] tracking-[0.2em] text-maroon-600/80 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </ScrollReveal>
        <p className="sr-only" role="status">
          {remaining.done
            ? "The wedding day has arrived."
            : `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until the wedding.`}
        </p>
      </div>
    </section>
  );
}
