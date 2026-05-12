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

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function Contact() {
  const { setCursorState } = useCursor();
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

        <motion.h2 
          onMouseEnter={() => setCursorState("text")}
          onMouseLeave={() => setCursorState("default")}
          className="text-5xl md:text-[8vw] leading-[0.85] font-bold tracking-tighter mb-32 flex flex-col items-center cursor-none"
        >
          <LetterReveal text="Establish" delay={0.6} className="text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 mt-2">
            <RevealText text="Direct" delay={1.2} className="text-white/40 italic font-light" />
            <RevealText text="Link." delay={1.5} className="text-white" />
          </div>
        </motion.h2>

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
  const { setCursorState } = useCursor();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!nexusRef.current) return;
      const rect = nexusRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 25;
      const y = (e.clientY - rect.top - rect.height / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Define 5 satellite configuration data
  const nodes = [
    { id: "linkedin", label: "LinkedIn", icon: <LinkedinIcon className="w-5 h-5" />, angle: -144, href: "#" },
    { id: "twitter", label: "X.com", icon: <TwitterIcon className="w-5 h-5" />, angle: -72, href: "#" },
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon className="w-5 h-5" />, angle: 0, href: "#" },
    { id: "github", label: "GitHub", icon: <GithubIcon className="w-5 h-5" />, angle: 72, href: "#" },
    { id: "instagram", label: "Instagram", icon: <InstagramIcon className="w-5 h-5" />, angle: 144, href: "#" }
  ];

  const cx = 250, cy = 250, r = 180; // Center and Radius

  return (
    <div 
      ref={nexusRef} 
      className="relative w-[300px] h-[300px] md:w-[550px] md:h-[550px] flex items-center justify-center"
      onMouseEnter={() => setCursorState("nexus")}
      onMouseLeave={() => setCursorState("default")}
    >
      {/* Central Background Distortion & Grid Pulse */}
      <motion.div 
        style={{ x: mouseX, y: mouseY, rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-white/5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_80%)] pointer-events-none" 
      />

      {/* Dynamic High Density Neural Filaments SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="filamentActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
          <filter id="filamentGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {nodes.map((node) => {
          const rad = (node.angle - 90) * (Math.PI / 180);
          const nx = cx + r * Math.cos(rad);
          const ny = cy + r * Math.sin(rad);
          const isActive = activeNode === node.id;
          
          // Generating triple filaments per connection node for circuit complexity
          return (
            <g key={`path-${node.id}`}>
              {/* 1. Subtle background filament */}
              <motion.path 
                d={`M${cx},${cy} L${nx},${ny}`} 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="1" 
                fill="none" 
              />
              
              {/* 2. Multi-threaded glowing propagation logic when hovered */}
              {isActive && (
                <>
                  <motion.path 
                    d={`M${cx},${cy} L${nx},${ny}`} 
                    stroke="url(#filamentActive)" 
                    strokeWidth="2" 
                    fill="none"
                    filter="url(#filamentGlow)"
                    initial={{ strokeDasharray: "0, 500" }}
                    animate={{ strokeDasharray: ["0, 500", "250, 250", "500, 0"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Offset micro-filament for technical complexity */}
                  <motion.path 
                    d={`M${cx+2},${cy+2} L${nx+2},${ny+2}`} 
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth="0.5" 
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Orbital Nodes Generation mapped dynamically from configuration */}
      {nodes.map((node) => {
        const rad = (node.angle - 90) * (Math.PI / 180);
        // Convert relative position percentage for outer bounding wrapper positioning
        const leftPercent = 50 + (r / 5) * Math.cos(rad);
        const topPercent = 50 + (r / 5) * Math.sin(rad);

        return (
          <div 
            key={node.id}
            style={{ 
              position: "absolute",
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <NeuralNode 
              icon={node.icon} 
              label={node.label} 
              href={node.href} 
              onHover={() => {
                setActiveNode(node.id);
                setCursorState("link");
              }} 
              onLeave={() => {
                setActiveNode(null);
                setCursorState("nexus");
              }} 
            />
          </div>
        );
      })}

      {/* Core Connection Point */}
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
      onMouseLeave={() => setCursorState("nexus")}
      className="relative z-20 w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/20 flex flex-col items-center justify-center gap-2 group shadow-[0_0_80px_rgba(255,255,255,0.03)] hover:shadow-[0_0_100px_rgba(255,255,255,0.08)] transition-all duration-700"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
      
      <div className="absolute inset-0 rounded-full z-0 pointer-events-none mix-blend-overlay opacity-40 group-hover:opacity-80 transition-opacity duration-700 overflow-hidden"
           style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)" }} />
           
      <motion.div 
        animate={{ scale: isNetworkActive ? 1.1 : 1, opacity: isNetworkActive ? 0.6 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <Mail className="w-6 h-6 md:w-7 md:h-7 text-white/80 group-hover:text-white transition-colors mb-2" />
        <span className="text-white/50 group-hover:text-white text-[9px] font-mono uppercase tracking-[0.25em] transition-colors">
          Direct Transmission
        </span>
      </motion.div>
    </motion.a>
  );
}

function NeuralNode({ icon, label, href, onHover, onLeave }: { icon: React.ReactNode; label: string; href: string; onHover: () => void; onLeave: () => void }) {
  return (
    <motion.a
      href={href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
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
