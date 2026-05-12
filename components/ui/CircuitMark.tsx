import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CircuitMarkProps {
  className?: string;
  size?: number;
}

export function CircuitMark({ className, size = 40 }: CircuitMarkProps) {
  return (
    <motion.div 
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="120" height="120" fill="transparent" rx="12"/>
        <rect x="10" y="10" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="4" rx="6"/>
        <rect x="25" y="8" width="16" height="4" fill="currentColor"/>
        <rect x="108" y="25" width="4" height="16" fill="currentColor"/>
        <rect x="85" y="108" width="16" height="4" fill="currentColor"/>
        <text x="58" y="80" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="60" fill="currentColor" letterSpacing="-4" textAnchor="middle">RN</text>
        <circle cx="102" cy="18" r="5" fill="currentColor"/>
      </svg>
    </motion.div>
  );
}
