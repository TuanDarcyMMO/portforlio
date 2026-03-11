"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { staggerContainerVariants, staggerChildVariants } from "@/lib/animations";

export function AboutSection() {
  const highlights = [
    {
      icon: "💻",
      title: "Full-Stack Developer",
      description: "Creating end-to-end web solutions with modern technologies",
    },
    {
      icon: "🎨",
      title: "UI/UX Designer",
      description: "Designing premium interfaces with attention to detail",
    },
    {
      icon: "⚡",
      title: "Performance Focus",
      description: "Building fast, optimized applications for the best user experience",
    },
    {
      icon: "🚀",
      title: "Problem Solver",
      description: "Tackling complex challenges with creative solutions",
    },
  ];

  return (
    <Section id="about" variant="alt" className="py-24">
      <Container className="max-w-5xl">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={staggerChildVariants} className="text-center space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <p className="text-sm font-medium text-primary">About Me</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Passion for Creation</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              With years of experience in building premium digital experiences, I combine technical
              expertise with design sensibility to create memorable interfaces.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Text */}
            <motion.div variants={staggerChildVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-3">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed">
                  My name is Tuan Anh, and I am a passionate full-stack web developer with a strong
                  interest in building modern, performant web applications and creative digital
                  experiences. I specialize in working with Lua, Python, and automation tools,
                  focusing on creating efficient systems, scalable solutions, and interactive web
                  interfaces. I enjoy turning ideas into functional products and continuously
                  exploring new technologies to improve performance and user experience. Currently,
                  I am a first-year student at the University of Information Technology – Ho Chi
                  Minh City (UIT), beginning my academic journey in the 2025–2026 academic year.
                  Alongside my studies, I actively work on personal projects to sharpen my
                  development skills and experiment with new concepts in web engineering.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">What I Do</h3>
                <p className="text-gray-300 leading-relaxed">
                  My work spans across both frontend and backend development. I enjoy designing
                  clean interfaces, implementing smooth animations, and building robust backend
                  systems that power modern web applications. In addition to web development, I also
                  focus on automation tools and scripting, using languages like Python and Lua to
                  build efficient workflows, custom tools, and problem-solving utilities. Every
                  project I build is an opportunity to experiment, learn, and push the boundaries of
                  what I can create.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">My Approach</h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  I believe great software is built with a balance of clean architecture, thoughtful
                  design, and strong performance optimization.
                </p>

                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Writing maintainable and scalable code</li>
                  <li>Creating intuitive and responsive user interfaces</li>
                  <li>Optimizing performance and interaction smoothness</li>
                  <li>Continuously learning and improving through experimentation</li>
                </ul>

                <p className="text-gray-300 leading-relaxed mt-4">
                  For me, development is not just about writing code — it is about crafting
                  experiences and building tools that solve real problems.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Highlights */}
            <motion.div variants={staggerChildVariants} className="space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerChildVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card variant="glass" className="h-full">
                    <div className="space-y-3">
                      <div className="text-3xl">{item.icon}</div>
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats / Numbers Section */}
          <motion.div variants={staggerChildVariants}>
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              {[
                { number: "10+", label: "Projects Completed" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "1+", label: "Years Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={staggerChildVariants}
                  className="text-center space-y-2"
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold gradient-text"
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
