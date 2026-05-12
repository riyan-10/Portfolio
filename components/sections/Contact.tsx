"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { LetterReveal } from "@/components/animations/LetterReveal";
import { RevealText } from "@/components/animations/RevealText";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCursor } from "@/context/CursorContext";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Environmental Dimming
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <section id="contact" ref={containerRef} className="relative pt-48 pb-12 px-6 min-h-screen flex flex-col justify-between bg-black overflow-hidden">
      {/* Environmental Dimming Overlay - Darkens everything as you enter the finale */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none bg-black"
        style={{ opacity: bgOpacity }}
      />
      
      {/* Subtle bottom spotlight for the terminal */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-t-full z-0 pointer-events-none" />

      <motion.div style={{ y: yParallax }} className="max-w-[90rem] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] w-8 bg-white/20" />
            <p className="text-white/30 tracking-[0.4em] uppercase text-[10px] font-mono">
              System Shutdown // Connection Init
            </p>
            <div className="h-[1px] w-8 bg-white/20" />
          </div>
        </FadeIn>

        {/* Cinematic Typography Sequence */}
        <h2 className="text-5xl md:text-[8vw] leading-[0.85] font-bold tracking-tighter mb-24 flex flex-col items-center">
          <LetterReveal text="Initiate" delay={0.6} className="text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 mt-2">
            <RevealText text="Secure" delay={1.2} className="text-white/40 italic font-light" />
            <RevealText text="Connection." delay={1.5} className="text-white" />
          </div>
        </h2>

        {/* The Connection Terminal */}
        <FadeIn delay={2.2} direction="up" className="w-full max-w-2xl">
          <PrimaryNode />
        </FadeIn>

      </motion.div>

      {/* Auxiliary Nodes (Footer) */}
      <div className="max-w-[90rem] mx-auto w-full relative z-10 mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 text-xs font-mono uppercase tracking-widest">
        <div className="flex gap-4">
          <AuxiliaryNode href="#" label="Twitter // X" delay={2.6} />
          <AuxiliaryNode href="#" label="LinkedIn" delay={2.7} />
          <AuxiliaryNode href="#" label="GitHub" delay={2.8} />
        </div>
        <FadeIn delay={3.2}>
          <p className="opacity-50">SYS.VER 1.0.0 © {new Date().getFullYear()}</p>
        </FadeIn>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Modular Interaction Objects
// ----------------------------------------------------------------------

function PrimaryNode() {
  const { setCursorState } = useCursor();
  const nodeRef = useRef<HTMLAnchorElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });
  const rotateX = useSpring(0, { stiffness: 150, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // 3D Tilt Physics
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -8); // Physical resistance tilt
    rotateY.set(((x - centerX) / centerX) * 8);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorState("view");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorState("default");
    rotateX.set(0);
    rotateY.set(0);
  };

  // Localized cinematic spotlight
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 60%)`;
  const borderLight = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 40%)`;

  return (
    <motion.a
      href="mailto:hello@example.com"
      ref={nodeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative w-full flex items-center justify-between p-6 md:p-10 bg-[#050505] rounded-2xl border border-white/10 overflow-hidden will-change-transform shadow-[0_0_40px_rgba(0,0,0,0.8)]"
      whileHover={{ scale: 0.98 }} // Physical depression
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Active Spotlight */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{ background: spotlight, opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Reactive Border Lighting */}
      <motion.div 
        className="absolute -inset-[1px] z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: borderLight, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", padding: "1px" }}
      />

      {/* Internal Architecture Grids */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 group-hover:opacity-50 transition-opacity duration-700" />
      
      {/* Terminal Glitch Scanlines */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30 group-hover:opacity-100 transition-opacity duration-700"
           style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)" }} />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3 text-white/40 text-[10px] font-mono tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/40 group-hover:bg-white transition-colors duration-300"></span>
          </span>
          Terminal Active
        </div>
        <span className="text-2xl md:text-5xl font-light tracking-tight text-white/80 group-hover:text-white transition-colors duration-300">
          hello@example.com
        </span>
      </div>

      <div className="relative z-20 p-4 md:p-6 rounded-full border border-white/10 bg-white/0 group-hover:bg-white group-hover:text-black transition-all duration-500 overflow-hidden">
        <motion.div
          animate={isHovered ? { x: [0, 5, 0], y: [0, -5, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
        </motion.div>
      </div>
    </motion.a>
  );
}

function AuxiliaryNode({ href, label, delay }: { href: string; label: string; delay: number }) {
  const { setCursorState } = useCursor();

  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ scale: 0.95 }} // Tactile depression
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <Link 
          href={href}
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("default")}
          className="relative px-6 py-3 bg-white/5 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center group hover:bg-white/10 hover:border-white/20 transition-colors"
        >
          <span className="relative z-10 text-white/60 group-hover:text-white transition-colors duration-300">
            {label}
          </span>
        </Link>
      </motion.div>
    </FadeIn>
  );
}
