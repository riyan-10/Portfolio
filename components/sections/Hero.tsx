"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { RevealText } from "@/components/animations/RevealText";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth out the scroll transforms
  const smoothY = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Parallax elements with different depth layers
  const yBg = useTransform(smoothY, [0, 1], ["0%", "40%"]);
  const yText = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleText = useTransform(smoothY, [0, 1], [1, 0.95]);

  // Mouse reactive lighting
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to 0-1 for percentage based gradients
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Construct dynamic background gradient based on mouse position
  const backgroundGlow = useMotionTemplate`radial-gradient(1200px circle at ${mouseX}% ${mouseY}%, rgba(255, 255, 255, 0.04), transparent 50%)`;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202]"
    >
      {/* Dynamic Cursor Lighting */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: backgroundGlow }}
      />
      
      {/* Floating abstract layers (Depth Simulation) */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-white/[0.02] rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-white/[0.015] rounded-full blur-[100px]" />
        {/* Subtle geometric grid to ground the space */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
      </motion.div>

      <motion.div
        style={{ y: yText, opacity: opacityText, scale: scaleText }}
        className="relative z-10 flex flex-col items-center text-center px-4 mt-16"
      >
        <FadeIn delay={1.8} direction="up">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-white/20" />
            <p className="text-white/40 tracking-[0.4em] uppercase text-xs font-mono">
              System Online
            </p>
            <div className="h-[1px] w-8 bg-white/20" />
          </div>
        </FadeIn>

        {/* Cinematic Typography Choreography */}
        <h1 className="text-5xl md:text-8xl lg:text-[9vw] leading-[0.85] font-bold tracking-tighter mb-10 flex flex-col items-center">
          <RevealText text="Engineering" delay={2.0} className="justify-center text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8">
            <RevealText text="Digital" delay={2.3} className="text-white/60 italic font-light" />
            <RevealText text="Realities." delay={2.5} className="text-white" />
          </div>
        </h1>

        <FadeIn delay={3.2} direction="up" className="max-w-xl">
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
            I craft immersive, high-performance web architecture that bridges the gap between raw backend power and cinematic visual design.
          </p>
        </FadeIn>

        {/* Magnetic Interactions */}
        <FadeIn delay={3.8} direction="up" className="mt-12">
          <MagneticButton intensity={0.4}>
            <button 
              onClick={() => {
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden font-medium tracking-wide text-sm flex items-center gap-3 transition-colors hover:bg-white/90"
            >
              <span className="relative z-10">Explore Architecture</span>
              <div className="relative z-10 w-2 h-2 rounded-full bg-black/30 group-hover:bg-black/50 transition-colors" />
            </button>
          </MagneticButton>
        </FadeIn>
      </motion.div>

      {/* Cinematic Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 2 }}
      >
        <MagneticButton intensity={0.2} className="flex flex-col items-center gap-6 cursor-pointer">
          <div className="h-16 w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              animate={{ top: ["-50%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">Scroll</span>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
