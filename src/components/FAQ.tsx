"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      id="faq"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { filter: "blur(16px)", opacity: 0 },
        visible: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="relative z-10 py-28 sm:py-32"
    >
      <div className="mx-auto max-w-[820px] px-[--pad]">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-copper">
            Preguntas
          </span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal leading-[1.05] text-paper-white">
            Antes de dejar tu auto.
          </h2>
        </div>

        <div>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-graphite">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl font-normal text-paper-white hover:text-paper-white/90 transition-colors"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border transition-colors ${
                    openIdx === i
                      ? "border-copper bg-copper text-[#1a0f06]"
                      : "border-slate text-copper"
                  }`}
                >
                  <Plus size={14} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-base leading-relaxed text-fog max-w-[62ch]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
