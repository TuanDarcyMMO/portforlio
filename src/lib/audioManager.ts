/**
 * Global Audio Manager
 * Centralized control for all audio playback
 * Ensures only ONE audio source plays at a time
 *
 * Audio flow:
 * 1. Background music defers loading until page is idle
 * 2. After 5 second delay, background music starts automatically
 * 3. User clicks song → background STOPS immediately, song plays
 * 4. Song ends → background RESUMES automatically
 * 5. User pauses song → background RESUMES immediately
 * 6. Never: two tracks play simultaneously
 */

type AudioListener = () => void;
type AudioSource = "background" | "song" | null;

class AudioManager {
  private backgroundAudio: HTMLAudioElement | null = null;
  private songAudio: HTMLAudioElement | null = null;
  private currentAudio: AudioSource = null;
  private listeners: Set<AudioListener> = new Set();

  /**
   * Initialize the background audio element
   * Uses requestIdleCallback to defer loading
   */
  initializeBackground(audio: HTMLAudioElement) {
    this.backgroundAudio = audio;
    audio.loop = true;
    audio.volume = 0.3; // Lower volume for background music

    // Defer audio setup until browser is idle
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => this.setupBackgroundAudio());
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => this.setupBackgroundAudio(), 100);
    }
  }

  /**
   * Setup background audio after idle time
   */
  private setupBackgroundAudio() {
    if (!this.backgroundAudio) return;

    // Setup event listeners if needed in future
    // Audio state is managed through currentAudio
  }

  /**
   * Initialize the song audio element (previously "preview")
   */
  initializeSong(audio: HTMLAudioElement) {
    this.songAudio = audio;
    audio.volume = 1; // Full volume for foreground music

    // Setup event listeners
    audio.addEventListener("ended", () => this.onSongEnded());
    audio.addEventListener("pause", () => this.onSongPaused());
    audio.addEventListener("play", () => {
      // Ensure background is stopped when song plays
      if (this.backgroundAudio && !this.backgroundAudio.paused) {
        this.backgroundAudio.pause();
      }
    });
  }

  /**
   * Play a song
   * Stops background music immediately and completely
   */
  playSong(src: string) {
    // CRITICAL: Stop background music FIRST, before starting song
    this.stopBackground();

    if (this.songAudio) {
      try {
        this.songAudio.src = src;
        this.songAudio.currentTime = 0;

        // Use play promise for better error handling
        const playPromise = this.songAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.currentAudio = "song";
              this.notifyListeners();
            })
            .catch((error) => {
              console.error("Failed to play song:", error);
              // Restore background music if song fails to play
              this.resumeBackgroundMusic();
            });
        } else {
          this.currentAudio = "song";
          this.notifyListeners();
        }
      } catch (error) {
        console.error("Error playing song:", error);
        this.resumeBackgroundMusic();
      }
    }
  }

  /**
   * Stop the currently playing song
   */
  stopSong() {
    if (this.songAudio) {
      this.songAudio.pause();
      this.songAudio.currentTime = 0;
    }

    if (this.currentAudio === "song") {
      this.currentAudio = null;
      this.notifyListeners();
    }
  }

  /**
   * Pause the currently playing song
   * Automatically resumes background music
   */
  pauseSong() {
    if (this.songAudio) {
      try {
        this.songAudio.pause();
        this.songAudio.currentTime = 0;
      } catch (error) {
        console.error("Error pausing song:", error);
      }
    }

    if (this.currentAudio === "song") {
      this.currentAudio = null;
      this.notifyListeners();
    }

    // Resume background music after small delay to ensure song is stopped
    this.resumeBackgroundMusic();
  }

  /**
   * Stop background music (internal use)
   */
  private stopBackground() {
    if (this.backgroundAudio) {
      try {
        this.backgroundAudio.pause();
        this.backgroundAudio.currentTime = 0;
      } catch (error) {
        console.error("Error stopping background music:", error);
      }
    }

    if (this.currentAudio === "background") {
      this.currentAudio = null;
      this.notifyListeners();
    }
  }

  /**
   * Resume background music (only if song is not playing)
   */
  resumeBackgroundMusic() {
    // Never resume if a song is actively playing
    if (this.currentAudio === "song" || (this.songAudio && !this.songAudio.paused)) {
      return;
    }

    if (this.backgroundAudio && this.backgroundAudio.paused) {
      try {
        const playPromise = this.backgroundAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.currentAudio = "background";
              this.notifyListeners();
            })
            .catch((error) => {
              // Autoplay might be blocked - this is okay
              console.debug("Could not resume background music:", error);
            });
        } else {
          this.currentAudio = "background";
          this.notifyListeners();
        }
      } catch (error) {
        console.error("Error resuming background music:", error);
      }
    }
  }

  /**
   * Called when song finishes playing
   */
  private onSongEnded() {
    this.currentAudio = null;
    // Auto-resume background music
    this.resumeBackgroundMusic();
  }

  /**
   * Called when song is paused manually
   */
  private onSongPaused() {
    if (this.currentAudio === "song") {
      this.currentAudio = null;
      // Resume background music
      this.resumeBackgroundMusic();
    }
  }

  /**
   * Get current playing audio source
   */
  getCurrentAudio(): AudioSource {
    return this.currentAudio;
  }

  /**
   * Check if a song is currently playing
   */
  isSongPlaying(): boolean {
    return this.currentAudio === "song" && this.songAudio !== null && !this.songAudio.paused;
  }

  /**
   * Check if background is playing
   */
  isBackgroundPlaying(): boolean {
    return this.currentAudio === "background";
  }

  /**
   * Legacy support: play as preview (for backward compatibility)
   */
  play(source: "background" | "preview" | "song", src?: string) {
    if (source === "preview" || source === "song") {
      if (src) this.playSong(src);
    } else if (source === "background") {
      this.resumeBackgroundMusic();
    }
  }

  /**
   * Legacy support: pause as preview (for backward compatibility)
   */
  pauseAudio(source: string) {
    if (source === "preview" || source === "song") {
      this.pauseSong();
    }
  }

  /**
   * Subscribe to audio state changes
   */
  subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
