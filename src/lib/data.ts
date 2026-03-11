/**
 * Portfolio Data Structure
 * This file contains all the data for the portfolio website
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "fullstack" | "tools" | "other";
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "education" | "work" | "achievement" | "milestone";
}

/**
 * Sample Projects Data
 * Replace with your actual projects
 */
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Project 1",
    description: "Description of your amazing project",
    tags: ["React", "TailwindCSS", "Next.js"],
    link: "#",
  },
  {
    id: "2",
    title: "Project 2",
    description: "Another great project showcase",
    tags: ["APIs", "Node.js", "PostgreSQL"],
    link: "#",
  },
];

/**
 * Sample Achievements Data
 */
export const achievementsData: Achievement[] = [
  {
    id: "1",
    title: "Achievement 1",
    description: "Your achievement description",
    date: "2024",
  },
  {
    id: "2",
    title: "Achievement 2",
    description: "Another achievement",
    date: "2023",
  },
];

/**
 * Sample Skills Data
 */
export const skillsData: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "frontend",
    proficiency: "expert",
  },
  {
    id: "2",
    name: "TypeScript",
    category: "fullstack",
    proficiency: "advanced",
  },
  {
    id: "3",
    name: "Node.js",
    category: "backend",
    proficiency: "advanced",
  },
  {
    id: "4",
    name: "Framer Motion",
    category: "frontend",
    proficiency: "intermediate",
  },
];

/**
 * Sample Timeline Data
 */
export const timelineData: TimelineEntry[] = [
  {
    id: "1",
    title: "Started coding",
    description: "Began learning web development",
    date: "2020",
    type: "milestone",
  },
  {
    id: "2",
    title: "First project",
    description: "Completed first production project",
    date: "2021",
    type: "achievement",
  },
];

/**
 * Skills by Category
 */
export const skillsByCategory = {
  frontend: skillsData.filter((s) => s.category === "frontend"),
  backend: skillsData.filter((s) => s.category === "backend"),
  fullstack: skillsData.filter((s) => s.category === "fullstack"),
  tools: skillsData.filter((s) => s.category === "tools"),
};
