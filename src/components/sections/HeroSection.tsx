"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { staggerContainerVariants, staggerChildVariants, fadeInVariants } from "@/lib/animations";
import { scrollToSection } from "@/lib/scrollUtils";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide scroll indicator after scrolling more than 100px
      setIsVisible(currentScrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Section
      id="home"
      variant="default"
      noPadding
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 via-transparent to-primary/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          className="space-y-8 text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge / Tagline */}
          <motion.div variants={staggerChildVariants} className="inline-block mx-auto">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
              <p className="text-sm font-medium text-primary">Welcome to my creative space</p>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={staggerChildVariants}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="gradient-text block py-2">WELCOME</span>
              <span className="gradient-text block py-2">TO MY PORTFOLIO</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={staggerChildVariants}>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I create high-end, animated web experiences that blend design with technology. Premium
              interfaces, smooth animations, and modern interactions.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerChildVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="group relative overflow-hidden"
              onClick={() => scrollToSection("skills")}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border border-secondary/50 hover:border-secondary"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeInVariants}
            className="pt-12"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 1 }}
          >
            <motion.div
              variants={scrollVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-sm text-gray-400">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-2 bg-primary rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </Section>
  );
}
