"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicConvergenceProps {
  text: string;
  delay?: number;
  className?: string;
  intensity?: "subtle" | "high";
}

export function CinematicConvergence({ text, delay = 0, className = "", intensity = "high" }: CinematicConvergenceProps) {
  const letters = Array.from(text);
  
  // Configuration factor based on selected intensity
  const factor = intensity === "subtle" ? 0.4 : 1;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.06 * factor, // Speed up staggered emission marginally on subtle
        delayChildren: delay * i,
      },
    }),
  };

  // Pseudo-random generation based on index to avoid hydration mismatch
  const getRandomTransform = (index: number) => {
    const seed = index * 137.5; 
    const x = (Math.sin(seed) * 150) * factor;
    const y = (Math.cos(seed) * 100) * factor;
    const z = ((Math.sin(seed * 2) * -300) - 100) * factor;
    const rotateX = (Math.sin(seed * 3) * 60) * factor;
    const rotateY = (Math.cos(seed * 3) * 60) * factor;
    return { x, y, z, rotateX, rotateY };
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ perspective: 1500, transformStyle: "preserve-3d" }}
    >
      {letters.map((char, index) => {
        const { x, y, z, rotateX, rotateY } = getRandomTransform(index);
        
        const child: Variants = {
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: 2.2 * Math.max(0.7, factor), // Ensure dynamic but tight feel
              ease: [0.16, 1, 0.3, 1],
            },
          },
          hidden: {
            opacity: 0,
            x,
            y,
            z,
            rotateX,
            rotateY,
            scale: intensity === "subtle" ? 0.6 : 0.2,
            filter: `blur(${24 * factor}px)`,
          },
        };

        return (
          <motion.span
            variants={child}
            key={index}
            className="inline-block will-change-transform"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
