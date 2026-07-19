"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { waLink, GREETING } from "@/lib/data";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#cotizador", label: "Cotizador IA" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-graphite bg-obsidian/90 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1216px] items-center justify-between gap-4 px-[--pad] py-3.5">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl text-paper-white tracking-display font-medium">
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-paper-white text-sm font-bold tracking-tight text-black font-body">
            GRS
          </span>
          <span>
            Taller GRS
            <small className="block font-body text-[10px] text-ash tracking-[0.1em] font-normal">
              MECÁNICA EUROPEA · VIÑA DEL MAR
            </small>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] font-medium text-fog transition-colors hover:text-paper-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href="#cotizador"
            className="inline-flex items-center gap-2 rounded-full border border-paper-white px-5 py-2.5 text-[13.5px] font-medium text-paper-white transition-all hover:bg-white/6 hover:-translate-y-0.5"
          >
            Cotizar ahora
          </a>
          <a
            href={waLink(GREETING)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-paper-white px-5 py-2.5 text-[13.5px] font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-[#f2f2f2]"
          >
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-full border border-graphite p-2 text-fog lg:hidden"
          aria-label="Menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-graphite bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-[1216px] flex-col gap-1 px-[--pad] py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-fog transition-colors hover:bg-carbon hover:text-paper-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2.5">
                <a
                  href="#cotizador"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border border-paper-white py-2.5 text-center text-[13px] font-medium text-paper-white"
                >
                  Cotizar ahora
                </a>
                <a
                  href={waLink(GREETING)}
                  target="_blank"
                  rel="noopener"
                  className="flex-1 rounded-full bg-paper-white py-2.5 text-center text-[13px] font-medium text-black"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
