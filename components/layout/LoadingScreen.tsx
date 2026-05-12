"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LetterReveal } from "@/components/animations/LetterReveal";

export function LoadingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Cinematic timeline orchestration
    // Stage 0: Initial black screen (0-1s)
    // Stage 1: Atmosphere & Initialization text (1s-2.5s)
    // Stage 2: Main typography assembly (2.5s-4.5s)
    // Stage 3: Exit transition begins (4.5s)
    
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2400);
    const t3 = setTimeout(() => setStage(3), 4800); // 4.8 seconds total intro duration
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 2.4, ease: "easeInOut" } 
          }}
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />

          {/* Deep atmospheric glow */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 0.3 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)"
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
            
            {/* Stage 1: Micro Telemetry */}
            <div className="h-8 mb-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                    transition={{ duration: 0.8 }}
                    className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-mono flex items-center gap-4"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Initializing Environment
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage 2: Main Cinematic Typography */}
            <div className="h-32 flex items-center justify-center overflow-hidden">
              <AnimatePresence>
                {stage === 2 && (
                  <motion.div 
                    className="flex flex-col items-center"
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <LetterReveal 
                      text="Riyan Nizar." 
                      className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-4" 
                    />
                    <LetterReveal 
                      text="Creative Technologist" 
                      delay={0.8} 
                      className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-white/40" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
