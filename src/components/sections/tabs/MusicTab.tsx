"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { audioManager } from "@/lib/audioManager";

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audio?: string; // Optional custom audio file path
}

// ===== EDIT HERE: Add or modify songs =====
const songs: Song[] = [
  {
    id: "1",
    title: "Nếu lúc đó",
    artist: "tlinh",
    cover: "🎵",
    audio: "/music/neulucdo.mp3",
  },
  {
    id: "2",
    title: "KHÔNG BUÔNG",
    artist: "Hngle",
    cover: "🎵",
    audio: "/music/khongbuong.mp3",
  },
  {
    id: "3",
    title: "Buông",
    artist: "Hngle",
    cover: "🎵",
    audio: "/music/buong.mp3",
  },
  {
    id: "4",
    title: "Akuma no Ko",
    artist: "Masako Yoshikawa",
    cover: "🎵",
    audio: "/music/akumanoko.mp3",
  },
  // Add new song here: { id: "5", title: "Song Title", artist: "Artist Name", cover: "emoji" },
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

export default function MusicTab() {
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const songAudioRef = useRef<HTMLAudioElement>(null);
  const [, setUpdateTrigger] = useState(0);

  // Initialize song audio with audio manager
  useEffect(() => {
    if (!songAudioRef.current) return;

    audioManager.initializeSong(songAudioRef.current);

    // Listen to audio manager state changes
    const unsubscribe = audioManager.subscribe(() => {
      setUpdateTrigger((prev) => prev + 1);
    });

    return unsubscribe;
  }, []);

  // Update playing state from audio element
  useEffect(() => {
    const audio = songAudioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setNowPlaying(null);
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleSongClick = (songId: string) => {
    // If clicking the same song and it's playing, pause it
    if (nowPlaying === songId && isPlaying) {
      audioManager.pauseSong();
      setIsPlaying(false);
      setNowPlaying(null);
      return;
    }

    // Play the selected song
    const song = songs.find((s) => s.id === songId);
    if (song) {
      // Use custom audio path if provided, otherwise construct from title
      let audioPath = song.audio;
      if (!audioPath) {
        const songFilename = song.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        audioPath = `/music/${songFilename}.mp3`;
      }
      audioManager.playSong(audioPath);
      setNowPlaying(songId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hidden song audio element */}
      <audio ref={songAudioRef} crossOrigin="anonymous" preload="metadata" />

      {/* Music Playlist */}
      {songs.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {songs.map((song) => {
            const isCurrentSong = nowPlaying === song.id;
            const shouldShowPlayControl = isCurrentSong;

            return (
              <motion.div key={song.id} variants={itemVariants}>
                <motion.button
                  onClick={() => handleSongClick(song.id)}
                  className="w-full text-left"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 transition-all hover:from-purple-500/40 hover:to-pink-500/40">
                    {/* Song Cover */}
                    <div className="mb-4 text-center">
                      <motion.div
                        className="mx-auto mb-3 inline-flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-5xl transition-transform group-hover:scale-110"
                        animate={isCurrentSong && isPlaying ? { scale: [1, 1.05, 1] } : {}}
                        transition={
                          isCurrentSong && isPlaying ? { duration: 0.8, repeat: Infinity } : {}
                        }
                      >
                        {song.cover}
                      </motion.div>
                    </div>

                    {/* Song Info */}
                    <h3 className="mb-1 text-center font-semibold text-white">{song.title}</h3>
                    <p className="mb-4 text-center text-sm text-gray-400">{song.artist}</p>

                    {/* Play/Pause Control */}
                    {shouldShowPlayControl && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: isPlaying ? Infinity : 0,
                            ease: "linear",
                          }}
                          className="text-2xl"
                        >
                          🎵
                        </motion.div>
                        <span className="text-xs text-indigo-300 font-medium">
                          {isPlaying ? "Playing..." : "Paused"}
                        </span>
                      </motion.div>
                    )}
                  </Card>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <Card className="flex items-center justify-center bg-gray-800 p-12">
          <p className="text-gray-400">No songs configured.</p>
        </Card>
      )}

      {/* Info Card */}
    </div>
  );
}

// {/* <Card className="bg-gradient-to-br from-gray-800 to-gray-900 p-6">
//         <h3 className="mb-3 text-sm font-semibold text-gray-300">🎵 Add Music</h3>
//         <p className="text-xs text-gray-400">
//           Edit the songs array in this file to add, remove, or modify songs. Each song needs a
//           title, artist, and cover emoji. You can use any emoji as the cover image.
//         </p>
//       </Card> */}
