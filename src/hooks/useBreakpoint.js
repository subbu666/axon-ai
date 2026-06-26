// src/hooks/useBreakpoint.js
import { useRef, useEffect, useCallback } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useBreakpoint() {
  const activeIndexRef   = useRef(null);
  const isMobileRef      = useRef(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  const transitionCbRef  = useRef(null);

  const setActiveIndex = useCallback((idx) => {
    activeIndexRef.current = idx;
  }, []);

  const onBreakpointTransition = useCallback((cb) => {
    transitionCbRef.current = cb;
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width      = entries[0].contentRect.width;
      const wasMobile  = isMobileRef.current;
      const isNowMobile = width < MOBILE_BREAKPOINT;

      if (wasMobile !== isNowMobile) {
        isMobileRef.current = isNowMobile;
        transitionCbRef.current?.(isNowMobile, activeIndexRef.current);
      }
    });

    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return { activeIndexRef, isMobileRef, setActiveIndex, onBreakpointTransition };
}
