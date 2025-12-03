'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { calculateWPM, calculateAccuracy } from '@/lib/utils';

interface TypingTestResult {
  wpm: number;
  accuracy: number;
  totalChars: number;
  errors: number;
}

const INITIAL_TIME = 30;

export function useTypingTest(targetText: string) {
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [errors, setErrors] = useState(0);
  const [result, setResult] = useState<TypingTestResult | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Ensure component is mounted (SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Start the timer when user starts typing - no dependencies to prevent unnecessary recreations
  const startTest = useCallback(() => {
    setIsActive((prev) => {
      setIsFinished((prevFinished) => {
        if (!prev && !prevFinished) {
          setIsActive(true);
          startTimeRef.current = Date.now();
        }
        return prevFinished;
      });
      return prev;
    });
  }, []);

  // Handle user input - removed userInput from deps to prevent circular dependencies
  const handleInput = useCallback((value: string) => {
    setIsFinished((prevFinished) => {
      if (prevFinished) return prevFinished;

      // Start test on first keystroke
      if (value.length === 1) {
        setUserInput((prevInput) => {
          if (prevInput.length === 0) {
            startTest();
          }
          return value;
        });
      } else {
        setUserInput(value);
      }

      // Calculate errors
      let errorCount = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== targetText[i]) {
          errorCount++;
        }
      }
      setErrors(errorCount);

      // Check if test is complete (all text typed correctly)
      if (value === targetText) {
        setIsActive(false);
        setIsFinished(true);

        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        // Calculate time elapsed
        const timeElapsed = startTimeRef.current 
          ? Math.floor((Date.now() - startTimeRef.current) / 1000)
          : INITIAL_TIME - timeLeft;

        // Calculate correct characters
        const correctChars = value.split('').filter((char, idx) => char === targetText[idx]).length;
        
        const wpm = calculateWPM(correctChars, timeElapsed);
        const accuracy = calculateAccuracy(correctChars, value.length);

        const testResult = {
          wpm,
          accuracy,
          totalChars: value.length,
          errors: errorCount,
        };

        setResult(testResult);

        // Save to localStorage only if mounted (SSR safety)
        if (mounted) {
          localStorage.setItem('lastScore', JSON.stringify(testResult));
        }

        return true;
      }

      return prevFinished;
    });
  }, [targetText, mounted, timeLeft, startTest]);

  // Timer countdown effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isActive]);

  // Check for time up - handles finish when timer reaches zero
  useEffect(() => {
    if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Calculate time elapsed
      const timeElapsed = startTimeRef.current 
        ? Math.floor((Date.now() - startTimeRef.current) / 1000)
        : INITIAL_TIME;

      // Calculate correct characters
      const correctChars = userInput.split('').filter((char, idx) => char === targetText[idx]).length;
      
      const wpm = calculateWPM(correctChars, timeElapsed);
      const accuracy = calculateAccuracy(correctChars, userInput.length);

      const testResult = {
        wpm,
        accuracy,
        totalChars: userInput.length,
        errors,
      };

      setResult(testResult);

      // Save to localStorage only if mounted (SSR safety)
      if (mounted) {
        localStorage.setItem('lastScore', JSON.stringify(testResult));
      }
    }
  }, [timeLeft, isActive, userInput, targetText, errors, mounted]);

  // Reset the test - no dependencies needed
  const reset = useCallback(() => {
    setUserInput('');
    setTimeLeft(INITIAL_TIME);
    setIsActive(false);
    setIsFinished(false);
    setErrors(0);
    setResult(null);
    startTimeRef.current = null;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  return {
    userInput,
    timeLeft,
    isActive,
    isFinished,
    errors,
    result,
    handleInput,
    reset,
  };
}
