'use client';

import { useState, useEffect } from 'react';
import TypingTest from '@/components/TypingTest';
import Results from '@/components/Results';
import ThemeToggle from '@/components/ThemeToggle';
import { useTypingTest } from '@/hooks/useTypingTest';
import { useKeyboard } from '@/hooks/useKeyboard';
import { getRandomParagraph } from '@/data/paragraphs';

export default function Home() {
  const [currentText, setCurrentText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const {
    userInput,
    timeLeft,
    isActive,
    isFinished,
    errors,
    result,
    handleInput,
    reset,
  } = useTypingTest(currentText);

  // Initialize text on mount
  useEffect(() => {
    setMounted(true);
    setCurrentText(getRandomParagraph());
  }, []);

  // Handle restart - get new random paragraph
  const handleRestart = () => {
    setCurrentText(getRandomParagraph());
    reset();
  };

  // ESC key to restart
  useKeyboard(handleRestart, true);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-orange-400">Type</span>
            <span className="text-gray-800 dark:text-gray-100">rator</span>
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle mute"
              title={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? (
                // Muted icon
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-gray-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                // Unmuted icon
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-gray-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        {!isFinished ? (
          <TypingTest
            targetText={currentText}
            userInput={userInput}
            onInput={handleInput}
            timeLeft={timeLeft}
            isFinished={isFinished}
          />
        ) : result ? (
          <Results
            wpm={result.wpm}
            accuracy={result.accuracy}
            totalChars={result.totalChars}
            errors={result.errors}
            onRestart={handleRestart}
            isMuted={isMuted}
          />
        ) : null}

        {/* Social Links - Bottom Right */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <a
            href="https://github.com/anuraj31415"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-orange-400 dark:hover:text-orange-400 hover:border-orange-400 dark:hover:border-orange-400 transition-colors shadow-sm"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          
          <a
            href="https://www.linkedin.com/in/anuraj31415"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-orange-400 dark:hover:text-orange-400 hover:border-orange-400 dark:hover:border-orange-400 transition-colors shadow-sm"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </main>

      {/* Footer */}
      {!isFinished && (
        <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Press any key to start • ESC to restart</p>
        </footer>
      )}
    </div>
  );
}
