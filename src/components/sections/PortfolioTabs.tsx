"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/utils";
import SkillsTab from "./tabs/SkillsTab";
import InterestsTab from "./tabs/InterestsTab";
import BooksTab from "./tabs/BooksTab";
import SocialTab from "./tabs/SocialTab";

// Lazy load heavy components to improve initial load time
const PlacesTab = lazy(() => import("./tabs/PlacesTab"));
const MusicTab = lazy(() => import("./tabs/MusicTab"));

// Loading skeleton for lazy components
function TabLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-700 rounded-lg animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-32 bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

const tabs = [
  { id: "skills", label: "Skills", icon: "💻" },
  { id: "interests", label: "Interests", icon: "⭐" },
  { id: "places", label: "Places", icon: "🌍" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "books", label: "Books", icon: "📚" },
  { id: "social", label: "Social", icon: "🔗" },
];

const tabVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState<string>("skills");

  // Listen for scroll-to-section events and switch tabs if needed
  useEffect(() => {
    const handleScrollToSection = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { id } = customEvent.detail;

      // If scrolling to contact, switch to social tab
      if (id === "contact") {
        setActiveTab("social");
      }
    };

    window.addEventListener("scrollToSection", handleScrollToSection);
    return () => window.removeEventListener("scrollToSection", handleScrollToSection);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "skills":
        return <SkillsTab />;
      case "interests":
        return <InterestsTab />;
      case "places":
        return (
          <Suspense fallback={<TabLoadingSkeleton />}>
            <PlacesTab />
          </Suspense>
        );
      case "music":
        return (
          <Suspense fallback={<TabLoadingSkeleton />}>
            <MusicTab />
          </Suspense>
        );
      case "books":
        return <BooksTab />;
      case "social":
        return <SocialTab />;
      default:
        return <SkillsTab />;
    }
  };

  return (
    <Section id="skills" className="py-20">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400">
            Digital Profile
          </div>
          <h2 className="mb-4 text-4xl font-bold">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Tuan Darcy&apos;s Portfolio
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Explore my skills, interests, and more...
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-8 overflow-hidden"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
