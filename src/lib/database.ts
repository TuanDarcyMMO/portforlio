import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Hash IP address for privacy
 */
export function hashIP(ipAddress: string): string {
  return crypto.createHash("sha256").update(ipAddress).digest("hex");
}

/**
 * Record a photo like
 */
export async function recordPhotoLike(
  photoId: string,
  ipAddress: string
): Promise<{ isNewLike: boolean; likes: number }> {
  const hashedIP = hashIP(ipAddress);

  // Check if already liked
  const existingLike = await prisma.photoLike.findUnique({
    where: {
      photoId_ipAddress: {
        photoId,
        ipAddress: hashedIP,
      },
    },
  });

  if (existingLike) {
    // Already liked, just return count
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    return { isNewLike: false, likes: photo?.likes ?? 0 };
  }

  // New like - create record and increment counter
  await prisma.photoLike.create({
    data: {
      photoId,
      ipAddress: hashedIP,
    },
  });

  const photo = await prisma.photo.upsert({
    where: { id: photoId },
    update: { likes: { increment: 1 } },
    create: { id: photoId, likes: 1 },
  });

  return { isNewLike: true, likes: photo.likes };
}

/**
 * Record a photo view
 */
export async function recordPhotoView(
  photoId: string,
  ipAddress: string
): Promise<{ isNewView: boolean; views: number }> {
  const hashedIP = hashIP(ipAddress);

  // Check if already viewed
  const existingView = await prisma.photoView.findUnique({
    where: {
      photoId_ipAddress: {
        photoId,
        ipAddress: hashedIP,
      },
    },
  });

  if (existingView) {
    // Already viewed, just return count
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    return { isNewView: false, views: photo?.views ?? 0 };
  }

  // New view - create record and increment counter
  await prisma.photoView.create({
    data: {
      photoId,
      ipAddress: hashedIP,
    },
  });

  const photo = await prisma.photo.upsert({
    where: { id: photoId },
    update: { views: { increment: 1 } },
    create: { id: photoId, views: 1 },
  });

  return { isNewView: true, views: photo.views };
}

/**
 * Get photo stats
 */
export async function getPhotoStats(
  photoId: string,
  ipAddress?: string
): Promise<{ likes: number; views: number; hasLiked: boolean; hasViewed: boolean }> {
  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
  });

  if (!photo) {
    return { likes: 0, views: 0, hasLiked: false, hasViewed: false };
  }

  if (!ipAddress) {
    return { likes: photo.likes, views: photo.views, hasLiked: false, hasViewed: false };
  }

  const hashedIP = hashIP(ipAddress);

  const [liked, viewed] = await Promise.all([
    prisma.photoLike.findUnique({
      where: {
        photoId_ipAddress: {
          photoId,
          ipAddress: hashedIP,
        },
      },
    }),
    prisma.photoView.findUnique({
      where: {
        photoId_ipAddress: {
          photoId,
          ipAddress: hashedIP,
        },
      },
    }),
  ]);

  return {
    likes: photo.likes,
    views: photo.views,
    hasLiked: !!liked,
    hasViewed: !!viewed,
  };
}
