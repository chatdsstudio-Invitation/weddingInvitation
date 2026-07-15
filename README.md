# Veer & Zara — Wedding Invitation

A premium, animated wedding invitation site built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm run start
```

## Editing content

Nearly everything text-based (names, dates, venue, timeline, dress code, pre-wedding events,
transportation/accommodation/gifts copy, closing message) lives in one file:

```
lib/wedding-data.ts
```

Edit that file and every section updates automatically. The wedding countdown target is
`weddingDateTime` in the same file (ISO 8601 with timezone offset).

## Media

- `public/videos/intro.mp4` + `public/videos/intro-poster.jpg` — hero video and its poster frame.
- `public/images/gallery/*.jpg` / `*.webp` — gallery photos.

Swap these files (keep the same names) to update media without touching code.

## Structure

```
app/                 Root layout + page assembly
components/sections/ One component per invitation section
components/ui/       Shared UI (section headings, scroll-reveal wrapper, sound toggle)
context/              Global sound (mute/unmute) context shared by the hero video and toggle button
hooks/                useCountdown, useScratchCard (canvas scratch-to-reveal logic)
lib/                  Content config (lib/wedding-data.ts)
```

## Notes

- No navbar/menu by design — the site is a single continuous scroll.
- The hero video never autoplays on page load. Tapping the envelope wax seal is the single
  entry gesture: it unmutes and starts the hero video immediately (playing underneath the
  envelope while it animates open), plays silently on its own for the first 5 seconds, then the
  overlay text fades in while the video keeps playing to completion and freezes on its last frame
  (never loops or restarts). See `TEXT_REVEAL_AT_SECONDS` in `components/sections/Hero.tsx` to
  change the 5-second delay.
- Native browser "play" overlays (notably iOS Safari's default video play glyph) are explicitly
  suppressed via CSS in `app/globals.css` (`.hero-video::-webkit-media-controls-*`) so the wax
  seal is the only play affordance ever shown.
- The scratch-to-reveal card works with mouse drag and touch (Pointer Events), and auto-reveals
  once roughly half the area is cleared.
- The "Send a Message" form validates client-side and shows a confirmation, but nothing is sent
  anywhere yet — wire `handleSubmit` in `components/sections/ContactForm.tsx` to an API route or
  a service like Formspree/EmailJS to actually collect RSVPs.
- "View on Google Maps" links to a live Maps search query built from `lib/wedding-data.ts`.
