"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";

interface Interest {
  id: string;
  name: string;
  icon: string;
}

// ===== EDIT HERE: Add or modify interests =====
const interests: Interest[] = [
  { id: "1", name: "Gaming", icon: "🎮" },
  { id: "2", name: "Photography", icon: "📸" },
  { id: "3", name: "Technology", icon: "💻" },
  { id: "4", name: "Movies", icon: "🎬" },
  { id: "5", name: "Music", icon: "🎵" },
  { id: "6", name: "Travel", icon: "🛫" },
  { id: "7", name: "Creation", icon: "🎨" },
  { id: "8", name: "Pet", icon: "🐕" },
  // Add new interest here: { id: "7", name: "Interest Name", icon: "emoji" },
];
// ================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export default function InterestsTab() {
  return (
    <div className="space-y-8">
      {/* Interests Grid */}
      {interests.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {interests.map((interest) => (
            <motion.div key={interest.id} variants={itemVariants} layout>
              <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-indigo-500/20 to-violet-500/20 p-6 transition-all hover:from-indigo-500/40 hover:to-violet-500/40">
                <div className="mb-3 text-4xl transition-transform group-hover:scale-125">
                  {interest.icon}
                </div>
                <p className="font-semibold text-white">{interest.name}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card className="flex items-center justify-center bg-gray-800 p-12">
          <p className="text-gray-400">No interests configured.</p>
        </Card>
      )}
    </div>
  );
}
