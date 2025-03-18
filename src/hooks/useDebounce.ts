"use client";

import { useState, useEffect } from "react";

/**
 * Hook to debounce a rapidly value - search input.
 *
 * @param value - The current value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced value
 */
export default function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
