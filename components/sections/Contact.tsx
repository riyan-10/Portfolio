"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { LetterReveal } from "@/components/animations/LetterReveal";
import { RevealText } from "@/components/animations/RevealText";
import { Send } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

// Highly optimized, clean SVG Icons
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

const MailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// Cinematic easing curve
const smoothEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Contact() {
  const { setCursorState } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative pt-24 pb-16 px-6 min-h-[90vh] flex flex-col justify-between bg-black overflow-hidden"
    >
      {/* Deep Atmospheric Backdrop Layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] md:w-[1000px] md:h-[500px] bg-white/[0.02] blur-[120px] rounded-t-full z-0 pointer-events-none" />

      <div className="max-w-[90rem] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center mt-12">
        
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-4 mb-10 md:mb-14">
            <div className="h-[1px] w-6 bg-white/15" />
            <p className="text-white/25 tracking-[0.4em] uppercase text-[9px] font-mono font-medium">
              Neural Nexus Activation
            </p>
            <div className="h-[1px] w-6 bg-white/15" />
          </div>
        </FadeIn>

        <motion.h2 
          onMouseEnter={() => setCursorState("text")}
          onMouseLeave={() => setCursorState("default")}
          className="text-5xl md:text-[7.5vw] leading-[0.9] font-bold tracking-tighter mb-14 md:mb-20 flex flex-col items-center cursor-none pointer-events-auto"
        >
          <LetterReveal text="Establish" delay={0.3} className="text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 mt-2">
            <RevealText text="Direct" delay={0.6} className="text-white/30 italic font-light" />
            <RevealText text="Link." delay={0.8} className="text-white" />
          </div>
        </motion.h2>

        {/* Intelligent Awakening System */}
        <div className="w-full flex justify-center items-center mt-4 md:mt-8 relative min-h-[380px] md:min-h-[520px]">
          <NeuralNexus />
        </div>

      </div>

      <div className="max-w-[90rem] mx-auto w-full relative z-10 mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[10px] font-mono uppercase tracking-[0.2em]">
        <FadeIn delay={1.5}>
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
            <p className="opacity-60 font-light">SYSTEM OPERATIONAL 1.0.0</p>
          </div>
        </FadeIn>
        <FadeIn delay={1.7}>
          <p className="opacity-40 font-light">© {new Date().getFullYear()} ALL ARCHITECTURAL INTEGRITY SECURED.</p>
        </FadeIn>
      </div>
    </section>
  );
}

// Perfectly balanced spatial destination nodes
const nodes = [
  { id: "github", label: "GitHub", icon: GithubIcon, href: "#", angle: -150, radiusOffset: 0 },
  { id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, href: "#", angle: -120, radiusOffset: 20 },
  { id: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon, href: "#", angle: -90, radiusOffset: 35 },
  { id: "instagram", label: "Instagram", icon: InstagramIcon, href: "#", angle: -60, radiusOffset: 20 },
  { id: "mail", label: "Email", icon: MailIcon, href: "mailto:hello@example.com", angle: -30, radiusOffset: 0 },
];

