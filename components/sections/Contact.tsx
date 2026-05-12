"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { LetterReveal } from "@/components/animations/LetterReveal";
import { RevealText } from "@/components/animations/RevealText";
import { Mail } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <section id="contact" ref={containerRef} className="relative pt-48 pb-12 px-6 min-h-screen flex flex-col justify-between bg-black overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none bg-black"
        style={{ opacity: bgOpacity }}
      />
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-t-full z-0 pointer-events-none" />

      <motion.div style={{ y: yParallax }} className="max-w-[90rem] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] w-8 bg-white/20" />
            <p className="text-white/30 tracking-[0.4em] uppercase text-[10px] font-mono">
              Neural Connection Interface
            </p>
            <div className="h-[1px] w-8 bg-white/20" />
          </div>
        </FadeIn>

        <h2 className="text-5xl md:text-[8vw] leading-[0.85] font-bold tracking-tighter mb-32 flex flex-col items-center">
          <LetterReveal text="Establish" delay={0.6} className="text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 mt-2">
            <RevealText text="Direct" delay={1.2} className="text-white/40 italic font-light" />
            <RevealText text="Link." delay={1.5} className="text-white" />
          </div>
        </h2>

        {/* AI Communication Nexus */}
        <FadeIn delay={2.2} direction="up" className="w-full flex justify-center mt-12 mb-32 relative">
          <NeuralNexus />
        </FadeIn>

      </motion.div>

      <div className="max-w-[90rem] mx-auto w-full relative z-10 mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 text-xs font-mono uppercase tracking-widest">
        <FadeIn delay={3.2}>
          <p className="opacity-50">SYS.VER 1.0.0 © {new Date().getFullYear()}</p>
        </FadeIn>
      </div>
    </section>
  );
}

function NeuralNexus() {
  const nexusRef = useRef<HTMLDivElement>(null);
  
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Mouse tracking for the entire nexus to drive subtle parallax
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!nexusRef.current) return;
      const rect = nexusRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={nexusRef} className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
      
      {/* Background Pulse/Grid */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute inset-0 rounded-full border border-white/5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" 
      />

      {/* SVG Neural Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="pulse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        
        <motion.path 
          d="M250,250 L100,150" 
          stroke={activeNode === "twitter" ? "url(#pulse)" : "rgba(255,255,255,0.1)"} 
          strokeWidth="1" 
          fill="none" 
          animate={activeNode === "twitter" ? { strokeDasharray: ["0, 1000", "1000, 0"] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M250,250 L400,150" 
          stroke={activeNode === "linkedin" ? "url(#pulse)" : "rgba(255,255,255,0.1)"} 
          strokeWidth="1" 
          fill="none" 
          animate={activeNode === "linkedin" ? { strokeDasharray: ["0, 1000", "1000, 0"] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M250,250 L250,400" 
          stroke={activeNode === "github" ? "url(#pulse)" : "rgba(255,255,255,0.1)"} 
          strokeWidth="1" 
          fill="none" 
          animate={activeNode === "github" ? { strokeDasharray: ["0, 1000", "1000, 0"] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Orbital Nodes */}
      <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2">
        <NeuralNode 
          icon={<TwitterIcon className="w-5 h-5" />} 
          label="X.com" 
          href="#" 
          onHover={() => setActiveNode("twitter")} 
          onLeave={() => setActiveNode(null)} 
        />
      </div>

      <div className="absolute top-[30%] right-[20%] translate-x-1/2 -translate-y-1/2">
        <NeuralNode 
          icon={<LinkedinIcon className="w-5 h-5" />} 
          label="LinkedIn" 
          href="#" 
          onHover={() => setActiveNode("linkedin")} 
          onLeave={() => setActiveNode(null)} 
        />
      </div>

      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 translate-y-1/2">
        <NeuralNode 
          icon={<GithubIcon className="w-5 h-5" />} 
          label="GitHub" 
          href="#" 
          onHover={() => setActiveNode("github")} 
          onLeave={() => setActiveNode(null)} 
        />
      </div>

      {/* Core Node */}
      <CoreNode isNetworkActive={activeNode !== null} />

    </div>
  );
}

function CoreNode({ isNetworkActive }: { isNetworkActive: boolean }) {
  const { setCursorState } = useCursor();
  
  return (
    <motion.a
      href="mailto:hello@example.com"
      onMouseEnter={() => setCursorState("hover")}
      onMouseLeave={() => setCursorState("default")}
      className="relative z-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-black border border-white/20 flex flex-col items-center justify-center gap-2 group shadow-[0_0_60px_rgba(255,255,255,0.05)] hover:shadow-[0_0_80px_rgba(255,255,255,0.1)] transition-all duration-700"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
      
      {/* Glitch Scanlines inside Core */}
      <div className="absolute inset-0 rounded-full z-0 pointer-events-none mix-blend-overlay opacity-30 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden"
           style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)" }} />
           
      <motion.div 
        animate={{ scale: isNetworkActive ? 1.1 : 1, opacity: isNetworkActive ? 0.5 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <Mail className="w-6 h-6 md:w-8 md:h-8 text-white/80 group-hover:text-white transition-colors mb-2" />
        <span className="text-white/60 group-hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
          Initialize
        </span>
      </motion.div>
    </motion.a>
  );
}

function NeuralNode({ icon, label, href, onHover, onLeave }: { icon: React.ReactNode; label: string; href: string; onHover: () => void; onLeave: () => void }) {
  const { setCursorState } = useCursor();

  return (
    <motion.a
      href={href}
      onMouseEnter={() => { setCursorState("hover"); onHover(); }}
      onMouseLeave={() => { setCursorState("default"); onLeave(); }}
      className="relative z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group hover:bg-white hover:border-transparent transition-colors duration-500"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="text-white/60 group-hover:text-black transition-colors duration-500">
        {icon}
      </div>
      <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-mono tracking-widest text-white/50 uppercase whitespace-nowrap">
        {label}
      </div>
    </motion.a>
  );
}
