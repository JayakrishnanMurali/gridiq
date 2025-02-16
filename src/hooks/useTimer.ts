import { useEffect, useRef, useState, useCallback } from "react";

export function useTimer(autoStart = false) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals
    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      stop();
    };
  }, [autoStart, start, stop]);

  return { time, start, stop, reset };
}
