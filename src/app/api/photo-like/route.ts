/**
 * API Route: Record and retrieve photo likes
 * Uses SQLite database for persistence across all users
 */

import { NextRequest, NextResponse } from "next/server";
import { recordPhotoLike, getPhotoStats } from "@/lib/database";

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  return request.ip || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const { photoId } = await request.json();

    if (!photoId || typeof photoId !== "string") {
      return NextResponse.json({ error: "Invalid photoId" }, { status: 400 });
    }

    const ipAddress = getClientIP(request);
    const result = await recordPhotoLike(photoId, ipAddress);

    return NextResponse.json(
      {
        success: true,
        isNewLike: result.isNewLike,
        likes: result.likes,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error recording like:", error);
    return NextResponse.json({ error: "Failed to record like" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const photoId = request.nextUrl.searchParams.get("photoId");

    if (!photoId) {
      return NextResponse.json({ error: "Missing photoId parameter" }, { status: 400 });
    }

    const ipAddress = getClientIP(request);
    const stats = await getPhotoStats(photoId, ipAddress);

    return NextResponse.json(
      {
        photoId,
        likes: stats.likes,
        hasLiked: stats.hasLiked,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}
