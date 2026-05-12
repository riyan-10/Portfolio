"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface LetterRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export function LetterReveal({ text, delay = 0, className = "" }: LetterRevealProps) {
  // Split text into an array of characters, preserving spaces
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.06, 
        delayChildren: delay * i,
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      z: -100,
      rotateX: -60,
      scale: 0.85,
      filter: "blur(12px)",
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ perspective: 1000 }}
    >
      {letters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
