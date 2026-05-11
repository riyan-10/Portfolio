"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cinematic timing: starts fast, slows down at the end for suspense
    const duration = 2800;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Custom easing curve simulation
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };
      
      const rawProgress = currentStep / steps;
      const easedProgress = Math.min(Math.round(easeOutExpo(rawProgress) * 100), 100);
      
      setProgress(easedProgress);

      if (currentStep >= steps || easedProgress === 100) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 800); // Suspense pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

          <div className="relative flex flex-col items-center z-10 w-full max-w-sm px-6">
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="text-xs uppercase tracking-[0.4em] text-white/40 font-mono"
              >
                System Initialization
              </motion.div>
            </div>

            <div className="relative w-full flex justify-between items-end mb-4">
              <motion.span 
                className="text-5xl md:text-7xl font-light tracking-tighter tabular-nums"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5 }}
              >
                {progress}
              </motion.span>
              <span className="text-xl md:text-2xl text-white/30 mb-2">%</span>
            </div>

            {/* Precision progress bar */}
            <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              {/* Glitch highlight traversing the bar */}
              <motion.div 
                className="absolute top-0 bottom-0 w-12 bg-white/50 blur-[2px]"
                animate={{
                  left: ["-10%", "110%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
