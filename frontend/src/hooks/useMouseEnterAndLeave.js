import { useEffect, useCallback } from "react";

export const useMouseEnterAndLeave = (ref, callbackEnter, callbackLeave) => {
  const handleEnter = useCallback(() => callbackEnter(), [callbackEnter]);
  const handleLeave = useCallback(() => callbackLeave(), [callbackLeave]);
  useEffect(() => {
    const element = ref.current;

    element.addEventListener("mouseenter", handleEnter);
    element.addEventListener("mouseleave", handleLeave);
    return () => {
      element.removeEventListener("mouseenter", handleEnter);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref, handleEnter, handleLeave]);
};
