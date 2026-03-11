"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainerVariants, staggerChildVariants } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  animate?: boolean;
}

export function AnimatedText({
  text,
  className,
  as: Component = "p",
  animate = true,
}: AnimatedTextProps) {
  if (!animate) {
    return <Component className={className}>{text}</Component>;
  }

  const words = text.split(" ");

  return (
    <motion.div
      className={cn("inline", className)}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={staggerChildVariants} className="inline mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
