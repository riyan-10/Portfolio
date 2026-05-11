"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "01",
    title: "Quantum Interface",
    category: "System Engineering",
    challenge: "Monitoring highly volatile embedded systems metrics in real-time without locking the main browser thread.",
    architecture: "Engineered a headless dashboard utilizing WebSockets and WebWorkers to offload data parsing, achieving sub-16ms render cycles.",
    impact: "Reduced latency by 400% and enabled 60fps telemetry visualization.",
    tech: ["Next.js", "WebGL", "WebSockets", "Rust (WASM)"],
  },
  {
    id: "02",
    title: "Aura Architecture",
    category: "Interactive Design",
    challenge: "Traditional architectural portfolios fail to convey the scale and lighting of physical structures on a 2D screen.",
    architecture: "Developed an exploratory engine using custom GLSL shaders to render cinematic, dynamic lighting models directly in the DOM.",
    impact: "Awarded Site of the Day and increased client engagement duration by 3x.",
    tech: ["React", "Three.js", "GSAP", "GLSL"],
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-32 md:py-64 relative bg-[#020202]" ref={containerRef}>
      <div className="max-w-[90rem] mx-auto px-6">
        <FadeIn>
          <div className="flex items-end justify-between mb-32 border-b border-white/10 pb-12">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">Architecture <br/><span className="text-white/40">& Case Studies</span></h2>
            <p className="text-white/40 hidden md:block text-sm tracking-widest uppercase font-mono">02 Selected Works</p>
          </div>
        </FadeIn>

        <div className="space-y-48">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, index }: { project: any; index: number }) {
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  // 3D Hover State & Spotlight
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    
    // Normalize coordinates for the spotlight
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // Calculate 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -2; // max tilt degrees
    const tiltY = ((x - centerX) / centerX) * 2;
    
    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`;

  return (
    <div className="relative flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
      
      {/* Editorial Content / Storytelling */}
      <div className="flex-1 w-full flex flex-col gap-12 z-10 lg:sticky top-32">
        <FadeIn>
          <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest mb-4">
            <span>{project.id}</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span>{project.category}</span>
          </div>
          <h3 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8">{project.title}</h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/60 font-light">
          <FadeIn delay={0.1}>
            <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-xs">The Challenge</h4>
            <p className="leading-relaxed">{project.challenge}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-xs">Engineering</h4>
            <p className="leading-relaxed">{project.architecture}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-xs">Impact</h4>
            <p className="leading-relaxed text-white/80">{project.impact}</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h4 className="text-white font-medium mb-3 uppercase tracking-widest text-xs">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-[10px] tracking-widest text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.5} className="mt-4">
          <button 
            data-cursor="hover"
            className="group flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-white/70 transition-colors"
          >
            Read Case Study 
            <span className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </FadeIn>
      </div>

      {/* Cinematic Live Visual Window */}
      <FadeIn className="flex-1 w-full relative z-0">
        <motion.div
          ref={showcaseRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative w-full aspect-[4/5] md:aspect-square bg-[#050505] rounded-xl border border-white/10 overflow-hidden cursor-crosshair group will-change-transform"
        >
          {/* Spotlight Overlay */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
            style={{ background: spotlight, opacity: isHovered ? 1 : 0 }}
          />

          {/* Abstract Data Stream (Fake Telemetry) */}
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between opacity-30 group-hover:opacity-70 transition-opacity duration-700">
            <div className="flex justify-between text-[10px] font-mono text-white/50">
              <span className="animate-pulse">SYS.OP: STABLE</span>
              <span>MEM: {42 + (index * 13)}MB / SEC</span>
            </div>
            
            {/* Moving Grid System */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
              <motion.div 
                className="w-[150%] h-[150%] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:2rem_2rem]"
                animate={{ rotate: [0, 90], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              />
            </div>

            {/* Simulated UI Graphs */}
            <div className="w-full h-32 border-b border-white/10 relative overflow-hidden flex items-end">
              {Array.from({ length: 40 }).map((_, i) => {
                // Deterministic pseudo-random values based on index to prevent hydration mismatch
                const startHeight = 10 + ((i * 7) % 20);
                const endHeight = 20 + ((i * 13) % 80);
                const dur = 1 + ((i * 3) % 2);
                
                return (
                  <motion.div
                    key={i}
                    className="flex-1 bg-white/20 mx-[1px]"
                    animate={{ height: [`${startHeight}%`, `${endHeight}%`] }}
                    transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", repeatType: "reverse" }}
                  />
                );
              })}
            </div>
          </div>

          {/* Deep Shadow for 3D effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-30 pointer-events-none" />
        </motion.div>
      </FadeIn>

    </div>
  );
}
