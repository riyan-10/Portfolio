"use client";

import { motion, Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function RevealText({ text, delay = 0, className = "" }: RevealTextProps) {
  // Split words instead of characters for an editorial block reveal
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: delay * i,
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 100,
        mass: 1.2,
      },
    },
    hidden: {
      opacity: 0,
      y: 80,
      rotate: 2, // Subtle editorial tilt during reveal
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em", display: "inline-block", paddingBottom: "0.1em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
