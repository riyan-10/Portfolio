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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="relative py-32 md:py-48 px-6 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        {/* Left Typography */}
        <div className="flex-1 w-full relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              From Circuits to <br />
              <span className="text-white/40">Scalable Systems.</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
              <p>
                My journey didn't start in the browser. It started on the workbench. 
                With a background in electronics and embedded systems, I learned how 
                machines think at their lowest levels—understanding memory constraints, 
                signals, and logic gates.
              </p>
              <p>
                Now, I bring that same rigorous, structural engineering mindset to creative 
                software development. I don't just build websites; I engineer interactive, 
                cinematic experiences that run as reliably as hardware but feel effortlessly fluid.
              </p>
              <p>
                I thrive in the intersection of deep technical logic and high-end visual design.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-12 flex gap-12">
            <div>
              <div className="text-4xl font-bold mb-2">04+</div>
              <div className="text-sm text-white/40 uppercase tracking-widest">Years Eng.</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-white/40 uppercase tracking-widest">Precision</div>
            </div>
          </FadeIn>
        </div>

        {/* Right Abstract Visual */}
        <div className="flex-1 w-full aspect-square relative hidden md:block">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 border border-white/10 rounded-full"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-white/10 rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-white/10 -rotate-45" />
            
            {/* Cinematic core glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/5 blur-[80px] rounded-full" />
            
            {/* Minimal data points */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-8 border border-dashed border-white/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
