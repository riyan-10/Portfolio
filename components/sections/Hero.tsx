"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/animations/RevealText";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <FadeIn delay={1.5} direction="down">
          <p className="text-white/50 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
            Creative Developer
          </p>
        </FadeIn>

        <h1 className="text-5xl md:text-8xl lg:text-[10vw] leading-[0.9] font-bold tracking-tighter mb-8">
          <RevealText text="Crafting Digital" delay={1.8} className="justify-center" />
          <RevealText text="Experiences." delay={2.2} className="justify-center text-white/50" />
        </h1>

        <FadeIn delay={2.8}>
          <p className="max-w-xl text-white/60 text-lg md:text-xl font-light">
            I specialize in building immersive, high-performance web applications
            that bridge the gap between engineering and design.
          </p>
        </FadeIn>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-4 text-white/30">
          <span className="text-xs tracking-widest uppercase writing-vertical-rl">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
