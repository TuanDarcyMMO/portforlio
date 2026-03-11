import React from "react";
import { HeroSection, AboutSection, PortfolioTabs } from "@/components/sections";

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <PortfolioTabs />
    </main>
  );
}
