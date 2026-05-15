"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useSpring, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { X } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const flagshipProject = {
  id: "SYS-00",
  title: "TechTrolley Ecosystem",
  category: "Operational Infrastructure",
  challenge: "AV rental companies suffer from chaotic logistics, losing thousands in untracked assets and disjointed scheduling systems.",
  architecture: "Engineered a centralized, cloud-connected platform featuring real-time QR-based asset tracking, dynamic challan generation, and role-based human resource management.",
  impact: "Automated business-critical workflows, drastically reducing asset loss and scaling operational efficiency across massive equipment inventories.",
  tech: ["React Ecosystem", "Node.js Architecture", "Real-time QR Sync", "Role-Based Auth"],
  image: "/projects/techtrolley.png"
};

const projects = [
  {
    id: "01",
    title: "AM Desk Portal",
    category: "Fullstack Architecture",
    challenge: "Developing a highly responsive, heavy-data administrative portal without sacrificing UI fluidness or increasing render blocking.",
    architecture: "Engineered a robust React architecture paired with a customized Node backend, focusing on aggressive state optimization and seamless layout rendering.",
    impact: "Delivered a zero-latency administrative experience capable of scaling with extreme data loads.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/projects/amdesk.png"
  },
  {
    id: "02",
    title: "Lexon Commerce",
    category: "E-Commerce System",
    challenge: "Modern e-commerce platforms often suffer from layout shifts and sluggish cart state management during high traffic.",
    architecture: "Built a fully decoupled frontend client using advanced caching strategies and seamless layout transitions for cart operations.",
    impact: "Resulted in a 40% reduction in bounce rate and an exceptionally smooth transaction flow.",
    tech: ["Next.js", "Tailwind", "Redux", "Stripe"],
    image: "/projects/lexon.png"
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic Environmental Response
  const { scrollYProgress: sectionScrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const envOpacity = useTransform(sectionScrollY, [0, 0.2, 0.8, 1], [0.05, 0.3, 0.3, 0.05]);

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

  const allProjects = [flagshipProject, ...projects];

  return (
    <section id="projects" ref={containerRef} className="py-20 md:py-32 relative bg-[#020202] overflow-hidden">
      {/* Scroll-Responsive Environment Grid */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: envOpacity }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-white/[0.015] rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6">
        <FadeIn>
          <div className="flex items-end justify-between mb-12 md:mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">Architecture <br/><span className="text-white/40">& Engineered Systems</span></h2>
            <p className="text-white/40 hidden md:block text-sm tracking-widest uppercase font-mono">Business-Critical Infrastructure</p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-10 md:gap-16">
          
          {/* FLAGSHIP SHOWCASE: TechTrolley */}
          <ProjectCard 
            project={flagshipProject} 
            index={0} 
            onClick={() => setActiveProject(flagshipProject.id)} 
            isFlagship={true}
          />

          {/* Standard Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-8 pt-8 md:mt-12 md:pt-12 border-t border-white/5">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index + 1} 
                onClick={() => setActiveProject(project.id)} 
                isFlagship={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Activation Overlay */}
      <AnimatePresence>
        {activeProject && (
          <ActiveProjectOverlay 
            project={allProjects.find(p => p.id === activeProject)} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick, isFlagship = false }: { project: any; index: number; onClick: () => void; isFlagship?: boolean }) {
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
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col gap-4 md:gap-6 cursor-pointer group will-change-transform z-10 w-full"
      style={{ perspective: 1000 }}
    >
      <FadeIn delay={index * 0.2}>
        <motion.div 
          ref={cardRef}
          style={{ rotateX, rotateY }}
          className={`relative bg-[#050505] rounded-xl border border-white/10 overflow-hidden ${isFlagship ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'}`}
        >
          {/* Spotlight Overlay */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
            style={{ background: spotlight, opacity: isHovered ? 1 : 0 }}
          />

          <div className="absolute inset-0 z-10 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-10" />
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover object-top opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20 opacity-90" />
            
            <div className="absolute inset-0 z-30 p-4 md:p-8 flex flex-col justify-between opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none">
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span className="animate-pulse">SYS.OP: {isFlagship ? "FLAGSHIP" : "STABLE"}</span>
                <span>MEM: {42 + (index * 13)}MB / SEC</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 md:mt-6 flex flex-col gap-1.5">
          <div className="flex items-center gap-3 md:gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
            <span>{project.id}</span>
            <div className="h-[1px] w-6 md:w-8 bg-white/20" />
            <span className={isFlagship ? "text-white/80 font-bold" : ""}>{project.category}</span>
          </div>
          <h3 className={`${isFlagship ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-3xl'} font-bold tracking-tighter group-hover:text-white/80 transition-colors`}>
            {project.title}
          </h3>
        </div>
      </FadeIn>
    </motion.div>
  );
}

function ActiveProjectOverlay({ project, onClose }: { project: any; onClose: () => void }) {
  const { setCursorState } = useCursor();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCursorState("default");
  }, [setCursorState]);

  // Hook into the scroll position of the overlay to drive cinematic background physics
  const { scrollYProgress } = useScroll({ container: scrollRef });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.05]);

  // Smooth transition easing
  const smoothEase = [0.32, 0.72, 0, 1] as const;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-[100000] overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-[#050505]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: smoothEase }}
      >
        <motion.div 
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity }} 
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            priority
            className="object-cover object-top grayscale contrast-125 mix-blend-luminosity"
          />
        </motion.div>
        
        {/* Atmospheric depth */}
        <div className="absolute inset-0 bg-[#050505]/60 z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-40" />
      </motion.div>

      {/* Content Interface */}
      <div className="absolute inset-0 z-[110000] w-full h-full overflow-hidden flex flex-col">
        {/* Close Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: smoothEase }}
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 md:p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>

        {/* Scrollable Content */}
        <motion.div 
          ref={scrollRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: smoothEase }}
          className="relative z-10 w-full h-full overflow-y-auto p-6 pt-20 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-32 scrollbar-hide"
        >
          
          {/* Left: Title & Tech */}
          <motion.div 
            className="flex-1 flex flex-col gap-4 md:gap-6 lg:sticky top-0 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: smoothEase }}
          >
            <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
              <span>{project.id}</span>
              <div className="h-[1px] w-12 bg-white/20" />
              <span>{project.category}</span>
            </div>
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-8">
              {project.title}
            </h3>
            
            <div className="mt-4 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
              <h4 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-3 md:mb-4">Core Technology Node</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div 
            className="flex-1 flex flex-col gap-10 md:gap-16 text-white/60 text-base md:text-lg font-light leading-relaxed pb-16 md:pb-32"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: smoothEase }}
          >
            <div>
              <h4 className="text-white font-medium mb-4 md:mb-6 uppercase tracking-widest text-xs">System Diagnostic: The Challenge</h4>
              <p>{project.challenge}</p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4 md:mb-6 uppercase tracking-widest text-xs">Architectural Logic</h4>
              <p>{project.architecture}</p>
            </div>
            
            <div className="p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-white font-medium mb-4 md:mb-6 uppercase tracking-widest text-xs">Calculated Impact</h4>
              <p className="text-white text-lg md:text-xl">{project.impact}</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
