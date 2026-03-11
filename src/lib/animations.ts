import { Variants } from "framer-motion";
import { ANIMATION_DURATIONS, ANIMATION_DELAYS } from "./constants";

/**
 * Reusable Framer Motion animation variants
 */

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.FAST,
    },
  },
};

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: ANIMATION_DURATIONS.FAST,
    },
  },
};

export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: "easeOut",
    },
  },
};

export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: "easeOut",
    },
  },
};

export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: "easeOut",
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: "easeOut",
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_DELAYS.SHORT,
      delayChildren: ANIMATION_DELAYS.QUICK,
    },
  },
};

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
    },
  },
};

export const rotateInVariants: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: "easeOut",
    },
  },
};

export const bounceVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      y: {
        yoyo: Infinity,
        duration: 1,
      },
    },
  },
};

/**
 * Get stagger delay for index
 */
export const getStaggerDelay = (index: number, stagger: number = ANIMATION_DELAYS.SHORT) => {
  return index * stagger;
};

/**
 * Get slide variants by direction
 */
export const getSlideVariants = (direction: "up" | "down" | "left" | "right"): Variants => {
  const variants: Record<string, Variants> = {
    up: slideUpVariants,
    down: slideDownVariants,
    left: slideLeftVariants,
    right: slideRightVariants,
  };
  return variants[direction];
};
