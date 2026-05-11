"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" className="py-48 md:py-64 relative bg-[#050505] overflow-hidden" ref={containerRef}>
      <div className="max-w-[90rem] mx-auto px-6">
        
        {/* Editorial Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 md:mb-48 border-b border-white/10 pb-12 gap-8">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
              Creative <br />
              <span className="text-white/40 italic font-light">Engineering.</span>
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase font-mono max-w-xs text-left md:text-right">
              Bridging the gap between raw backend power and cinematic visual design.
            </p>
          </div>
        </FadeIn>

        {/* Asymmetric Split Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left Column: Abstract Parallax Visual */}
          <motion.div style={{ y: y1 }} className="flex-1 relative aspect-[3/4] md:aspect-square lg:aspect-[3/4] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5">
            {/* Subtle glow / light leak inside the block */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/[0.03] to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase flex justify-between">
              <span>01 / System</span>
              <span>Online</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text Blocks */}
          <div className="flex-1 flex flex-col justify-center gap-16 lg:gap-24">
            
            <FadeIn delay={0.2}>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight leading-snug">
                I believe that digital experiences should feel <span className="font-bold italic">alive</span>. 
              </h3>
            </FadeIn>

            <motion.div style={{ y: y2 }} className="space-y-8 text-white/60 text-lg font-light leading-relaxed max-w-lg">
              <FadeIn delay={0.4}>
                <p>
                  Transitioning from embedded systems and hardware engineering, I bring a rigorous obsession with performance and memory optimization to the frontend world.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p>
                  I don't just build websites; I engineer interactive environments. By leveraging WebGL, complex Framer Motion choreographies, and highly optimized React architectures, I craft experiences that are both visually staggering and technically flawless.
                </p>
              </FadeIn>
            </motion.div>

            {/* Micro details */}
            <FadeIn delay={0.6} className="pt-8 border-t border-white/10 flex gap-12">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-mono">Location</div>
                <div className="text-sm">Global / Remote</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-mono">Availability</div>
                <div className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Accepting Projects
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
