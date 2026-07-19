"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { waLink, GREETING } from "@/lib/data";

export default function CTAFinal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { filter: "blur(16px)", opacity: 0, scale: 1.02 },
        visible: { filter: "blur(0px)", opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="relative z-10 py-28 sm:py-32"
    >
      <div className="mx-auto max-w-[1216px] px-[--pad]">
        <div className="overflow-hidden rounded-[10px] border border-graphite bg-onyx px-6 py-16 text-center sm:px-16 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)]">
          <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal leading-[1.08] text-paper-white">
            Tu auto europeo merece manos que lo entiendan.
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-base leading-relaxed text-fog">
            Cotiza gratis con nuestro asistente o escríbenos directo. Respondemos a la brevedad.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#cotizador"
              className="inline-flex items-center gap-2 rounded-full bg-paper-white px-6 py-3 text-[15px] font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-[#f2f2f2]"
            >
              Cotizar mi servicio
              <ArrowRight size={16} />
            </a>
            <a
              href={waLink(GREETING)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-[15px] font-medium text-[#052e16] transition-all hover:-translate-y-0.5 hover:bg-[#2ee073] hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.4)]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
