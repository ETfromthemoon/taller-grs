"use client";

import { useState, useCallback, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleProps {
  children: ReactNode;
  className?: string;
}

export function RippleButton({ children, className = "" }: RippleProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  let nextId = 0;

  const addRipple = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  return (
    <button onClick={addRipple} className={`relative overflow-hidden ${className}`}>
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{ left: r.x - 4, top: r.y - 4, width: 8, height: 8 }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
