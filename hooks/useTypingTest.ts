'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateWPM, calculateAccuracy } from '@/lib/utils';

interface TypingTestResult {
  wpm: number;
  accuracy: number;
  totalChars: number;
  errors: number;
}

export function useTypingTest(targetText: string) {
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [errors, setErrors] = useState(0);
  const [result, setResult] = useState<TypingTestResult | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Start the timer when user starts typing
  const startTest = useCallback(() => {
    if (!isActive && !isFinished) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }
  }, [isActive, isFinished]);

  // Handle user input
  const handleInput = useCallback((value: string) => {
    if (isFinished) return;
    
    // Start test on first keystroke
    if (value.length === 1 && userInput.length === 0) {
      startTest();
    }

    setUserInput(value);

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
      finishTest(value);
    }
  }, [userInput, targetText, isFinished, startTest]);

  // Finish the test and calculate results
  const finishTest = useCallback((finalInput: string) => {
    setIsActive(false);
    setIsFinished(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Calculate time elapsed
    const timeElapsed = startTimeRef.current 
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : 30 - timeLeft;

    // Calculate correct characters
    const correctChars = finalInput.split('').filter((char, idx) => char === targetText[idx]).length;
    
    const wpm = calculateWPM(correctChars, timeElapsed);
    const accuracy = calculateAccuracy(correctChars, finalInput.length);

    const testResult = {
      wpm,
      accuracy,
      totalChars: finalInput.length,
      errors,
    };

    setResult(testResult);

    // Save to localStorage
    localStorage.setItem('lastScore', JSON.stringify(testResult));
  }, [timeLeft, errors, targetText]);

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

  // Check for time up
  useEffect(() => {
    if (isActive && timeLeft === 0) {
      finishTest(userInput);
    }
  }, [timeLeft, isActive, userInput, finishTest]);

  // Reset the test
  const reset = useCallback(() => {
    setUserInput('');
    setTimeLeft(30);
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
