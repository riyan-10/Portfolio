"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.8, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
