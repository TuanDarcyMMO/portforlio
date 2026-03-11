"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

interface HeartButtonProps {
  likes: number;
  hasLiked: boolean;
  isLoading?: boolean;
  onClick: (x: number, y: number) => void;
}

/**
 * Isolated heart button component to prevent parent re-renders
 * Uses React.memo for performance optimization
 */
const HeartButton = memo(function HeartButton({
  likes,
  hasLiked,
  isLoading,
  onClick,
}: HeartButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || hasLiked) return;
    onClick(e.clientX, e.clientY);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={hasLiked || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        hasLiked ? "bg-red-500/30 text-red-400" : "bg-white/20 hover:bg-white/30 text-white"
      }`}
      whileHover={!hasLiked ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      style={{
        willChange: "transform",
        transform: "translateZ(0)", // GPU acceleration
      }}
    >
      <motion.span
        className="text-2xl inline-block"
        animate={hasLiked ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.25 }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)", // GPU acceleration
        }}
      >
        ❤️
      </motion.span>
      <span className="font-semibold">{likes}</span>
    </motion.button>
  );
});

export default HeartButton;
