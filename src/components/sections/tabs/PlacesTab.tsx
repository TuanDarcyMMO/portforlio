"use client";

import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui";
import HeartButton from "@/components/ui/HeartButton";
import Image from "next/image";
import {
  loadImagesFromFolder,
  preloadImage,
  createDoubleTapDetector,
  createSwipeDetector,
  GalleryImage,
} from "@/lib/galleryUtils";

interface Place {
  id: string;
  name: string;
  folder: string;
  description?: string;
}

interface FloatingHeart {
  id: string;
  x: number;
  y: number;
}

interface PhotoStats {
  likes: number;
  views: number;
  hasLiked: boolean;
}

interface PhotoStatsMap {
  [photoId: string]: PhotoStats;
}

// ===== EDIT HERE: Add or modify places =====
const places: Place[] = [
  {
    id: "1",
    name: "Ho Chi Minh City",
    folder: "hcm",
    description: "Bustling metropolis filled with energy and culture",
  },
  {
    id: "2",
    name: "Da Lat",
    folder: "dalat",
    description: "Cool mountain retreat with timeless charm",
  },
  // Add new place here: { id: "3", name: "Place Name", folder: "folder-name", description: "..." },
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

/**
 * Generate unique photo ID from folder and filename
 */
function generatePhotoId(folder: string, filename: string): string {
  return `${folder}/${filename}`;
}

/**
 * Record a like for a photo
 */
async function recordPhotoLike(photoId: string): Promise<number> {
  try {
    const response = await fetch("/api/photo-like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId }),
    });
    if (!response.ok) throw new Error("Failed to record like");
    const data = await response.json();
    return data.likes;
  } catch (error) {
    console.error("Error recording like:", error);
    return 0;
  }
}

/**
 * Record a view for a photo
 */
async function recordPhotoView(photoId: string): Promise<number> {
  try {
    const response = await fetch("/api/photo-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId }),
    });
    if (!response.ok) throw new Error("Failed to record view");
    const data = await response.json();
    return data.views;
  } catch (error) {
    console.error("Error recording view:", error);
    return 0;
  }
}

interface FullImageViewerProps {
  images: GalleryImage[];
  placeFolder: string;
  currentImageIndex: number;
  onImageIndexChange: (index: number) => void;
  photoStats: PhotoStatsMap;
  onPhotoStatsChange: (photoId: string, stats: PhotoStats) => void;
  onClose: () => void;
}

/**
 * Memoized full-size image viewer component
 * Shows large image with swipe controls, likes, and views
 */
