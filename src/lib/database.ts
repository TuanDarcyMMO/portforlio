/**
 * ⚠️ DEPRECATED: Database module
 *
 * This file is deprecated and no longer used.
 *
 * REASON: Prisma with SQLite does not work on Vercel serverless environment.
 * Local file persistence cannot work on serverless functions.
 *
 * REPLACEMENT: src/lib/galleryStorage.ts
 * - Uses client-side localStorage for gallery stats
 * - Works on all platforms including Vercel
 * - Stats are stored per browser/device
 *
 * The gallery like/view system now uses localStorage instead of a database.
 */

// This file is kept for reference but should not be imported
