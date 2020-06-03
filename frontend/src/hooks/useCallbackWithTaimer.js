import { useRef, useCallback } from "react";

export const useCallbackWithTimer = (func, delay = 800) => {
  const timer = useRef();

  return useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(func, delay, ...args);
    },
    [func, delay]
  );
};
