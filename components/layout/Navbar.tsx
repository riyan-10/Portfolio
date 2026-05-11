"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-[100] flex justify-center py-6 transition-all duration-300",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300",
          isScrolled ? "bg-black/40 backdrop-blur-md border border-white/10" : "bg-transparent"
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            data-cursor="hover"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector(item.href);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {item.name}
          </Link>
        ))}
        <Link
          href="#contact"
          data-cursor="hover"
          className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors ml-4"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector("#contact");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Let's Talk
        </Link>
      </nav>
    </motion.header>
  );
}
