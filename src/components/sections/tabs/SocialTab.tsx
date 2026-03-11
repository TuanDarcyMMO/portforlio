"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import Image from "next/image";

interface SocialLink {
  id: string;
  name: string;
  link: string;
  iconImage: string;
}

// ===== EDIT HERE: Add or modify social links =====
const socials: SocialLink[] = [
  {
    id: "1",
    name: "Discord",
    link: "https://discord.gg/n9AmftVzxT",
    iconImage: "/icons/discord.jpg",
  },
  {
    id: "2",
    name: "TikTok",
    link: "https://www.tiktok.com/@tuandarcy",
    iconImage: "/icons/tiktok.png",
  },
  {
    id: "3",
    name: "GitHub",
    link: "https://github.com/TuanDarcy",
    iconImage: "/icons/github.png",
  },
  {
    id: "4",
    name: "Telegram",
    link: "https://t.me/tuandarcy",
    iconImage: "/icons/telegram.png",
  },
  {
    id: "5",
    name: "Facebook",
    link: "https://www.facebook.com/tuandarcy",
    iconImage: "/icons/facebook.png",
  },
  {
    id: "6",
    name: "Instagram",
    link: "https://www.instagram.com/tuan.darcy/",
    iconImage: "/icons/instagram.jpg",
  },
  {
    id: "7",
    name: "YouTube",
    link: "https://youtube.com/@tuandarcy",
    iconImage: "/icons/youtube.png",
  },
  {
    id: "8",
    name: "Zalo",
    link: "tel:+840385696303",
    iconImage: "/icons/zalo.png",
  },
];
// ================================================

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function SocialTab() {
  return (
    <div className="space-y-16">
      {/* Social Links - Cards with Custom Icons */}
      {socials.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="mb-8 text-lg font-semibold text-gray-300">Connect With Me</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
          >
            {socials.map((social) => (
              <motion.a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card className="relative flex h-32 flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 p-6 transition-all duration-300 hover:from-indigo-500/40 hover:to-violet-500/40 hover:shadow-lg hover:shadow-indigo-500/30">
                  {/* Icon Container */}
                  <div className="relative h-12 w-12 transition-transform group-hover:scale-125">
                    <Image
                      src={social.iconImage}
                      alt={social.name}
                      fill
                      className="object-contain text-indigo-300"
                    />
                  </div>

                  {/* Platform Name */}
                  <span className="text-center text-sm font-semibold text-white transition-colors group-hover:text-indigo-200">
                    {social.name}
                  </span>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <Card className="flex items-center justify-center bg-gray-800 p-12">
          <p className="text-gray-400">No social links configured.</p>
        </Card>
      )}

      {/* Contact Information Section */}
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12">
          <h3 className="mb-8 text-lg font-semibold text-white">Contact Information</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-gray-300">Contact via email</p>
              <a
                href="mailto:sharkblack2k7@gmail.com"
                className="text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                sharkblack2k7@gmail.com
              </a>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Contact via phone (Vietnam)</p>
              <a
                href="tel:+840385696303"
                className="text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                0385696303
              </a>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Response Time Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12">
          <h3 className="mb-8 text-lg font-semibold text-white">Response Time</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "Discord",
                time: "Within 1 hour",
                icon: "⚡",
              },
              {
                title: "Facebook",
                time: "Within 1 hour",
                icon: "📱",
              },
              {
                title: "Zalo",
                time: "Within 1 hour",
                icon: "💻",
              },
              {
                title: "Telegram",
                time: "Within 1 hour",
                icon: "✈️",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-2 text-3xl">{item.icon}</div>
                <p className="mb-1 text-sm font-semibold text-indigo-200">{item.title}</p>
                <p className="text-sm text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
