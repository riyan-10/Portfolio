"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LetterReveal } from "@/components/animations/LetterReveal";

export function LoadingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Cinematic timeline orchestration
    // Stage 0: Initial black screen
    // Stage 1: Initialization Telemetry
    // Stage 2: Symbolic Emergence (/R/N/)
    // Stage 3: Human Identity Reveal (Riyan Nizar)
    // Stage 4: Exit transition begins
    
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 4200); // Pause with symbolic alone
    const t4 = setTimeout(() => setStage(4), 6800); // Full identity settlement time
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <AnimatePresence>
      {stage < 4 && (
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

            {/* Typography Assembly Logic */}
            <div className="h-48 flex items-center justify-center overflow-hidden relative w-full">
              <AnimatePresence mode="wait">
                {stage === 2 && (
                  <motion.div 
                    key="stage2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -30, filter: "blur(15px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center absolute"
                  >
                    <div className="flex items-end justify-center">
                      <LetterReveal text="R" className="text-7xl md:text-9xl font-bold text-white leading-[0.8]" />
                      <motion.span 
                        initial={{ opacity: 0, scaleY: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scaleY: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-light text-white/50 mx-2 md:mx-4 font-mono leading-[0.9] origin-bottom"
                      >
                        /
                      </motion.span>
                      <LetterReveal text="N" delay={0.4} className="text-7xl md:text-9xl font-bold text-white leading-[0.8]" />
                    </div>
                  </motion.div>
                )}

                {stage === 3 && (
                  <motion.div 
                    key="stage3"
                    initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center absolute"
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
