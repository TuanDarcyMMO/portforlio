"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function VisitCounter() {
  const [visits, setVisits] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get current visit count from localStorage
    const storedVisits = localStorage.getItem("portfolio_visits");
    const currentVisits = storedVisits ? parseInt(storedVisits, 10) : 0;
    const newVisits = currentVisits + 1;

    // Save updated count
    localStorage.setItem("portfolio_visits", newVisits.toString());
    setVisits(newVisits);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 transition-colors z-40"
    >
      <span className="text-lg">👁</span>
      <span className="text-sm font-medium text-gray-300">{visits.toLocaleString()}</span>
    </motion.div>
  );
}
