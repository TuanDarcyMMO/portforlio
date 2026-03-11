/**
 * API Route: Record and retrieve photo views
 * POST - Record a view from an IP
 * GET - Get view count for a photo
 */

import { NextRequest, NextResponse } from "next/server";
import { recordPhotoView, getPhotoStats } from "@/lib/database";

function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback to socket address if available
  const ip = request.ip || "unknown";
  return ip;
}

export async function POST(request: NextRequest) {
  try {
    const { photoId } = await request.json();

    if (!photoId || typeof photoId !== "string") {
      return NextResponse.json({ error: "Invalid photoId" }, { status: 400 });
    }

    const ipAddress = getClientIP(request);
    const result = await recordPhotoView(photoId, ipAddress);

    return NextResponse.json(
      {
        success: true,
        isNewView: result.isNewView,
        views: result.views,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error recording view:", error);
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
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
        views: stats.views,
        hasViewed: stats.hasViewed,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}
