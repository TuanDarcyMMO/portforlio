/**
 * Gallery Utilities for Places Tab
 * Handles dynamic image loading, shuffling, and gesture detection
 */

export interface GalleryImage {
  name: string;
  path: string;
}

/**
 * Fisher-Yates shuffle algorithm
 * Randomizes array order in place
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Load images from folder path dynamically
 * Fetches from API which reads actual files from public/places/{folder}
 * Returns list of images sorted alphabetically, then shuffled
 */
export async function loadImagesFromFolder(folder: string): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`/api/places/${encodeURIComponent(folder)}`);
    if (!response.ok) {
      throw new Error(`Failed to load images from ${folder}`);
    }
    const images = (await response.json()) as GalleryImage[];
    // Shuffle the loaded images to randomize order
    return shuffleArray(images);
  } catch (error) {
    console.error(`Error loading images from folder ${folder}:`, error);
    // Return empty array if loading fails
    return [];
  }
}

/**
 * Preload an image for smooth transitions
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Detect double tap gesture
 */
export interface DoubleTapDetector {
  onDoubleTap: (x: number, y: number) => void;
}

export function createDoubleTapDetector(
  element: HTMLElement | null,
  onDoubleTap: (x: number, y: number) => void,
  tapDelay: number = 300
): () => void {
  if (!element) return () => {};

  let lastTapTime = 0;
  let tapCount = 0;

  const handleTap = (e: TouchEvent | MouseEvent) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    if (timeSinceLastTap < tapDelay && tapCount > 0) {
      // Double tap detected
      const x = e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y = e instanceof TouchEvent ? e.touches[0].clientY : (e as MouseEvent).clientY;
      onDoubleTap(x, y);
      tapCount = 0;
    } else {
      tapCount = 1;
    }

    lastTapTime = now;
  };

  element.addEventListener("touchstart", handleTap);
  element.addEventListener("click", handleTap);

  return () => {
    element.removeEventListener("touchstart", handleTap);
    element.removeEventListener("click", handleTap);
  };
}

/**
 * Detect swipe gesture
 */
export interface SwipeDetector {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeStart: (x: number, y: number) => void;
  onSwipeMove: (diffX: number) => void;
  onSwipeEnd: (x: number, y: number) => void;
}

export function createSwipeDetector(
  element: HTMLElement | null,
  handlers: Partial<SwipeDetector>,
  minSwipeDistance: number = 50,
  velocityThreshold: number = 0.5
): () => void {
  if (!element) return () => {};

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let currentX = 0;
  let isTracking = false;

  const handleStart = (e: TouchEvent | MouseEvent) => {
    const x = e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const y = e instanceof TouchEvent ? e.touches[0].clientY : (e as MouseEvent).clientY;

    startX = x;
    startY = y;
    currentX = x;
    startTime = Date.now();
    isTracking = true;

    handlers.onSwipeStart?.(x, y);
  };

  const handleMove = (e: TouchEvent | MouseEvent) => {
    if (!isTracking) return;

    const x = e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
    currentX = x;
    const diffX = x - startX;

    handlers.onSwipeMove?.(diffX);
  };

  const handleEnd = (e: TouchEvent | MouseEvent) => {
    if (!isTracking) return;
    isTracking = false;

    const endX = currentX;
    const endY = e instanceof TouchEvent ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const timeTaken = Date.now() - startTime;

    // Calculate velocity
    const velocity = Math.abs(diffX) / timeTaken;

    // Detect swipe direction
    const shouldSwipeLeft =
      diffX < -minSwipeDistance || (diffX < -minSwipeDistance / 2 && velocity > velocityThreshold);
    const shouldSwipeRight =
      diffX > minSwipeDistance || (diffX > minSwipeDistance / 2 && velocity > velocityThreshold);

    // Ignore if vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX) * 0.5) {
      handlers.onSwipeEnd?.(endX, endY);
      return;
    }

    if (shouldSwipeLeft) {
      handlers.onSwipeLeft?.();
    } else if (shouldSwipeRight) {
      handlers.onSwipeRight?.();
    }

    handlers.onSwipeEnd?.(endX, endY);
  };

  element.addEventListener("touchstart", handleStart);
  element.addEventListener("mousedown", handleStart);
  element.addEventListener("touchmove", handleMove);
  element.addEventListener("mousemove", handleMove);
  element.addEventListener("touchend", handleEnd);
  element.addEventListener("mouseup", handleEnd);
  element.addEventListener("touchcancel", handleEnd);

  return () => {
    element.removeEventListener("touchstart", handleStart);
    element.removeEventListener("mousedown", handleStart);
    element.removeEventListener("touchmove", handleMove);
    element.removeEventListener("mousemove", handleMove);
    element.removeEventListener("touchend", handleEnd);
    element.removeEventListener("mouseup", handleEnd);
    element.removeEventListener("touchcancel", handleEnd);
  };
}
