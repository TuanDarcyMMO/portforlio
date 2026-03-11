import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

export async function GET(_request: NextRequest, { params }: { params: { folder: string } }) {
  try {
    const folder = decodeURIComponent(params.folder);

    // Validate folder path to prevent directory traversal
    if (folder.includes("..") || folder.startsWith("/")) {
      return NextResponse.json({ error: "Invalid folder path" }, { status: 400 });
    }

    // Read the public/places directory
    const placesDir = path.join(process.cwd(), "public", "places", folder);

    try {
      const files = await readdir(placesDir);

      // Filter only image files
      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_EXTENSIONS.includes(ext);
      });

      // Sort files alphabetically for consistency
      imageFiles.sort();

      // Convert to full paths
      const images = imageFiles.map((file) => ({
        name: file,
        path: `/places/${folder}/${file}`,
      }));

      return NextResponse.json(images);
    } catch (err) {
      // If directory doesn't exist, return empty array
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error loading images:", error);
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
  }
}
