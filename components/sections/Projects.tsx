"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Quantum Interface",
    category: "Web Application",
    description: "A high-performance dashboard for monitoring embedded systems metrics in real-time, bridging hardware data with sleek web UI.",
    tech: ["Next.js", "WebGL", "WebSockets"],
  },
  {
    id: "02",
    title: "Aura Architecture",
    category: "Interactive Design",
    description: "An exploratory architectural portfolio using advanced scroll hijacking and GLSL shaders to render cinematic lighting models.",
    tech: ["React", "Three.js", "GSAP"],
  },
  {
    id: "03",
    title: "Nexus Core",
    category: "System Engineering",
    description: "A full-stack headless e-commerce solution engineered for sub-100ms response times and massive scale.",
    tech: ["Node.js", "PostgreSQL", "Redis"],
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-32 md:py-48 px-6 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Selected Work</h2>
            <p className="text-white/40 hidden md:block">2023 — Present</p>
          </div>
        </FadeIn>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={cardRef} className="group relative flex flex-col md:flex-row gap-12 md:gap-24 items-center">
      {/* Project Info */}
      <div className="flex-1 w-full order-2 md:order-1">
        <FadeIn>
          <div className="text-white/40 font-mono text-sm mb-6">{project.id} — {project.category}</div>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">{project.title}</h3>
          <p className="text-white/60 text-lg font-light mb-8 max-w-md">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((t: string) => (
              <span key={t} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/70">
                {t}
              </span>
            ))}
          </div>

          <button 
            data-cursor="hover"
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-white/70 transition-colors"
          >
            View Case Study <ArrowUpRight className="w-4 h-4" />
          </button>
        </FadeIn>
      </div>

      {/* Parallax Image Placeholder */}
      <div className="flex-1 w-full aspect-[4/3] order-1 md:order-2 overflow-hidden rounded-sm bg-white/5 relative border border-white/10">
        <motion.div 
          style={{ y: imageY }}
          className="absolute inset-0 -top-[20%] -bottom-[20%] bg-white/5"
        >
          {/* We use a procedural grid to look techy instead of a generic image placeholder */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}
