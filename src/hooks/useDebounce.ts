
import { useState, useEffect } from 'react';

/**
 * A hook to debounce a rapidly changing value.
 * 
 * @param value The value to be debounced
 * @param delay The delay in ms
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
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