const FullImageViewer = memo(function FullImageViewer({
  images,
  placeFolder,
  currentImageIndex,
  onImageIndexChange,
  photoStats,
  onPhotoStatsChange,
  onClose,
}: FullImageViewerProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cleanupSwipeRef = useRef<(() => void) | null>(null);
  const cleanupDoubleTapRef = useRef<(() => void) | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [isLiking, setIsLiking] = useState(false);

  const currentImage = images[currentImageIndex];
  const photoId = currentImage ? generatePhotoId(placeFolder, currentImage.name) : "";
  const stats = useMemo(
    () => photoStats[photoId] || { likes: 0, views: 0, hasLiked: false },
    [photoId, photoStats]
  );

  /**
   * Record view when image changes
   */
  useEffect(() => {
    if (!currentImage) return;

    const photoId = generatePhotoId(placeFolder, currentImage.name);

    // Record view
    recordPhotoView(photoId).then((viewCount) => {
      onPhotoStatsChange(photoId, {
        ...stats,
        views: viewCount,
      });
    });
  }, [currentImageIndex, currentImage, placeFolder, stats, onPhotoStatsChange]);

  /**
   * Preload images N+1 and N-1 for smooth swiping
   */
  useEffect(() => {
    if (images.length === 0) return;

    const nextIndex = (currentImageIndex + 1) % images.length;
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;

    Promise.all([
      preloadImage(images[nextIndex]?.path || ""),
      preloadImage(images[prevIndex]?.path || ""),
    ]).catch(() => {
      // Preload failure is not critical
    });
  }, [currentImageIndex, images]);

  const handleNextImage = useCallback(() => {
    onImageIndexChange((currentImageIndex + 1) % images.length);
  }, [currentImageIndex, images.length, onImageIndexChange]);

  const handlePrevImage = useCallback(() => {
    onImageIndexChange((currentImageIndex - 1 + images.length) % images.length);
  }, [currentImageIndex, images.length, onImageIndexChange]);

  const handleLike = useCallback(
    async (x: number, y: number) => {
      if (isLiking || stats.hasLiked) return;

      setIsLiking(true);

      try {
        const newLikeCount = await recordPhotoLike(photoId);

        // Update stats
        onPhotoStatsChange(photoId, {
          ...stats,
          likes: newLikeCount,
          hasLiked: true,
        });

        // Show floating heart animation
        const heartId = `${Date.now()}-${Math.random()}`;
        setFloatingHearts((prev) => [...prev, { id: heartId, x, y }]);

        setTimeout(() => {
          setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
        }, 1000);
      } catch (error) {
        console.error("Error handling like:", error);
      } finally {
        setIsLiking(false);
      }
    },
    [photoId, stats, onPhotoStatsChange, isLiking]
  );

  const handleDoubleTapLike = useCallback(
    (x: number, y: number) => {
      if (stats.hasLiked) return;
      handleLike(x, y);
    },
    [stats.hasLiked, handleLike]
  );

  /**
   * Setup gesture detectors (swipe and double-tap)
   */
  useEffect(() => {
    if (!imageContainerRef.current) return;

    // Setup swipe detector with GPU acceleration
    cleanupSwipeRef.current?.();
    cleanupSwipeRef.current = createSwipeDetector(
      imageContainerRef.current,
      {
        onSwipeLeft: () => handleNextImage(),
        onSwipeRight: () => handlePrevImage(),
        onSwipeMove: (diffX: number) => {
          const progress = (diffX / (imageContainerRef.current?.clientWidth || 1)) * 100;
          setSwipeProgress(Math.max(-100, Math.min(100, progress)));
        },
        onSwipeEnd: () => setSwipeProgress(0),
      },
      50,
      0.5
    );

    // Setup double-tap detector
    cleanupDoubleTapRef.current?.();
    cleanupDoubleTapRef.current = createDoubleTapDetector(
      imageContainerRef.current,
      handleDoubleTapLike,
      300
    );

    return () => {
      cleanupSwipeRef.current?.();
      cleanupDoubleTapRef.current?.();
    };
  }, [handleNextImage, handlePrevImage, handleDoubleTapLike]);

  /**
   * Lock background scrolling when viewer is open
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Progress bars - Story style */}
      {images.length > 0 && (
        <div className="flex gap-1 bg-black/50 p-2 z-10">
          {images.map((_, idx) => (
            <motion.div
              key={idx}
              className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`h-full ${
                  idx < currentImageIndex
                    ? "bg-violet-500"
                    : idx === currentImageIndex
                      ? "bg-gradient-to-r from-violet-500 to-purple-500"
                      : "bg-gray-600"
                }`}
                initial={{ scaleX: idx < currentImageIndex ? 1 : 0 }}
                animate={{
                  scaleX: idx < currentImageIndex ? 1 : idx === currentImageIndex ? 0.5 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Close button */}
      <div className="absolute top-4 right-4 z-20">
        <motion.button
          className="text-white hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          <span className="text-3xl">✕</span>
        </motion.button>
      </div>

      {/* Large centered image with GPU acceleration */}
      {currentImage && (
        <motion.div
          ref={imageContainerRef}
          className="flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            touchAction: "none",
          }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{
              x: `calc(${swipeProgress}%)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              // GPU acceleration with transform instead of left/top
              willChange: "transform",
            }}
          >
            <Image
              src={currentImage.path}
              alt={currentImage.name}
              fill
              className="object-contain"
              priority={true}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Floating hearts */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none text-6xl"
            initial={{
              x: heart.x,
              y: heart.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: heart.x + (Math.random() - 0.5) * 100,
              y: heart.y - 200,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bottom controls - Like button and stats */}
      {currentImage && (
        <motion.div
          className="bg-gradient-to-t from-black via-black/70 to-transparent p-6 z-10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image counter  */}
          <div className="text-white/60 text-sm mb-4">
            {currentImageIndex + 1} / {images.length}
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Like button with counter */}
            <HeartButton
              likes={stats.likes}
              hasLiked={stats.hasLiked}
              isLoading={isLiking}
              onClick={handleLike}
            />

            {/* View counter */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80">
              <span className="text-xl">👁</span>
              <span className="font-semibold">{stats.views}</span>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2 ml-auto">
              <motion.button
                onClick={handlePrevImage}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={handleNextImage}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
});

export default function PlacesTab() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [previewImages, setPreviewImages] = useState<{
    [placeId: string]: GalleryImage | null;
  }>({});
  const [photoStats, setPhotoStats] = useState<PhotoStatsMap>({});

  // Load preview images for all places on mount
  useEffect(() => {
    const loadPreviewImages = async () => {
      const previews: { [placeId: string]: GalleryImage | null } = {};

      for (const place of places) {
        try {
          const placeImages = await loadImagesFromFolder(place.folder);
          // Pick random image as preview (from shuffled array)
          previews[place.id] = placeImages.length > 0 ? placeImages[0] : null;
        } catch (error) {
          console.error(`Failed to load preview for ${place.name}:`, error);
          previews[place.id] = null;
        }
      }

      setPreviewImages(previews);
    };

    loadPreviewImages();
  }, []);

  // Load and shuffle images when place is selected
  useEffect(() => {
    if (!selectedPlace) {
      setImages([]);
      return;
    }

    const place = places.find((p) => p.id === selectedPlace);
    if (!place) return;

    const loadImages = async () => {
      const loadedImages = await loadImagesFromFolder(place.folder);
      setImages(loadedImages);
      setCurrentImageIndex(0);

      // Preload first and second images
      if (loadedImages.length > 0) {
        Promise.all([
          preloadImage(loadedImages[0]?.path || ""),
          loadedImages[1] && preloadImage(loadedImages[1].path),
        ]).catch(() => {
          // Preload errors are not critical
        });
      }
    };

    loadImages();
  }, [selectedPlace]);

  const getPlaceFolder = (placeId: string): string => {
    const place = places.find((p) => p.id === placeId);
    return place?.folder || "";
  };

  const handlePhotoStatsChange = useCallback((photoId: string, stats: PhotoStats) => {
    setPhotoStats((prev) => ({
      ...prev,
      [photoId]: stats,
    }));
  }, []);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
          📍 My Favorite Places
        </h2>
        <p className="text-gray-400 text-sm">
          Click a place to explore. Swipe to navigate. Double-tap or click heart to like.
        </p>
      </div>

      {/* Places Gallery - Responsive Grid */}
      {places.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 w-full"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
            maxWidth: "100%",
          }}
        >
          {places.map((place) => {
            const previewImage = previewImages[place.id];

            return (
              <motion.div
                key={place.id}
                variants={itemVariants}
                layout
                onClick={() => setSelectedPlace(selectedPlace === place.id ? null : place.id)}
                className="cursor-pointer group"
              >
                <Card className="relative overflow-hidden bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 aspect-[4/3]">
                  {/* Image Preview */}
                  {previewImage ? (
                    <motion.div
                      className="w-full h-full relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={previewImage.path}
                        alt={place.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {/* Subtle overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                      <p className="text-3xl">📸</p>
                    </div>
                  )}
                </Card>

                {/* Place Name and Description */}
                <div className="mt-3">
                  <h3 className="font-semibold text-white text-sm">{place.name}</h3>
                  {place.description && (
                    <p className="text-xs text-gray-400 mt-1">{place.description}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <Card className="flex items-center justify-center bg-gray-800/50 p-12">
          <p className="text-gray-400">No places configured yet.</p>
        </Card>
      )}

      {/* Full-size image viewer takes over screen */}
      <AnimatePresence>
        {selectedPlace && (
          <FullImageViewer
            images={images}
            placeFolder={getPlaceFolder(selectedPlace)}
            currentImageIndex={currentImageIndex}
            onImageIndexChange={setCurrentImageIndex}
            photoStats={photoStats}
            onPhotoStatsChange={handlePhotoStatsChange}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </AnimatePresence>

      {/* Close button overlay when viewer is open */}
      {selectedPlace && (
        <motion.div
          className="fixed inset-0 z-40"
          onClick={() => setSelectedPlace(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
