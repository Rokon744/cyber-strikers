"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap, Users, Calendar, Radio, Newspaper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/squad", label: "Squad", icon: Users },
  { href: "/fixtures", label: "Fixtures", icon: Calendar },
  { href: "/news", label: "NEWS & GALLERY", icon: Newspaper },
  { href: "/live-score", label: "Live Score", icon: Radio },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-card/95 backdrop-blur-md border-b border-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 border border-neon/60 rotate-45 flex items-center justify-center group-hover:border-neon group-hover:shadow-[0_0_15px_rgba(0,255,231,0.5)] transition-all duration-300">
              <span className="-rotate-45 text-neon font-display font-bold text-sm">CS</span>
            </div>
            <span className="font-display font-bold text-xl text-white group-hover:text-neon transition-colors duration-300 tracking-widest">
              CYBER<span className="text-neon">STRIKERS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-display tracking-wider transition-all duration-200 ${
                    active
                      ? "text-neon"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                      style={{ boxShadow: "0 0 8px rgba(0,255,231,0.8)" }}
                    />
                  )}
                  {href === "/live-score" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-neon transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-card border-b border-dark-border overflow-hidden"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 font-display tracking-wider text-sm border ${
                      active
                        ? "border-neon/40 text-neon bg-neon/5"
                        : "border-transparent text-slate-400 hover:text-white hover:border-dark-border"
                    } transition-all duration-200`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
