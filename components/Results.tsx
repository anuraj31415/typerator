'use client';

import { useEffect, useRef, useState } from 'react';
import { getVideoForWPM } from '@/lib/utils';

interface ResultsProps {
  wpm: number;
  accuracy: number;
  totalChars: number;
  errors: number;
  onRestart: () => void;
  isMuted: boolean;
}

export default function Results({ wpm, accuracy, totalChars, errors, onRestart, isMuted }: ResultsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const videoFile = getVideoForWPM(wpm, accuracy);

  useEffect(() => {
    // Attempt to play video
    if (videoRef.current && !videoError) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, [videoError]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Single Results Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border-2 border-orange-400">
        {/* Stats at Top - Compact Grid */}
        <div className="p-6 pb-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400">{wpm}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">WPM</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">{accuracy}%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{totalChars}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Chars</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{errors}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Errors</div>
            </div>
          </div>
        </div>

        {/* Video in Middle */}
        <div className="bg-white dark:bg-gray-900 p-4">
          {!videoError ? (
            <video
              ref={videoRef}
              src={`/clips/${videoFile}`}
              // loop
              muted={isMuted}
              playsInline
              className="w-full h-auto rounded-lg"
              onError={() => setVideoError(true)}
            />
          ) : (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">
                {wpm <= 20 && '😅'}
                {wpm > 20 && wpm <= 30 && '👍'}
                {wpm > 30 && wpm <= 45 && '😊'}
                {wpm > 45 && wpm <= 60 && '🎉'}
                {wpm > 60 && wpm <= 80 && '🔥'}
                {wpm > 80 && '⭐'}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Video placeholder: <span className="font-mono">{videoFile}</span>
              </p>
            </div>
          )}
        </div>

        {/* Try Again Button at Bottom */}
        <div className="p-6 pt-4">
          <button
            onClick={onRestart}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
