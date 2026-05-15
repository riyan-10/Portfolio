"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Force scroll to top on refresh and prevent browser restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.8, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
