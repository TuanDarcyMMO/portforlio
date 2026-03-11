"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { staggerContainerVariants, staggerChildVariants } from "@/lib/animations";

interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: "frontend" | "backend" | "tools" | "design";
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", proficiency: 95, category: "frontend" },
        { name: "Next.js", proficiency: 90, category: "frontend" },
        { name: "TypeScript", proficiency: 90, category: "frontend" },
        { name: "TailwindCSS", proficiency: 95, category: "frontend" },
        { name: "Framer Motion", proficiency: 85, category: "frontend" },
      ],
    },
    {
      name: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", proficiency: 90, category: "backend" },
        { name: "Express.js", proficiency: 88, category: "backend" },
        { name: "PostgreSQL", proficiency: 85, category: "backend" },
        { name: "MongoDB", proficiency: 80, category: "backend" },
        { name: "REST APIs", proficiency: 92, category: "backend" },
      ],
    },
    {
      name: "Tools & Others",
      icon: "🛠️",
      skills: [
        { name: "Git & GitHub", proficiency: 95, category: "tools" },
        { name: "Docker", proficiency: 75, category: "tools" },
        { name: "Figma", proficiency: 80, category: "design" },
        { name: "AWS", proficiency: 70, category: "tools" },
        { name: "CI/CD", proficiency: 80, category: "tools" },
      ],
    },
  ];

  const SkillBar = ({ skill, delay }: { skill: Skill; delay: number }) => (
    <motion.div
      key={skill.name}
      variants={staggerChildVariants}
      className="space-y-2"
      transition={{ delay }}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-200">{skill.name}</span>
        <span className="text-sm text-primary font-semibold">{skill.proficiency}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );

  return (
    <Section id="skills" variant="default" className="py-24">
      <Container className="max-w-6xl">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={staggerChildVariants} className="text-center space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30">
              <p className="text-sm font-medium text-secondary">Skills & Expertise</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Technologies I Master</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit built over years of professional development experience.
              Constantly learning and adapting to new technologies.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid md:grid-cols-3 gap-8 lg:gap-10"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div key={category.name} variants={staggerChildVariants}>
                <Card variant="gradient" className="h-full space-y-6">
                  {/* Category Header */}
                  <div className="space-y-2 pb-4 border-b border-white/10">
                    <div className="text-4xl">{category.icon}</div>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        delay={categoryIndex * 0.1 + skillIndex * 0.05}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Skills Cloud */}
          <motion.div variants={staggerChildVariants} className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Other Technologies</h3>
            <motion.div
              variants={staggerContainerVariants}
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              {[
                "JavaScript",
                "HTML5",
                "CSS3",
                "GraphQL",
                "WebSockets",
                "JWT",
                "Redux",
                "Testing Library",
                "Jest",
                "Webpack",
                "Prisma",
                "Firebase",
                "Stripe",
                "Payment Integration",
                "SEO",
                "Performance Optimization",
              ].map((skill) => (
                <motion.div
                  key={skill}
                  variants={staggerChildVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <div className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-sm font-medium text-primary cursor-pointer transition-all hover:border-primary/60 hover:bg-primary/30">
                    {skill}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
