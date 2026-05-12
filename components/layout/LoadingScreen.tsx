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

            {/* Persistent Cinematic Identity Continuum Engine */}
            <div className="h-48 flex items-center justify-center relative w-full">
              {stage >= 2 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, filter: "blur(15px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  className="flex flex-col items-center relative"
                >
                  <div className="flex items-baseline justify-center tracking-tight text-white">
                    
                    {/* Word 1: R -> Riyan (Physical Anchor) */}
                    <div className="flex items-baseline">
                      <motion.span 
                        animate={{ 
                          scale: stage === 2 ? 1.4 : 1,
                          x: stage === 2 ? 10 : 0 // subtle centering weight
                        }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-bold leading-none text-5xl md:text-7xl origin-bottom-right"
                      >
                        R
                      </motion.span>
                      
                      <motion.span
                        initial={{ width: 0, opacity: 0, filter: "blur(8px)", x: -20 }}
                        animate={{ 
                          width: stage === 3 ? "auto" : 0, 
                          opacity: stage === 3 ? 1 : 0,
                          filter: stage === 3 ? "blur(0px)" : "blur(8px)",
                          x: stage === 3 ? 0 : -20
                        }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        className="font-bold text-5xl md:text-7xl overflow-hidden whitespace-nowrap origin-left"
                      >
                        iyan
                      </motion.span>
                    </div>

                    {/* Organic Environmental Splice: / -> Space */}
                    <motion.span 
                      initial={{ opacity: 0, scaleY: 0, width: 0 }}
                      animate={{ 
                        opacity: stage === 2 ? 1 : 0,
                        scaleY: stage === 2 ? 1 : 0,
                        width: stage === 2 ? "auto" : 16, // transforms into normal spacer margin
                        margin: stage === 2 ? "0 16px" : "0"
                      }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="text-6xl md:text-8xl font-light text-white/40 font-mono leading-none origin-center flex items-center justify-center overflow-hidden"
                    >
                      /
                    </motion.span>

                    {/* Word 2: N -> Nizar (Physical Anchor) */}
                    <div className="flex items-baseline">
                      <motion.span 
                        animate={{ 
                          scale: stage === 2 ? 1.4 : 1,
                          x: stage === 2 ? -10 : 0
                        }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-bold leading-none text-5xl md:text-7xl origin-bottom-left"
                      >
                        N
                      </motion.span>
                      
                      <motion.span
                        initial={{ width: 0, opacity: 0, filter: "blur(8px)", x: -20 }}
                        animate={{ 
                          width: stage === 3 ? "auto" : 0, 
                          opacity: stage === 3 ? 1 : 0,
                          filter: stage === 3 ? "blur(0px)" : "blur(8px)",
                          x: stage === 3 ? 0 : -20
                        }}
                        transition={{ duration: 1.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="font-bold text-5xl md:text-7xl overflow-hidden whitespace-nowrap origin-left"
                      >
                        izar.
                      </motion.span>
                    </div>
                  </div>

                  {/* Anchored Tagline Reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: stage === 3 ? 1 : 0, 
                      y: stage === 3 ? 0 : 10,
                      filter: stage === 3 ? "blur(0px)" : "blur(4px)"
                    }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="mt-8 text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-white/30 pointer-events-none"
                  >
                    Creative Technologist
                  </motion.div>
                </motion.div>
              )}
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
