"use client";

import type { LucideIcon } from "lucide-react";
import { Car, Building2, Gift } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { logistics } from "@/lib/wedding-data";

interface Block {
  title: string;
  icon: LucideIcon;
  body: string;
  bg: string;
}

const blocks: Block[] = [
  { title: "Transportation", icon: Car, body: logistics.transportation, bg: "bg-blush-100" },
  { title: "Accommodation", icon: Building2, body: logistics.accommodation, bg: "bg-blush-50" },
  { title: "Gifts", icon: Gift, body: logistics.gifts, bg: "bg-blush-100" },
];

export default function Logistics() {
  return (
    <>
      {blocks.map((block) => (
        <section key={block.title} aria-label={block.title} className={`w-full ${block.bg} px-6 py-20`}>
          <ScrollReveal className="mx-auto flex max-w-lg flex-col items-center text-center">
            <SectionHeading title={block.title} icon={block.icon} />
            <p className="mt-6 font-serif text-ink/75">{block.body}</p>
          </ScrollReveal>
        </section>
      ))}
    </>
  );
}
