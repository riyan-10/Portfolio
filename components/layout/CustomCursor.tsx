"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export function CustomCursor() {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // High performance motion values avoiding React state renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics-based interpolation for the inner dot (fast, snappy)
  const springConfigDot = { damping: 25, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);

  // Physics-based interpolation for the outer ring (slower, trailing inertia)
  const springConfigRing = { damping: 30, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Completely disable on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Variants for morphing states
  const variants = {
    default: {
      width: 32,
      height: 32,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      scale: isClicking ? 0.8 : 1,
    },
    hover: {
      width: 48,
      height: 48,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
      scale: isClicking ? 0.9 : 1.1,
      mixBlendMode: "difference" as const,
    },
    view: {
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      borderRadius: "50%",
      scale: isClicking ? 0.9 : 1,
      mixBlendMode: "normal" as const,
    },
    text: {
      width: 4,
      height: 48,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      borderRadius: "2px",
      scale: isClicking ? 0.7 : 1,
      mixBlendMode: "difference" as const,
    },
    nexus: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "2px dashed rgba(255, 255, 255, 0.4)",
      borderRadius: "50%",
      scale: 1,
      rotate: 180,
      transition: {
        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
      }
    },
    link: {
      width: 12,
      height: 12,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      borderRadius: "50%",
      scale: isClicking ? 1.5 : 1,
    }
  };

  const dotVariants = {
    default: { opacity: 1, scale: 1, backgroundColor: "rgba(255,255,255,1)" },
    hover: { opacity: 0, scale: 0 },
    view: { opacity: 0, scale: 0 },
    text: { opacity: 0, scale: 0 },
    nexus: {
      opacity: 1,
      scale: [1, 1.4, 1],
      backgroundColor: "rgba(255, 255, 255, 1)",
      transition: {
        scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
      }
    },
    link: { opacity: 0, scale: 0 }
  };

  return (
    <>
      {/* Outer Ring / Morphing Body */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center text-black font-bold tracking-widest text-[10px] uppercase overflow-hidden"
        style={{ x: ringX, y: ringY, opacity: isVisible ? 1 : 0 }}
        variants={variants}
        animate={cursorState}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {cursorState === "view" && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        variants={dotVariants}
        animate={cursorState}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
