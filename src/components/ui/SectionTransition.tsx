"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";

type SectionVariant = "blur" | "fade" | "slideUp" | "curtainTop";

interface SectionTransitionProps {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
}

const variants: Record<SectionVariant, Variants> = {
  blur: {
    hidden: { filter: "blur(20px)", opacity: 0, scale: 1.02 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  },
  curtainTop: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  },
};

export default function SectionTransition({
  children,
  variant = "blur",
  className = "",
  id,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.section>
  );
}
