/**
 * Photo Metadata Storage System
 * Manages likes and views with IP-based tracking
 */

import fs from "fs/promises";
import path from "path";

interface PhotoData {
  photoId: string;
  likes: number;
  views: number;
  likedIPs: string[];
  viewedIPs: string[];
}

interface PhotoDatabase {
  [photoId: string]: PhotoData;
}

class PhotoMetadataStore {
  private dbPath: string;
  private cache: PhotoDatabase = {};
  private cacheDirty = false;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.dbPath = path.join(process.cwd(), ".data", "photo-metadata.json");
  }

  /**
   * Initialize the database from file
   */
  async init(): Promise<void> {
    try {
      const dbDir = path.dirname(this.dbPath);
      await fs.mkdir(dbDir, { recursive: true });

      try {
        const data = await fs.readFile(this.dbPath, "utf-8");
        this.cache = JSON.parse(data);
      } catch {
        // File doesn't exist yet, start with empty cache
        this.cache = {};
      }
    } catch (error) {
      console.error("Failed to initialize photo metadata store:", error);
      this.cache = {};
    }
  }

  /**
   * Get or create photo data
   */
  private getPhotoData(photoId: string): PhotoData {
    if (!this.cache[photoId]) {
      this.cache[photoId] = {
        photoId,
        likes: 0,
        views: 0,
        likedIPs: [],
        viewedIPs: [],
      };
      this.cacheDirty = true;
    }
    return this.cache[photoId];
  }

  /**
   * Record a like from an IP
   * Returns true if like was recorded (first time), false if already liked
   */
  async recordLike(photoId: string, ipAddress: string): Promise<boolean> {
    const data = this.getPhotoData(photoId);

    if (data.likedIPs.includes(ipAddress)) {
      // Already liked by this IP
      return false;
    }

    data.likedIPs.push(ipAddress);
    data.likes += 1;
    this.cacheDirty = true;
    this.scheduleWrite();

    return true;
  }

  /**
   * Record a view from an IP
   * Returns true if view was recorded (first time), false if already viewed
   */
  async recordView(photoId: string, ipAddress: string): Promise<boolean> {
    const data = this.getPhotoData(photoId);

    if (data.viewedIPs.includes(ipAddress)) {
      // Already viewed by this IP
      return false;
    }

    data.viewedIPs.push(ipAddress);
    data.views += 1;
    this.cacheDirty = true;
    this.scheduleWrite();

    return true;
  }

  /**
   * Get photo statistics
   */
  async getStats(photoId: string): Promise<{ likes: number; views: number }> {
    const data = this.getPhotoData(photoId);
    return {
      likes: data.likes,
      views: data.views,
    };
  }

  /**
   * Check if an IP has liked a photo
   */
  async hasLiked(photoId: string, ipAddress: string): Promise<boolean> {
    const data = this.getPhotoData(photoId);
    return data.likedIPs.includes(ipAddress);
  }

  /**
   * Check if an IP has viewed a photo
   */
  async hasViewed(photoId: string, ipAddress: string): Promise<boolean> {
    const data = this.getPhotoData(photoId);
    return data.viewedIPs.includes(ipAddress);
  }

  /**
   * Schedule a write to disk (debounced)
   */
  private scheduleWrite(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.writeToFile();
    }, 2000); // Write after 2 seconds of inactivity
  }

  /**
   * Write cache to file
   */
  private async writeToFile(): Promise<void> {
    if (!this.cacheDirty) return;

    try {
      const dbDir = path.dirname(this.dbPath);
      await fs.mkdir(dbDir, { recursive: true });
      await fs.writeFile(this.dbPath, JSON.stringify(this.cache, null, 2), "utf-8");
      this.cacheDirty = false;
    } catch (error) {
      console.error("Failed to write photo metadata to file:", error);
    }
  }

  /**
   * Force write to file (use sparingly)
   */
  async flush(): Promise<void> {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    await this.writeToFile();
  }
}

// Singleton instance
const photoMetadataStore = new PhotoMetadataStore();

export default photoMetadataStore;
