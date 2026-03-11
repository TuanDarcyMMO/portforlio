/**
 * Site Configuration
 */
export const SITE_CONFIG = {
  name: "Portfolio",
  description: "A high-end personal portfolio website",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "Your Name",
  email: "your.email@example.com",
};

/**
 * Navigation Links
 */
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/**
 * Animation Durations (in seconds)
 */
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  EXTRA_SLOW: 1.2,
};

/**
 * Animation Delays (in seconds)
 */
export const ANIMATION_DELAYS = {
  QUICK: 0.1,
  SHORT: 0.2,
  MEDIUM: 0.3,
  LONG: 0.5,
};

/**
 * Breakpoints
 */
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
  ULTRA: 1536,
};

/**
 * Colors (CSS variables)
 */
export const COLORS = {
  PRIMARY: "hsl(var(--color-primary))",
  SECONDARY: "hsl(var(--color-secondary))",
  ACCENT: "hsl(var(--color-accent))",
  BACKGROUND: "hsl(var(--color-background))",
  FOREGROUND: "hsl(var(--color-foreground))",
};

/**
 * Z-Index Stack
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
};
