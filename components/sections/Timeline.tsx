"use client";

import { Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { timeline } from "@/lib/wedding-data";

export default function Timeline() {
  return (
    <section aria-label="Program timeline" className="w-full bg-blush-100 px-6 pb-24 pt-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <SectionHeading title="Program Timeline" icon={Clock} />

        <ol className="mt-12 flex w-full flex-col gap-8">
          {timeline.map((event, i) => (
            <ScrollReveal key={event.title} delay={i * 0.12} y={20}>
              <li className="relative border-l-2 border-maroon-300/40 pl-6">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-maroon-500 ring-4 ring-blush-100" />
                <h3 className="font-serif text-xl font-semibold text-maroon-600">{event.title}</h3>
                <p className="mt-0.5 font-serif text-sm text-ink/60">
                  {event.date}, {event.time}
                </p>
                <p className="mt-1 font-serif text-ink/80">{event.description}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
