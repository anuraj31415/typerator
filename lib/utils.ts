// Utility functions for the typing test

/**
 * Calculate Words Per Minute
 * Standard: 1 word = 5 characters
 */
export function calculateWPM(charactersTyped: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  const words = charactersTyped / 5;
  return Math.round(words / minutes);
}

/**
 * Calculate accuracy percentage
 */
export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

/**
 * Get the video filename based on WPM performance and accuracy
 */
export function getVideoForWPM(wpm: number, accuracy: number): string {
  // Hard cutoff: anything below 40 WPM is bad
  if (wpm < 40) return "bad.mp4";

  // Cap WPM at 80 for scoring purposes
  const cappedWpm = Math.min(wpm, 80);

  // Normalize between 0 and 1
  const speedScore = (cappedWpm - 40) / 40; // 40 -> 0, 80 -> 1
  const accuracyScore = accuracy / 100;      // 0 -> 0, 100 -> 1

  // Weighted combination (speed 60%, accuracy 40%)
  const finalScore = (speedScore * 0.6) + (accuracyScore * 0.4);

  // Tier mapping (with goat between wooo and perfect)
  if (finalScore < 0.25) return "bad.mp4";
  if (finalScore < 0.45) return "alright.mp4";
  if (finalScore < 0.65) return "nice.mp4";
  if (finalScore < 0.75) return "wooo.mp4";
  if (finalScore < 0.85) return "goat.mp4";
  return "perfect.mp4";
}

/**
 * Format time as MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
