"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Section, Card } from "@/components/ui";

const games = [
  {
    id: 1,
    name: "Teamfight Tactics",
    shortName: "TFT",
    icon: "♟️",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "hover:from-blue-500/40 hover:to-cyan-500/40",
  },
  {
    id: 2,
    name: "Roblox",
    shortName: "Roblox",
    icon: "🧱",
    color: "from-red-500/20 to-orange-500/20",
    hoverColor: "hover:from-red-500/40 hover:to-orange-500/40",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function GamesSection() {
  return (
    <Section className="py-20">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400">
            Gaming
          </div>
          <h2 className="mb-4 text-4xl font-bold">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Games I Play
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            A collection of games I enjoy playing and compete in
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <Card
                className={`group relative overflow-hidden bg-gradient-to-br ${game.color} ${game.hoverColor} p-8 transition-all md:p-12`}
              >
                {/* Game Icon */}
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-5xl transition-transform group-hover:scale-110">
                  {game.icon}
                </div>

                {/* Game Info */}
                <h3 className="mb-2 text-2xl font-bold text-white">{game.name}</h3>
                <p className="mb-6 text-sm text-gray-400">
                  {game.shortName === "TFT"
                    ? "Strategic auto-battler gameplay with competitive ranking"
                    : "Creative building and gaming with diverse experiences"}
                </p>

                {/* Status Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/50 to-violet-500/50 px-4 py-2 text-sm text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  Active Player
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 transition-transform group-hover:scale-125" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
