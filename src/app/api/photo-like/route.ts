/**
 * ⚠️ DEPRECATED API Route: Photo likes
 *
 * This endpoint is no longer used. Gallery stats now use client-side localStorage.
 *
 * REASON: Prisma with SQLite does not work on Vercel serverless environment.
 * REPLACEMENT: src/lib/galleryStorage.ts - Client-side localStorage
 */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "This API endpoint is deprecated. Use client-side storage instead.",
      message: "Gallery likes are now tracked using browser localStorage",
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: "This API endpoint is deprecated. Use client-side storage instead.",
      message: "Gallery likes are now tracked using browser localStorage",
    },
    { status: 410 }
  );
}
