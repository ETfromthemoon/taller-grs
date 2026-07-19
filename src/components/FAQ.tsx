"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-[clamp(3.5rem,8vw,10rem)] relative z-10">
      <div className="mx-auto max-w-[820px] px-[--pad]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-block text-[13px] font-semibold tracking-[-0.02em] text-copper">
            // Preguntas frecuentes
          </span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal text-paper-white">
            Antes de dejar tu auto.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-graphite">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl font-normal text-paper-white"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border ${
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
        </motion.div>
      </div>
    </section>
  );
}