function NeuralNexus() {
  const nexusRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isInView = useInView(nexusRef, { once: true, margin: "-150px" });
  const [phase, setPhase] = useState(0);

  // Symmetrical Coordinate Space Configuration
  const cx = 250;
  const cy = 320; // Anchored slightly lower to provide an upward arcing trajectory
  const baseRadius = 190;

  // Progressive, Orchestrated Timing Timeline
  useEffect(() => {
    if (!isInView) return;
    
    // Phase 1: Tiny dormant white node fades in instantly
    setPhase(1);

    // Phase 2: Pure dot expands fluidly into the communications core (Form button)
    const morphTimeout = setTimeout(() => setPhase(2), 1200);

    // Phase 3: Pathways gracefully propagate outwards
    const pathTimeout = setTimeout(() => setPhase(3), 2600);

    // Phase 4: Destination communication nodes solidify
    const nodeTimeout = setTimeout(() => setPhase(4), 4200);

    return () => {
      clearTimeout(morphTimeout);
      clearTimeout(pathTimeout);
      clearTimeout(nodeTimeout);
    };
  }, [isInView]);

  // Spring-Smoothed Cursor Micro-Reactivity for Ambient Sway
  const mouseX = useSpring(0, { stiffness: 40, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!nexusRef.current) return;
      const rect = nexusRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 50;
      const y = (e.clientY - rect.top - rect.height / 2) / 50;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generates custom organic Bezier curve string
  const getBezierPath = (angle: number, offset: number) => {
    const rad = (angle) * (Math.PI / 180);
    const r = baseRadius + offset;
    const ex = cx + r * Math.cos(rad);
    const ey = cy + r * Math.sin(rad);
    
    // Control point pulled slightly inward and rotated for natural curvature
    const midRad = (angle + (angle > -90 ? -15 : 15)) * (Math.PI / 180);
    const cpR = r * 0.5;
    const cpx = cx + cpR * Math.cos(midRad);
    const cpy = cy + cpR * Math.sin(midRad);

    return {
      d: `M ${cx} ${cy} Q ${cpx} ${cpy} ${ex} ${ey}`,
      ex,
      ey
    };
  };

  return (
    <div 
      ref={nexusRef} 
      className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center"
      onMouseEnter={() => setCursorState("nexus")}
      onMouseLeave={() => setCursorState("default")}
    >
      {/* Silent breathing concentric pulses to establish depth */}
      {phase >= 2 && [0, 1].map((i) => (
        <motion.div 
          key={i}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ 
            scale: [0.4, 2], 
            opacity: [0, 0.06, 0] 
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            delay: i * 4.5, 
            ease: "easeInOut" 
          }}
          className="absolute rounded-full border border-white/10 pointer-events-none w-full h-full"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            marginTop: "70px" // Account for cy=320 offset
          }}
        />
      ))}

      {/* Fluid, Curved Neural Pathways */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 500 500">
        <defs>
          {/* Elegant gradients for flowing signals */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
          </linearGradient>
          <filter id="neuralGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node, i) => {
          const pathData = getBezierPath(node.angle, node.radiusOffset);
          const isActive = activeNode === node.id;

          return (
            <g key={`neural-branch-${node.id}`}>
              {/* Dormant ambient pathway */}
              <motion.path
                d={pathData.d}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={phase >= 3 ? { pathLength: 1 } : {}}
                transition={{ 
                  duration: 1.8, 
                  delay: i * 0.25, 
                  ease: smoothEase 
                }}
              />

              {/* Intelligent active propagation curve */}
              <motion.path
                d={pathData.d}
                stroke="url(#pathGradient)"
                strokeWidth={isActive ? "1.5" : "1"}
                fill="none"
                filter={isActive ? "url(#neuralGlow)" : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  phase === 3 
                    ? { pathLength: [0, 1], opacity: [0, 0.7, 0] } 
                    : isActive 
                      ? { pathLength: 1, opacity: 0.6 } 
                      : { pathLength: 1, opacity: 0 }
                }
                transition={
                  phase === 3 
                    ? { duration: 2.2, delay: i * 0.25, ease: "easeInOut" } 
                    : { duration: 0.6, ease: smoothEase }
                }
              />
            </g>
          );
        })}
      </svg>

      {/* Spatial Node Synapses (Mapped precisely to end of bezier paths) */}
      {nodes.map((node, i) => {
        const pathData = getBezierPath(node.angle, node.radiusOffset);
        const NodeIcon = node.icon;
        
        // Convert coordinates to percentage dynamically for absolute containment
        const leftPercent = (pathData.ex / 500) * 100;
        const topPercent = (pathData.ey / 500) * 100;

        return (
          <motion.a
            key={node.id}
            href={node.href}
            target={node.id !== "mail" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={phase >= 4 ? { scale: 1, opacity: 1 } : {}}
            transition={{ 
              duration: 1, 
              delay: i * 0.15, 
              ease: smoothEase 
            }}
            onMouseEnter={() => { setActiveNode(node.id); setCursorState("link"); }}
            onMouseLeave={() => { setActiveNode(null); setCursorState("nexus"); }}
            style={{
              position: "absolute",
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="z-20 w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-[#030303] border border-white/[0.08] flex items-center justify-center group hover:bg-white hover:border-white transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <div className="text-white/50 group-hover:text-black transition-colors duration-500">
              <NodeIcon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            </div>
            
            {/* Restrained, elegant micro-label */}
            <div className="absolute -bottom-8 opacity-0 pointer-events-none group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 text-[8px] font-mono tracking-[0.25em] text-white/40 uppercase whitespace-nowrap">
              {node.label}
            </div>
          </motion.a>
        );
      })}

      {/* Communication Core (Positioned at architectural anchor point) */}
      <div 
        style={{
          position: "absolute",
          left: `${(cx / 500) * 100}%`,
          top: `${(cy / 500) * 100}%`,
          transform: "translate(-50%, -50%)"
        }}
        className="z-30 flex items-center justify-center"
      >
        <CenterCommunicationCore phase={phase} />
      </div>
    </div>
  );
}

function CenterCommunicationCore({ phase }: { phase: number }) {
  const { setCursorState } = useCursor();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      {/* Phase 1: Dormant White Activation Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === 1 
            ? { 
                scale: [0.8, 1.1, 1], 
                opacity: [0, 0.8, 0.5],
              } 
            : phase >= 2 
              ? { scale: 0, opacity: 0 } 
              : {}
        }
        transition={
          phase === 1 
            ? {
                scale: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                opacity: { duration: 1.2, ease: smoothEase }
              }
            : { duration: 0.8, ease: smoothEase }
        }
        className="absolute w-1.5 h-1.5 rounded-full bg-white z-40 pointer-events-none filter blur-[0.5px]"
      />

      {/* Phase 2+: Central Functional Communication Core */}
      <motion.button
        onClick={() => setFormOpen(true)}
        onMouseEnter={() => setCursorState("hover")}
        onMouseLeave={() => setCursorState("nexus")}
        initial={{ scale: 0, opacity: 0, filter: "blur(8px)" }}
        animate={
          phase >= 2 
            ? { scale: 1, opacity: 1, filter: "blur(0px)" } 
            : {}
        }
        transition={{ duration: 1.6, ease: smoothEase }}
        whileHover={{ scale: 1.03 }}
        className="relative w-28 h-28 md:w-[130px] md:h-[130px] rounded-full bg-black border border-white/10 flex flex-col items-center justify-center gap-2.5 group shadow-[0_0_60px_rgba(255,255,255,0.01)] hover:shadow-[0_0_80px_rgba(255,255,255,0.06)] hover:border-white/20 hover:bg-[#040404] transition-all duration-1000 overflow-hidden"
      >
        {/* Soft micro-sheen sweeping overlay */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

        <motion.div
          animate={phase >= 3 ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center relative z-10"
        >
          <Send className="w-[18px] h-[18px] text-white/60 group-hover:text-white transition-colors duration-500 mb-2 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
          <span className="text-white/40 group-hover:text-white text-[8px] font-mono uppercase tracking-[0.25em] transition-colors duration-700 font-medium">
            Initiate
          </span>
        </motion.div>

        {/* Delicate ring boundary sweep */}
        <div className="absolute inset-0 rounded-full border border-white/5 scale-[1.08] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" />
      </motion.button>

      {/* Integrated Modal System */}
      {formOpen && <ContactFormModal onClose={() => setFormOpen(false)} />}
    </>
  );
}

function ContactFormModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Architecture Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:hello@example.com?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
    setTimeout(onClose, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] flex items-center justify-center px-6 pointer-events-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Ambient Deep Mask */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md transition-all duration-500" />
      
      <motion.form
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[420px] bg-[#050505] border border-white/10 rounded-3xl p-7 md:p-9 flex flex-col gap-6 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/70">Establish Vector</h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-white/30 hover:text-white text-xs transition-colors p-1"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }} 
            animate={{ opacity: 1, filter: "blur(0px)" }} 
            className="py-14 text-center"
          >
            <p className="text-white/50 font-mono text-[10px] tracking-[0.2em] uppercase">Transmission complete.</p>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 font-medium">Identity</label>
              <input
                type="text" required value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/15 outline-none focus:border-white/25 transition-colors font-light tracking-wide"
                placeholder="Name or organization"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 font-medium">Route</label>
              <input
                type="email" required value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/15 outline-none focus:border-white/25 transition-colors font-light tracking-wide"
                placeholder="Email address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 font-medium">Message Core</label>
              <textarea
                required rows={4} value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/15 outline-none focus:border-white/25 transition-colors resize-none font-light tracking-wide leading-relaxed"
                placeholder="Detailed objective..."
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-3.5 bg-white text-black rounded-full font-medium text-xs tracking-[0.15em] uppercase hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 font-mono"
            >
              <Send className="w-3.5 h-3.5" />
              Transmit Link
            </button>
          </>
        )}
      </motion.form>
    </motion.div>
  );
}
