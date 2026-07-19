"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { waLink, GREETING } from "@/lib/data";

export default function CTAFinal() {
  return (
    <section className="py-[clamp(3.5rem,8vw,10rem)] relative z-10">
      <div className="mx-auto max-w-[1216px] px-[--pad]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[10px] border border-graphite bg-onyx px-6 py-16 text-center sm:px-16"
        >
          <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal text-paper-white">
            Tu auto europeo merece manos que lo entiendan.
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-lg text-fog">
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
              className="inline-flex items-center gap-2 rounded-full bg-[--wa-green] px-6 py-3 text-[15px] font-medium text-[#052e16] transition-all hover:-translate-y-0.5 hover:bg-[--wa-green-hover]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
