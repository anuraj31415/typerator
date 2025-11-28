'use client';

import { useEffect, useRef } from 'react';

interface TypingTestProps {
  targetText: string;
  userInput: string;
  onInput: (value: string) => void;
  timeLeft: number;
  isFinished: boolean;
}

export default function TypingTest({ 
  targetText, 
  userInput, 
  onInput, 
  timeLeft, 
  isFinished 
}: TypingTestProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when text changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [targetText]);

  // Render each character with appropriate styling
  const renderText = () => {
    const words = targetText.split(' ');
    let charIndex = 0;
    
    return words.map((word, wordIdx) => {
      const wordChars = word.split('').map((char, charIdx) => {
        const index = charIndex + charIdx;
        let className = 'text-2xl transition-colors duration-75 ';
        
        if (index < userInput.length) {
          // Character has been typed
          if (userInput[index] === char) {
            className += 'text-orange-400 dark:text-orange-500'; // Correct
          } else {
            className += 'text-red-500 bg-red-500/20 rounded'; // Error
          }
        } else if (index === userInput.length) {
          // Current character to type
          className += 'text-gray-800 dark:text-gray-100 border-l-2 border-orange-400 animate-pulse';
        } else {
          // Not yet typed
          className += 'text-gray-400 dark:text-gray-600';
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      });

      // Add space after word (except last word)
      const spaceIndex = charIndex + word.length;
      const spaceChar = wordIdx < words.length - 1 ? (
        <span 
          key={`space-${spaceIndex}`}
          className={`text-2xl transition-colors duration-75 ${
            spaceIndex < userInput.length
              ? (userInput[spaceIndex] === ' ' 
                  ? 'text-orange-400 dark:text-orange-500' 
                  : 'text-red-500 bg-red-500/20 rounded')
              : spaceIndex === userInput.length
              ? 'text-gray-800 dark:text-gray-100 border-l-2 border-orange-400 animate-pulse'
              : 'text-gray-400 dark:text-gray-600'
          }`}
        >
          {'\u00A0'}
        </span>
      ) : null;

      charIndex += word.length + (wordIdx < words.length - 1 ? 1 : 0);

      return (
        <span key={`word-${wordIdx}`} className="inline-block">
          {wordChars}
          {spaceChar}
        </span>
      );
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default backspace behavior when at start
    if (e.key === 'Backspace' && userInput.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Timer Display */}
      <div className="mb-8 text-center">
        <span className="text-4xl font-mono font-bold text-orange-400">
          {timeLeft}s
        </span>
      </div>

      {/* Text Display Area */}
      <div 
        className="p-8 mb-6 min-h-[200px] cursor-text transition-colors"
        onClick={() => {
          inputRef.current?.focus();
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <div className="leading-relaxed font-mono select-none">
          {renderText()}
        </div>
      </div>

      {/* Hidden Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isFinished}
        className="sr-only"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Instructions */}
      {userInput.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm animate-pulse">
          Start typing to begin the test...
        </div>
      )}
    </div>
  );
}
