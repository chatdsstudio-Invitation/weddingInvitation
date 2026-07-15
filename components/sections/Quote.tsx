"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { quote } from "@/lib/wedding-data";

export default function Quote() {
  return (
    <section
      aria-label="Welcome message"
      className="relative flex min-h-[70svh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800/95 to-blush-100 px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <ScrollReveal className="divider w-48 text-blush-200/50 mb-8">
          <span aria-hidden className="text-rose-200/80">&#9825;</span>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="font-serif text-xl sm:text-2xl md:text-[1.65rem] italic leading-relaxed text-blush-50/95 text-shadow-soft">
            {quote.text}
            <span aria-hidden className="ml-2 inline-block align-middle text-rose-200">&#9825;</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="divider w-48 text-blush-200/50 mt-8">
          <span aria-hidden className="text-rose-200/80">&#9825;</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
