"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { LetterReveal } from "@/components/animations/LetterReveal";
import { RevealText } from "@/components/animations/RevealText";
import { Send } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const ease4 = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Symmetrical arc: 5 nodes evenly spread across upper hemisphere
// Angles measured from positive-x axis, counter-clockwise
// -160, -125, -90, -55, -20 => perfectly mirrored about -90 (top)
const NODES = [
  { id: "github",    label: "GitHub",    icon: GithubIcon,    href: "https://github.com/riyan-10",             angle: -160 },
  { id: "linkedin",  label: "LinkedIn",  icon: LinkedinIcon,  href: "https://linkedin.com/in/riyan-nizar",      angle: -125 },
  { id: "whatsapp",  label: "WhatsApp",  icon: WhatsAppIcon,  href: "https://wa.me/qr/BA4562EZZ6GFL1",         angle: -90  },
  { id: "instagram", label: "Instagram", icon: InstagramIcon, href: "https://instagram.com/riyan_nizar10",      angle: -55  },
  { id: "mail",      label: "Email",     icon: MailIcon,      href: "mailto:riyannizar8@gmail.com",             angle: -20  },
];

// SVG coordinate constants — single source of truth
const CX = 250, CY = 270, R = 170, CORE_R = 55;

function polarToXY(angleDeg: number, radius: number) {
  const rad = angleDeg * (Math.PI / 180);
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function buildCurve(angleDeg: number) {
  const end = polarToXY(angleDeg, R);
  // Start from core edge, not center
  const start = polarToXY(angleDeg, CORE_R);
  // Control point: pull outward at ~60% radius with slight angular offset for organic feel
  const offsetDeg = angleDeg < -90 ? 12 : angleDeg > -90 ? -12 : 0;
  const cp = polarToXY(angleDeg + offsetDeg, R * 0.55);
  return { d: `M${start.x},${start.y} Q${cp.x},${cp.y} ${end.x},${end.y}`, end };
}

export function Contact() {
  const { setCursorState } = useCursor();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="relative pt-24 pb-16 px-6 min-h-[90vh] flex flex-col justify-between bg-black overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] md:w-[900px] md:h-[450px] bg-white/[0.015] blur-[120px] rounded-t-full z-0 pointer-events-none" />

      <div className="max-w-[90rem] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-4 mb-10 md:mb-14">
            <div className="h-[1px] w-6 bg-white/15" />
            <p className="text-white/25 tracking-[0.4em] uppercase text-[9px] font-mono">Neural Nexus Activation</p>
            <div className="h-[1px] w-6 bg-white/15" />
          </div>
        </FadeIn>

        <motion.h2
          onMouseEnter={() => setCursorState("text")}
          onMouseLeave={() => setCursorState("default")}
          className="text-5xl md:text-[7.5vw] leading-[0.9] font-bold tracking-tighter mb-14 md:mb-20 flex flex-col items-center cursor-none"
        >
          <LetterReveal text="Establish" delay={0.3} className="text-white" />
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 mt-2">
            <RevealText text="Direct" delay={0.6} className="text-white/30 italic font-light" />
            <RevealText text="Link." delay={0.8} className="text-white" />
          </div>
        </motion.h2>

        <div className="w-full flex justify-center items-center relative">
          <NeuralNexus onInitiate={() => setFormOpen(true)} />
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto w-full relative z-10 mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[10px] font-mono uppercase tracking-[0.2em]">
        <FadeIn delay={1.5}>
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
            <p className="opacity-60">SYSTEM OPERATIONAL 1.0.0</p>
          </div>
        </FadeIn>
        <FadeIn delay={1.7}>
          <p className="opacity-40">© {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
        </FadeIn>
      </div>

      {/* Form modal at section level for stable z-index layering */}
      <AnimatePresence>
        {formOpen && <ContactFormModal onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

function NeuralNexus({ onInitiate }: { onInitiate: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();
  const [active, setActive] = useState<string | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => setPhase(4), 3800);
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative w-[320px] h-[340px] md:w-[500px] md:h-[480px]"
      onMouseEnter={() => setCursorState("nexus")}
      onMouseLeave={() => setCursorState("default")}
    >
      {/* Ambient pulse rings — centered on core */}
      {phase >= 2 && [0, 1].map(i => (
        <motion.div
          key={i}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.8], opacity: [0, 0.05, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 4, ease: "easeInOut" }}
          className="absolute rounded-full border border-white/10 pointer-events-none"
          style={{
            width: 200, height: 200,
            left: `${(CX / 500) * 100}%`, top: `${(CY / 500) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* SVG layer: pathways */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
          </linearGradient>
          <filter id="ng"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {NODES.map((node, i) => {
          const curve = buildCurve(node.angle);
          const isActive = active === node.id;
          return (
            <g key={node.id}>
              {/* Dormant line */}
              <motion.path
                d={curve.d} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }}
                animate={phase >= 3 ? { pathLength: 1 } : {}}
                transition={{ duration: 1.6, delay: i * 0.2, ease: ease4 }}
              />
              {/* Signal propagation on phase 3 entry */}
              <motion.path
                d={curve.d} stroke="url(#pg)" strokeWidth="1" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  phase === 3
                    ? { pathLength: [0, 1], opacity: [0, 0.6, 0] }
                    : isActive
                      ? { pathLength: 1, opacity: 0.5 }
                      : { pathLength: 1, opacity: 0 }
                }
                transition={
                  phase === 3
                    ? { duration: 2, delay: i * 0.2, ease: "easeInOut" }
                    : { duration: 0.5, ease: ease4 }
                }
                filter={isActive ? "url(#ng)" : undefined}
              />
            </g>
          );
        })}
      </svg>

      {/* Communication nodes */}
      {NODES.map((node, i) => {
        const { end } = buildCurve(node.angle);
        const Icon = node.icon;
        return (
          <motion.a
            key={node.id}
            href={node.href}
            target={node.id === "mail" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={phase >= 4 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.12, ease: ease4 }}
            onMouseEnter={() => { setActive(node.id); setCursorState("link"); }}
            onMouseLeave={() => { setActive(null); setCursorState("nexus"); }}
            style={{
              position: "absolute",
              left: `${(end.x / 500) * 100}%`,
              top: `${(end.y / 500) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#060606] border border-white/[0.08] flex items-center justify-center group hover:bg-white hover:border-white transition-all duration-600"
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-white/50 group-hover:text-black transition-colors duration-400">
              <Icon className="w-4 h-4 md:w-[17px] md:h-[17px]" />
            </div>
            <div className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-[7px] md:text-[8px] font-mono tracking-[0.2em] text-white/35 uppercase whitespace-nowrap pointer-events-none">
              {node.label}
            </div>
          </motion.a>
        );
      })}

      {/* Central Core */}
      <div
        className="absolute z-30"
        style={{
          left: `${(CX / 500) * 100}%`,
          top: `${(CY / 500) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Phase 1: dormant dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            phase === 1
              ? { scale: [1, 1.3, 1], opacity: [0, 0.7, 0.4] }
              : phase >= 2
                ? { scale: 0, opacity: 0 }
                : {}
          }
          transition={
            phase === 1
              ? { scale: { duration: 2.5, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" }, opacity: { duration: 1, ease: ease4 } }
              : { duration: 0.6, ease: ease4 }
          }
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
        />

        {/* Phase 2+: core button */}
        <motion.button
          onClick={onInitiate}
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("nexus")}
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 2 ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: ease4 }}
          whileHover={{ scale: 1.04 }}
          className="relative w-24 h-24 md:w-[110px] md:h-[110px] rounded-full bg-black border border-white/10 flex flex-col items-center justify-center gap-2 group hover:border-white/20 transition-all duration-700 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />
          <motion.div
            animate={phase >= 3 ? { y: [0, -1.5, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center relative z-10"
          >
            <Send className="w-4 h-4 md:w-[18px] md:h-[18px] text-white/50 group-hover:text-white transition-colors duration-500 mb-1.5" />
            <span className="text-white/35 group-hover:text-white text-[7px] md:text-[8px] font-mono uppercase tracking-[0.2em] transition-colors duration-500">
              Initiate
            </span>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}

function ContactFormModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const s = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const b = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:riyannizar8@gmail.com?subject=${s}&body=${b}`, "_self");
    setSent(true);
    setTimeout(onClose, 2000);
  }, [form, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center px-6"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <motion.form
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.5, ease: ease4 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[400px] bg-[#060606] border border-white/10 rounded-2xl p-7 md:p-8 flex flex-col gap-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-white/60">Direct Transmission</h3>
          <button type="button" onClick={onClose} className="text-white/25 hover:text-white text-xs transition-colors p-1">✕</button>
        </div>

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
            <p className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">Transmission complete.</p>
          </motion.div>
        ) : (
          <>
            <Field label="Name" type="text" value={form.name} placeholder="Your name" onChange={v => setForm(p => ({ ...p, name: v }))} />
            <Field label="Email" type="email" value={form.email} placeholder="your@email.com" onChange={v => setForm(p => ({ ...p, email: v }))} />
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/25">Message</label>
              <textarea
                required rows={4} value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/15 outline-none focus:border-white/20 transition-colors resize-none leading-relaxed"
                placeholder="Your message..."
              />
            </div>
            <button type="submit" className="mt-1 w-full py-3 bg-white text-black rounded-full text-xs tracking-[0.1em] uppercase hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-mono font-medium">
              <Send className="w-3.5 h-3.5" />
              Send Message
            </button>
          </>
        )}
      </motion.form>
    </motion.div>
  );
}

function Field({ label, type, value, placeholder, onChange }: { label: string; type: string; value: string; placeholder: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/25">{label}</label>
      <input
        type={type} required value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/15 outline-none focus:border-white/20 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}
