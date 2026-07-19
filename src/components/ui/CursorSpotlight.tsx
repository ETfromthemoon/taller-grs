"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

interface CursorSpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

export default function CursorSpotlight({
  children,
  className = "",
  color = "var(--color-copper)",
  size = 600,
}: CursorSpotlightProps) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!isDesktop || prefersReduced) return;
    const handler = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setPos({ x: e.clientX, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isDesktop, prefersReduced]);

  return (
    <div className={`relative ${className}`}>
      {isDesktop && !prefersReduced && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${size}px at ${pos.x}px ${pos.y}px, ${color}10, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
