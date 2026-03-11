/**
 * Client-side gallery storage using localStorage
 * Replaces Prisma database for Vercel serverless deployment
 * Stats are stored per browser/device - not shared across visitors
 */

interface PhotoStats {
  photoId: string;
  likes: number;
  views: number;
  likedBy: string[]; // Array of tracked identifiers
  viewedBy: string[]; // Array of tracked identifiers
}

const STORAGE_KEY = "gallery_stats";

/**
 * Generate a unique identifier for tracking (uses localStorage key)
 */
function getVisitorId(): string {
  if (typeof window === "undefined") return "server";

  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
}

/**
 * Get all gallery stats from localStorage
 */
function getAllStats(): PhotoStats[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.error("Failed to parse gallery stats");
    return [];
  }
}

/**
 * Save stats to localStorage
 */
function saveStats(stats: PhotoStats[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    console.error("Failed to save gallery stats");
  }
}

/**
 * Get or create stats for a photo
 */
function getPhotoStats(photoId: string): PhotoStats {
  const allStats = getAllStats();
  let photoStats = allStats.find((s) => s.photoId === photoId);

  if (!photoStats) {
    photoStats = {
      photoId,
      likes: 0,
      views: 0,
      likedBy: [],
      viewedBy: [],
    };
    allStats.push(photoStats);
    saveStats(allStats);
  }

  return photoStats;
}

/**
 * Record a like for a photo
 */
export function recordLike(photoId: string): { isNewLike: boolean; likes: number } {
  const visitorId = getVisitorId();
  const stats = getPhotoStats(photoId);

  const hasLiked = stats.likedBy.includes(visitorId);
  if (!hasLiked) {
    stats.likedBy.push(visitorId);
    stats.likes = stats.likedBy.length;

    const allStats = getAllStats();
    const index = allStats.findIndex((s) => s.photoId === photoId);
    if (index >= 0) {
      allStats[index] = stats;
    }
    saveStats(allStats);

    return { isNewLike: true, likes: stats.likes };
  }

  return { isNewLike: false, likes: stats.likes };
}

/**
 * Record a view for a photo
 */
export function recordView(photoId: string): { isNewView: boolean; views: number } {
  const visitorId = getVisitorId();
  const stats = getPhotoStats(photoId);

  const hasViewed = stats.viewedBy.includes(visitorId);
  if (!hasViewed) {
    stats.viewedBy.push(visitorId);
    stats.views = stats.viewedBy.length;

    const allStats = getAllStats();
    const index = allStats.findIndex((s) => s.photoId === photoId);
    if (index >= 0) {
      allStats[index] = stats;
    }
    saveStats(allStats);

    return { isNewView: true, views: stats.views };
  }

  return { isNewView: false, views: stats.views };
}

/**
 * Get stats and check if current visitor has liked/viewed
 */
export function getStats(photoId: string): {
  likes: number;
  views: number;
  hasLiked: boolean;
  hasViewed: boolean;
} {
  const visitorId = getVisitorId();
  const stats = getPhotoStats(photoId);

  return {
    likes: stats.likes,
    views: stats.views,
    hasLiked: stats.likedBy.includes(visitorId),
    hasViewed: stats.viewedBy.includes(visitorId),
  };
}

/**
 * Clear all gallery stats (for reset)
 */
export function clearAllStats(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
