"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  
  // Cinematic Environmental Response
  const envOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.4, 0.4, 0.1]);

  return (
    <section id="about" className="py-20 md:py-32 relative bg-[#050505] overflow-hidden" ref={containerRef}>
      {/* Scroll-Responsive Environment */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: envOpacity }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] rounded-full" />
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6">
        
        {/* Editorial Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/10 pb-8 gap-6">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
              Creative <br />
              <span className="text-white/40 italic font-light">Technologist.</span>
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase font-mono max-w-xs text-left md:text-right">
              Bridging the gap between raw backend power and cinematic visual design.
            </p>
          </div>
        </FadeIn>

        {/* Asymmetric Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Authentic Profile Image */}
          <motion.div style={{ y: y1 }} className="flex-1 w-full relative aspect-[3/4] md:aspect-square lg:aspect-[3/4] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5">
            {/* Cinematic Image Integration */}
            <div className="absolute inset-0 grayscale contrast-125 brightness-75 opacity-80 mix-blend-luminosity">
              <Image 
                src="/profile.png" 
                alt="Riyan Nizar" 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Cinematic overlays to blend the image into the dark UI perfectly */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-50" />
            
            <div className="absolute bottom-12 left-12 right-12 text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase flex justify-between z-10">
              <span>Riyan Nizar</span>
              <span>Online</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text Blocks */}
          <div className="flex-1 flex flex-col justify-center gap-10 lg:gap-16">
            
            <FadeIn delay={0.2}>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight leading-snug">
                I engineer digital environments that feel <span className="font-bold italic">alive</span>. 
              </h3>
            </FadeIn>

            <motion.div style={{ y: y2 }} className="space-y-8 text-white/60 text-lg font-light leading-relaxed max-w-lg">
              <FadeIn delay={0.4}>
                <p>
                  My foundation was built on logic boards and microcontrollers. Transitioning from embedded systems into software engineering gave me a rigorous obsession with optimization, memory management, and absolute precision.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p>
                  Today, I use that same engineering mindset to build immersive web architectures. I believe that premium digital experiences shouldn't just look beautiful—they should run with the flawless efficiency of compiled hardware logic.
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
