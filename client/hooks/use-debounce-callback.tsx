import { useCallback, useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  delay: number
): (...args: TArgs) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const latestCallback = useRef(callback);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        latestCallback.current(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedCallback]);

  return debouncedCallback;
}
