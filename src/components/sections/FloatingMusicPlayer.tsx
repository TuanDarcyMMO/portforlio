"use client";

import React, { useEffect, useRef, useState } from "react";
import { audioManager } from "@/lib/audioManager";

export function FloatingMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Register with audio manager
    audioManager.initializeBackground(audio);

    // Defer audio playback until page is idle, then additional delay
    const startBackgroundMusic = () => {
      if (audio && audio.paused) {
        audio.play().catch(() => {
          // Browser blocked autoplay - wait for user interaction
          // This is normal on many browsers
        });
      }
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    const scheduleAudioStart = () => {
      // Wait 5 seconds after page is ready
      setTimeout(startBackgroundMusic, 5000);
    };

    if (document.readyState === "complete") {
      // Page already fully loaded
      if ("requestIdleCallback" in window) {
        requestIdleCallback(scheduleAudioStart);
      } else {
        scheduleAudioStart();
      }
    } else {
      // Wait for page to fully load first
      const handlePageLoad = () => {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(scheduleAudioStart);
        } else {
          scheduleAudioStart();
        }
      };
      window.addEventListener("load", handlePageLoad, { once: true });
      return () => window.removeEventListener("load", handlePageLoad);
    }

    // Handle user interaction for browsers blocking autoplay
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        // Try to play on user interaction
        if (audio && audio.paused) {
          audio.play().catch(() => {
            // Still blocked
          });
        }
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [hasUserInteracted]);

  return (
    <>
      {/* Background music - deferred loading until page idle */}
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        crossOrigin="anonymous"
        preload="auto"
      />
    </>
  );
}
