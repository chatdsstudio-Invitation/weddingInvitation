import Hero from "@/components/sections/Hero";
import EnvelopeIntro from "@/components/sections/EnvelopeIntro";
import Quote from "@/components/sections/Quote";
import ScratchReveal from "@/components/sections/ScratchReveal";
import Gallery from "@/components/sections/Gallery";
import Countdown from "@/components/sections/Countdown";
import Timeline from "@/components/sections/Timeline";
import Venue from "@/components/sections/Venue";
import DressCode from "@/components/sections/DressCode";
import PreWeddingEvents from "@/components/sections/PreWeddingEvents";
import Logistics from "@/components/sections/Logistics";
import ContactForm from "@/components/sections/ContactForm";
import Closing from "@/components/sections/Closing";

export default function Home() {
  return (
    <main>
      <EnvelopeIntro />
      <Hero />
      <Quote />
      <ScratchReveal />
      <Gallery />
      <Countdown />
      <Timeline />
      <Venue />
      <DressCode />
      <PreWeddingEvents />
      <Logistics />
      <ContactForm />
      <Closing />
    </main>
  );
}
