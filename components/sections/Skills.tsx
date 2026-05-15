"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", 
  "Framer Motion", "GSAP", "WebGL", "Three.js",
  "Node.js", "Python", "C++", "Embedded C",
  "System Architecture", "UI/UX Design", "Performance Optimization"
];

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 overflow-hidden border-y border-white/10 relative bg-white/[0.01]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 text-center">
        <FadeIn>
          <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-white/50">
            Technical Arsenal
          </h2>
        </FadeIn>
      </div>

      <div className="relative flex whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity duration-500">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="flex gap-8 px-4"
        >
          {/* Double the array for seamless looping */}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
            >
              {skill}
              <span className="text-white/20 mx-8">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
