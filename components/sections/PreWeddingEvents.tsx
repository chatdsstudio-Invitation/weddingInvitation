"use client";

import { PartyPopper } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { preWeddingEvents } from "@/lib/wedding-data";

export default function PreWeddingEvents() {
  return (
    <section aria-label="Pre-wedding events" className="w-full bg-blush-50 px-6 py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <SectionHeading title="Pre-Wedding Events" icon={PartyPopper} />

        <div className="mt-12 flex w-full flex-col gap-8">
          {preWeddingEvents.map((event, i) => (
            <ScrollReveal key={event.name} delay={i * 0.12}>
              <div className="group rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-blush-200/50 hover:shadow-[0_10px_30px_-12px_rgba(140,30,60,0.25)]">
                <h3 className="font-serif text-xl font-semibold text-maroon-600 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {event.name}
                </h3>
                <p className="mt-1 font-serif text-ink/70">
                  {event.date}, {event.time}
                </p>
                <p className="font-serif text-ink/50">{event.location}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
