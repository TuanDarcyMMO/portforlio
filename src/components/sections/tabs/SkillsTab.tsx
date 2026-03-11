"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import Image from "next/image";

interface Skill {
  name: string;
  proficiency: number;
  icon?: string; // Optional icon path
}

const skillsData: Skill[] = [
  { name: "C++", proficiency: 60, icon: "/images/skills/cpp.png" },
  { name: "Python", proficiency: 65, icon: "/images/skills/python.png" },
  { name: "Lua", proficiency: 80, icon: "/images/skills/lua.png" },
  { name: "Frontend", proficiency: 90, icon: "/images/skills/frontend.png" },
  { name: "Backend", proficiency: 50, icon: "/images/skills/backend.png" },
  { name: "AI Tools", proficiency: 90, icon: "/images/skills/ai.png" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function SkillsTab() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {skillsData.map((skill) => (
        <motion.div key={skill.name} variants={itemVariants}>
          <Card className="h-full bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            {/* Skill Header with Icon */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {skill.icon && (
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-700">
                    <Image src={skill.icon} alt={skill.name} fill className="object-contain p-1" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              </div>
              <span className="text-sm font-bold text-indigo-400">{skill.proficiency}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 overflow-hidden rounded-full bg-gray-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
              />
            </div>

            {/* Skill Level Text */}
            <p className="mt-3 text-xs text-gray-400">
              {skill.proficiency >= 90
                ? "Expert"
                : skill.proficiency >= 80
                  ? "Advanced"
                  : "Intermediate"}
            </p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
