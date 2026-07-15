"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Users, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { couple, rsvpWhatsAppNumber } from "@/lib/wedding-data";

type Attending = "" | "yes" | "no" | "maybe";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please share your name and email so we know who's celebrating with us.");
      return;
    }
    setError("");

    const attendingLabel =
      attending === "yes"
        ? "Joyfully accepts"
        : attending === "no"
          ? "Regretfully declines"
          : attending === "maybe"
            ? "Not sure yet"
            : "Not specified";

    const text = [
      `New RSVP for ${couple.bride.name} & ${couple.groom.name}'s wedding:`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Attending: ${attendingLabel}`,
      `Message: ${message.trim() || "(none)"}`,
    ].join("\n");

    // No backend/database is wired up — RSVPs are delivered straight to the
    // couple's WhatsApp via a pre-filled wa.me link (opens in a new tab).
    const whatsappUrl = `https://wa.me/${rsvpWhatsAppNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
  };

  return (
    <section aria-label="Send a message" className="w-full bg-blush-50 px-6 py-24">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <SectionHeading title="Send a Message" icon={Mail} />

        <div className="relative mt-10 w-full">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-maroon-200/50 bg-blush-100/60 px-6 py-12 text-center"
                role="status"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-500 text-white">
                  <Check size={22} />
                </span>
                <p className="font-serif text-lg text-ink">Thank you, {name.split(" ")[0]}!</p>
                <p className="font-serif text-ink/70">
                  We&apos;ve opened WhatsApp with your RSVP ready to send. We can&apos;t wait to
                  celebrate with you.
                </p>
              </motion.div>
            ) : (
              <ScrollReveal as="div">
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col gap-5"
                  noValidate
                >
                  <Field label="Your Name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Will you be attending?" htmlFor="attending" icon={Users}>
                    <select
                      id="attending"
                      name="attending"
                      value={attending}
                      onChange={(e) => setAttending(e.target.value as Attending)}
                      className={`${inputClass} appearance-none bg-white`}
                    >
                      <option value="">Select...</option>
                      <option value="yes">Joyfully accept</option>
                      <option value="no">Regretfully decline</option>
                      <option value="maybe">Not sure yet</option>
                    </select>
                  </Field>

                  <Field label="Your Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your wishes..."
                      className={`${inputClass} resize-y`}
                    />
                  </Field>

                  {error && (
                    <p role="alert" className="text-sm text-maroon-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-2 rounded-md bg-maroon-600 px-6 py-3 font-serif text-sm font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-maroon-700 hover:shadow-lg active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                </motion.form>
              </ScrollReveal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-md border border-maroon-200/60 bg-white/70 px-4 py-2.5 font-serif text-ink placeholder:text-ink/35 outline-none transition-all duration-200 focus:border-maroon-400 focus:ring-2 focus:ring-maroon-200";

function Field({
  label,
  htmlFor,
  children,
  icon: Icon,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  icon?: typeof Users;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5 text-left">
      <span className="flex items-center gap-1.5 font-serif text-sm font-medium text-ink/80">
        {Icon && <Icon size={14} className="text-maroon-400" />}
        {label}
      </span>
      {children}
    </label>
  );
}
