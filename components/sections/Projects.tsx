"use client";

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useSpring } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { X } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

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
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Lock scroll when a project is activated
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeProject]);

  return (
    <section id="projects" className="py-32 md:py-64 relative bg-[#020202]">
      <div className="max-w-[90rem] mx-auto px-6">
        <FadeIn>
          <div className="flex items-end justify-between mb-32 border-b border-white/10 pb-12">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">Architecture <br/><span className="text-white/40">& Case Studies</span></h2>
            <p className="text-white/40 hidden md:block text-sm tracking-widest uppercase font-mono">02 Selected Works</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => setActiveProject(project.id)} 
            />
          ))}
        </div>
      </div>

      {/* Full-Screen Activation Overlay */}
      <AnimatePresence>
        {activeProject && (
          <ActiveProjectOverlay 
            project={projects.find(p => p.id === activeProject)} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const { setCursorState } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -4);
    rotateY.set(((x - centerX) / centerX) * 4);
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

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`;

  return (
    <motion.div 
      layoutId={`project-container-${project.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col gap-6 cursor-pointer group will-change-transform z-10"
      style={{ perspective: 1000 }}
    >
      <FadeIn delay={index * 0.2}>
        <motion.div 
          ref={cardRef}
          style={{ rotateX, rotateY }}
          className="relative aspect-[4/3] bg-[#050505] rounded-xl border border-white/10 overflow-hidden"
        >
          {/* Spotlight Overlay */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
            style={{ background: spotlight, opacity: isHovered ? 1 : 0 }}
          />

          <motion.div layoutId={`project-visuals-${project.id}`} className="absolute inset-0 z-10 p-8 flex flex-col justify-between opacity-40 group-hover:opacity-80 transition-opacity duration-700">
            <div className="flex justify-between text-[10px] font-mono text-white/50">
              <span className="animate-pulse">SYS.OP: STABLE</span>
              <span>MEM: {42 + (index * 13)}MB / SEC</span>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <motion.div 
                className="w-[150%] h-[150%] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:2rem_2rem]"
                animate={{ rotate: [0, 90], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-2">
          <motion.div layoutId={`project-meta-${project.id}`} className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
            <span>{project.id}</span>
            <div className="h-[1px] w-8 bg-white/20" />
            <span>{project.category}</span>
          </motion.div>
          <motion.h3 layoutId={`project-title-${project.id}`} className="text-3xl font-bold tracking-tighter group-hover:text-white/80 transition-colors">
            {project.title}
          </motion.h3>
        </div>
      </FadeIn>
    </motion.div>
  );
}

function ActiveProjectOverlay({ project, onClose }: { project: any; onClose: () => void }) {
  const { setCursorState } = useCursor();

  useEffect(() => {
    setCursorState("default");
  }, [setCursorState]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        layoutId={`project-container-${project.id}`}
        className="relative w-full h-full max-w-[90rem] bg-[#050505] rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Abstract Background Engine */}
        <motion.div layoutId={`project-visuals-${project.id}`} className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <motion.div 
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/[0.05] to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Cinematic Content Reveal */}
        <div className="relative z-10 w-full h-full overflow-y-auto p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-32 scrollbar-hide">
          
          <div className="flex-1 flex flex-col gap-6 lg:sticky top-0">
            <motion.div layoutId={`project-meta-${project.id}`} className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
              <span>{project.id}</span>
              <div className="h-[1px] w-12 bg-white/20" />
              <span>{project.category}</span>
            </motion.div>
            <motion.h3 layoutId={`project-title-${project.id}`} className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
              {project.title}
            </motion.h3>
            
            {/* Sequential Diagnostic Reveal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <h4 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Core Technology Node</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex-1 flex flex-col gap-16 text-white/60 text-lg font-light leading-relaxed">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">System Diagnostic: The Challenge</h4>
              <p>{project.challenge}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Architectural Logic</h4>
              <p>{project.architecture}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="p-8 rounded-xl bg-white/5 border border-white/10"
            >
              <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Calculated Impact</h4>
              <p className="text-white text-xl">{project.impact}</p>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
