"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CircuitMark } from "@/components/ui/CircuitMark";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileOpen(false);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-[100] flex justify-center py-6 transition-all duration-300",
          isScrolled ? "py-4" : "py-6 md:py-8"
        )}
      >
        <nav
          className={cn(
            "flex items-center gap-4 md:gap-8 px-5 md:px-8 py-3 rounded-full transition-all duration-300",
            isScrolled ? "bg-black/40 backdrop-blur-md border border-white/10" : "bg-transparent"
          )}
        >
          <Link href="#home" data-cursor="hover" onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}>
            <CircuitMark className="text-white/50 hover:text-white transition-colors mr-1 md:mr-2" size={28} />
          </Link>

          {/* Desktop nav items */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              data-cursor="hover"
              className="hidden md:inline-block text-sm font-medium text-white/70 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
            >
              {item.name}
            </Link>
          ))}

          {/* Desktop CTA */}
          <Link
            href="#contact"
            data-cursor="hover"
            className="hidden md:inline-block text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors ml-2 md:ml-4"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
          >
            Let&apos;s Talk
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 ml-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white/80 origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white/80"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white/80 origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="text-2xl font-medium text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
            >
              <Link
                href="#contact"
                className="text-lg font-medium bg-white text-black px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
              >
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
