import type { Metadata, Viewport } from "next";
import { Alex_Brush, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/context/sound-context";
import SoundToggle from "@/components/ui/SoundToggle";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import DevToolsBlocker from "@/components/ui/DevToolsBlocker";
import { couple } from "@/lib/wedding-data";

// Tab title / share-preview title now follows the names in wedding-data.ts
// automatically — change the couple's names there and this updates too.
const coupleNames = `${couple.groom.name} & ${couple.bride.name}`;

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: `${coupleNames} | Wedding Invitation`,
  description: `Join ${coupleNames} as they begin their journey together. Wedding ceremony details, schedule, venue, and RSVP.`,
  openGraph: {
    title: `${coupleNames} | Wedding Invitation`,
    description: `Join ${coupleNames} as they begin their journey together.`,
    images: ["/videos/intro-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#9a2745",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${alexBrush.variable} ${cormorant.variable}`}>
      <body className="min-h-screen antialiased bg-blush-50 text-ink selection:bg-maroon-400">
        <SoundProvider>
          <DevToolsBlocker />
          <SoundToggle />
          <BackgroundMusic />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
