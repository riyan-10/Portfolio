"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicConvergenceProps {
  text: string;
  delay?: number;
  className?: string;
}

export function CinematicConvergence({ text, delay = 0, className = "" }: CinematicConvergenceProps) {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay * i,
      },
    }),
  };

  // Pseudo-random generation based on index to avoid hydration mismatch
  const getRandomTransform = (index: number) => {
    const seed = index * 137.5; // Golden angle approx
    const x = Math.sin(seed) * 150;
    const y = Math.cos(seed) * 100;
    const z = (Math.sin(seed * 2) * -300) - 100;
    const rotateX = Math.sin(seed * 3) * 60;
    const rotateY = Math.cos(seed * 3) * 60;
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
              duration: 2.2,
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
            scale: 0.2,
            filter: "blur(24px)",
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
