"use client";

import { Globe, Phone } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { closing, studioBranding } from "@/lib/wedding-data";

export default function Closing() {
  return (
    <section aria-label="Closing message" className="w-full bg-blush-200/70 px-6 py-20">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <ScrollReveal>
          <WavyDivider className="h-6 w-56 text-maroon-300/70" />
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="my-8">
          <h2 className="font-script text-4xl leading-tight text-maroon-600 sm:text-5xl">
            {closing.heading}
          </h2>
          <p className="mt-3 font-script text-2xl text-maroon-500/80">{closing.signature}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <WavyDivider className="h-6 w-56 text-maroon-300/70" />
        </ScrollReveal>

        {/* Studio branding footer — edit studioBranding in wedding-data.ts
            to change these links. */}
        <ScrollReveal delay={0.4} className="mt-10 flex flex-col items-center gap-3">
          <p className="font-serif text-[11px] uppercase tracking-[0.25em] text-maroon-500/60">
            Crafted by {studioBranding.name}
          </p>
          <div className="flex items-center gap-5 text-maroon-500/70">
            <a
              href={studioBranding.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${studioBranding.name} on Instagram`}
              className="flex items-center gap-1.5 transition-colors hover:text-maroon-600"
            >
              <InstagramIcon className="h-4 w-4" />
              <span className="font-serif text-xs">{studioBranding.instagramHandle}</span>
            </a>
            <a
              href={studioBranding.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${studioBranding.name} website`}
              className="flex items-center gap-1.5 transition-colors hover:text-maroon-600"
            >
              <Globe className="h-4 w-4" strokeWidth={1.5} />
              <span className="font-serif text-xs">{studioBranding.websiteLabel}</span>
            </a>
            <a
              href={`tel:+91${studioBranding.phone}`}
              aria-label={`Call ${studioBranding.name}`}
              className="flex items-center gap-1.5 transition-colors hover:text-maroon-600"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span className="font-serif text-xs">{studioBranding.phone}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WavyDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 12 Q 20 2, 38 12 T 74 12 T 110 12 T 146 12 T 182 12 T 218 12"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {[16, 50, 90, 130, 170, 204].map((x) => (
        <circle key={x} cx={x} cy={x % 2 === 0 ? 7 : 17} r="1.4" fill="currentColor" />
      ))}
    </svg>
  );
}

// lucide-react dropped brand/logo icons a while back, so Instagram gets a
// small hand-drawn outline glyph to match the rest of the custom SVGs here.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
