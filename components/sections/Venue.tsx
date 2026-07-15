"use client";

import { MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { venue } from "@/lib/wedding-data";

export default function Venue() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;

  return (
    <section aria-label="Venue" className="w-full bg-blush-50 px-6 py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <SectionHeading title="Venue" icon={MapPin} />

        <ScrollReveal delay={0.15} className="mt-6">
          <h3 className="font-serif text-2xl font-semibold text-ink">{venue.name}</h3>
          <p className="mt-1 font-serif text-ink/60">{venue.address}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="my-10 w-full max-w-xs text-maroon-300/60">
          <PalaceIllustration className="mx-auto h-24 w-full" />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-maroon-600 px-7 py-3 font-serif text-sm font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-maroon-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <MapPin size={16} strokeWidth={2} />
            View on Google Maps
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PalaceIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 100" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <line x1="10" y1="88" x2="290" y2="88" />
        <rect x="30" y="55" width="26" height="33" />
        <path d="M30 55 L43 40 L56 55 Z" />
        <rect x="80" y="42" width="34" height="46" />
        <path d="M80 42 L97 22 L114 42 Z" />
        <circle cx="97" cy="22" r="3" />
        <rect x="130" y="30" width="40" height="58" />
        <path d="M130 30 Q150 4 170 30 Z" />
        <circle cx="150" cy="8" r="3" />
        <rect x="186" y="42" width="34" height="46" />
        <path d="M186 42 L203 22 L220 42 Z" />
        <circle cx="203" cy="22" r="3" />
        <rect x="244" y="55" width="26" height="33" />
        <path d="M244 55 L257 40 L270 55 Z" />
        <path d="M148 88 L148 60 Q150 55 152 60 L152 88" />
      </g>
    </svg>
  );
}
