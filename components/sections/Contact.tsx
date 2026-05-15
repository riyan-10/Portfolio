"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { LetterReveal } from "@/components/animations/LetterReveal";
import { RevealText } from "@/components/animations/RevealText";
import { Send } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

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

export function Contact() {
  const { setCursorState } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" ref={containerRef} className="relative pt-20 md:pt-32 pb-12 px-6 min-h-screen flex flex-col justify-between bg-black overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-t-full z-0 pointer-events-none" />

      <div className="max-w-[90rem] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-4 mb-8 md:mb-12">
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
          className="text-5xl md:text-[8vw] leading-[0.85] font-bold tracking-tighter mb-12 md:mb-16 flex flex-col items-center cursor-none"
        >
          <LetterReveal text="Establish" delay={0.6} className="text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 mt-2">
            <RevealText text="Direct" delay={1.2} className="text-white/40 italic font-light" />
            <RevealText text="Link." delay={1.5} className="text-white" />
          </div>
        </motion.h2>

        {/* Neural Nexus with scroll-triggered animation */}
        <div className="w-full flex justify-center mt-4 md:mt-8 mb-12 md:mb-16 relative">
          <NeuralNexus />
        </div>

      </div>

      <div className="max-w-[90rem] mx-auto w-full relative z-10 mt-12 md:mt-16 border-t border-white/5 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-white/40 text-xs font-mono uppercase tracking-widest">
        <FadeIn delay={3.2}>
          <p className="opacity-50">SYS.VER 1.0.0 © {new Date().getFullYear()}</p>
        </FadeIn>
      </div>
    </section>
  );
}

// --- Social node config ---
const nodes = [
  { id: "instagram", label: "Instagram", icon: InstagramIcon, angle: -144, href: "#" },
  { id: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon, angle: -72, href: "#" },
  { id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, angle: 0, href: "#" },
  { id: "mail", label: "Mail", icon: MailIcon, angle: 72, href: "mailto:hello@example.com" },
  { id: "github", label: "GitHub", icon: GithubIcon, angle: 144, href: "#" },
];

function NeuralNexus() {
  const nexusRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isInView = useInView(nexusRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  // Animation timeline driven by scroll into view
  useEffect(() => {
    if (!isInView) return;
    // Phase 1: dot appears (immediate)
    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), 500);   // dot → button
    const t3 = setTimeout(() => setPhase(3), 1000);   // branches grow
    const t4 = setTimeout(() => setPhase(4), 1800);   // nodes appear
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isInView]);

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

  const cx = 250, cy = 250, r = 160;

  return (
    <div 
      ref={nexusRef} 
      className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
      onMouseEnter={() => setCursorState("nexus")}
      onMouseLeave={() => setCursorState("default")}
    >
      {/* Concentric pulse waves */}
      {phase >= 2 && [0, 1, 2].map((i) => (
        <motion.div 
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.5], opacity: [0, 0.1, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
        />
      ))}

      {/* Rotating dashed orbit */}
      {phase >= 2 && (
        <motion.div 
          style={{ x: mouseX, y: mouseY }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-white/5 pointer-events-none z-0" 
        />
      )}

      {/* SVG branches - grow from center to nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="branchGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {nodes.map((node, i) => {
          const rad = (node.angle - 90) * (Math.PI / 180);
          const nx = cx + r * Math.cos(rad);
          const ny = cy + r * Math.sin(rad);
          const isActive = activeNode === node.id;
          
          return (
            <g key={`branch-${node.id}`}>
              {/* Base branch line */}
              <motion.line 
                x1={cx} y1={cy} x2={nx} y2={ny}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 3 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.32, 0.72, 0, 1] }}
              />
              {/* Active glow line */}
              {isActive && (
                <motion.line 
                  x1={cx} y1={cy} x2={nx} y2={ny}
                  stroke="url(#branchGlow)"
                  strokeWidth="2"
                  filter="url(#lineGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "circOut" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Social nodes at branch endpoints */}
      {nodes.map((node, i) => {
        const rad = (node.angle - 90) * (Math.PI / 180);
        const leftPercent = 50 + (r / 5) * Math.cos(rad);
        const topPercent = 50 + (r / 5) * Math.sin(rad);
        const NodeIcon = node.icon;

        return (
          <motion.a
            key={node.id}
            href={node.href}
            target={node.id !== "mail" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 4 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
            onMouseEnter={() => { setActiveNode(node.id); setCursorState("link"); }}
            onMouseLeave={() => { setActiveNode(null); setCursorState("nexus"); }}
            style={{
              position: "absolute",
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="relative z-20 w-14 h-14 md:w-18 md:h-18 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group hover:bg-white hover:border-transparent transition-colors duration-500"
            whileHover={{ scale: 1.15 }}
          >
            <div className="text-white/60 group-hover:text-black transition-colors duration-500">
              <NodeIcon className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-mono tracking-widest text-white/50 uppercase whitespace-nowrap">
              {node.label}
            </div>
          </motion.a>
        );
      })}

      {/* Center: Dot → Submit Button */}
      <CenterButton phase={phase} />
    </div>
  );
}

function CenterButton({ phase }: { phase: number }) {
  const { setCursorState } = useCursor();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      {/* Phase 1: Small white dot */}
      <motion.div
        className="absolute z-30 rounded-full bg-white pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={
          phase === 1 
            ? { width: 12, height: 12, opacity: 1 } 
            : phase >= 2 
              ? { width: 0, height: 0, opacity: 0 } 
              : {}
        }
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
      />

      {/* Phase 2+: Full button */}
      <motion.button
        onClick={() => setFormOpen(true)}
        onMouseEnter={() => setCursorState("hover")}
        onMouseLeave={() => setCursorState("nexus")}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 2 ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        whileHover={{ scale: 1.05 }}
        className="relative z-30 w-28 h-28 md:w-36 md:h-36 rounded-full bg-black border border-white/20 flex flex-col items-center justify-center gap-2 group shadow-[0_0_80px_rgba(255,255,255,0.03)] hover:shadow-[0_0_100px_rgba(255,255,255,0.08)] hover:bg-white hover:text-black transition-all duration-700"
      >
        <div className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
        <Send className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:text-black transition-colors mb-1" />
        <span className="text-white/50 group-hover:text-black text-[8px] md:text-[9px] font-mono uppercase tracking-[0.2em] transition-colors">
          Send Message
        </span>
      </motion.button>

      {/* Contact Form Modal */}
      {formOpen && <ContactFormModal onClose={() => setFormOpen(false)} />}
    </>
  );
}

function ContactFormModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:hello@example.com?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <motion.form
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold tracking-tight">Direct Transmission</h3>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white text-sm transition-colors">✕</button>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
            <p className="text-white/60 font-mono text-sm">Message routed successfully.</p>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Name</label>
              <input
                type="text" required value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Email</label>
              <input
                type="email" required value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Message</label>
              <textarea
                required rows={4} value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-3 bg-white text-black rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Transmit Message
            </button>
          </>
        )}
      </motion.form>
    </motion.div>
  );
}
