"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="relative pt-32 pb-8 px-6 bg-black min-h-screen flex flex-col justify-between">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/[0.02] blur-[150px] rounded-t-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        <FadeIn>
          <p className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12 font-medium">
            Next Steps
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-6xl md:text-[12vw] leading-[0.85] font-bold tracking-tighter mb-12">
            Let's build <br />
            <span className="text-white/40">the future.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <a
            href="mailto:hello@example.com"
            data-cursor="hover"
            className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-light hover:text-white/70 transition-colors"
          >
            hello@example.com
            <span className="p-4 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight className="w-6 h-6" />
            </span>
          </a>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 mt-32 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <div className="flex gap-8">
          <Link href="#" data-cursor="hover" className="hover:text-white transition-colors">Twitter // X</Link>
          <Link href="#" data-cursor="hover" className="hover:text-white transition-colors">LinkedIn</Link>
          <Link href="#" data-cursor="hover" className="hover:text-white transition-colors">GitHub</Link>
        </div>
        <p>© {new Date().getFullYear()} Riyan. All rights reserved.</p>
      </div>
    </section>
  );
}
