"use client";

import { Shirt } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { dressCode } from "@/lib/wedding-data";

export default function DressCode() {
  return (
    <section aria-label="Dress code" className="w-full bg-blush-100 px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <SectionHeading title="Dress Code" icon={Shirt} />

        <div className="mt-12 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-center gap-2 rounded-2xl px-4 py-6 transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-serif text-lg font-semibold text-maroon-600">Women</h3>
              <span className="h-px w-8 bg-maroon-300/60" />
              <p className="font-serif text-ink/75">{dressCode.women}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center gap-2 rounded-2xl px-4 py-6 transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-serif text-lg font-semibold text-maroon-600">Men</h3>
              <span className="h-px w-8 bg-maroon-300/60" />
              <p className="font-serif text-ink/75">{dressCode.men}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
