"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  image: string;
  author?: string;
}

// ===== EDIT HERE: Add or modify books =====
const books: Book[] = [
  {
    id: "1",
    title: "Rich Dad Poor Dad",
    image: "/images/books/RichDadPoorDad.jpg",
    author: "Robert T. Kiyosaki",
  },
  {
    id: "2",
    title: "How to Win Friends and Influence People",
    image: "/images/books/dacnhantam.jpg",
    author: "Dale Carnegie",
  },
  {
    id: "3",
    title: " Think and Grow Rich",
    image: "/images/books/thinkrichgrowrich.jpg",
    author: "Napoleon Hill",
  },
  {
    id: "4",
    title: "Dare to be Rich",
    image: "/images/books/DaretobeRich.jpg",
    author: "Phạm Tuấn Sơn",
  },
  // Add new book here: { id: "5", title: "Book Title", image: "/images/books/bookX.jpg", author: "Author Name" },
];
// ================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function BooksTab() {
  return (
    <div className="space-y-8">
      {/* Books Shelf */}
      {books.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {books.map((book) => (
            <motion.div key={book.id} variants={itemVariants} layout>
              <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 p-4 transition-all hover:from-orange-500/40 hover:to-red-500/40">
                {/* Book Cover Image */}
                <div className="relative mb-4 aspect-[2/3] overflow-hidden rounded-lg bg-gray-700">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>

                {/* Book Info */}
                <h3 className="mb-2 text-center text-sm font-semibold text-white">{book.title}</h3>
                {book.author && <p className="text-center text-xs text-gray-400">{book.author}</p>}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card className="flex items-center justify-center bg-gray-800 p-12">
          <p className="text-gray-400">No books configured.</p>
        </Card>
      )}
    </div>
  );
}
