import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FloatingMusicPlayer } from "@/components/sections/FloatingMusicPlayer";
import { VisitCounter } from "@/components/VisitCounter";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A high-end personal portfolio showcasing projects, achievements, and creative work.",
  keywords: ["portfolio", "developer", "designer", "creative"],
  authors: [{ name: "TuanDarcy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    siteName: "Portfolio",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* Preload fonts if needed */}</head>
      <body>
        {children}
        <FloatingMusicPlayer />
        <VisitCounter />
      </body>
    </html>
  );
}
