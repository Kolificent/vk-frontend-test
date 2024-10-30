import { useRef } from 'react';

function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): T {
  const lastCall = useRef<number>(0);

  return function (...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  } as T;
}

export default useThrottle;
