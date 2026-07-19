"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const creds = [
  { title: "Mecánico universitario titulado", desc: "Formación en la UFSM, no empírica. Diagnóstico con criterio de ingeniería." },
  { title: "Especialistas en línea VAG", desc: "VW, Audi, Skoda y Seat con scanner original. También multimarca con Launch." },
  { title: "Presupuesto antes de reparar", desc: "Sabés cuánto y por qué antes de aprobar. Cero costos ocultos." },
  { title: "Servicio y rescate a domicilio", desc: "Mecánico donde estés, en la V Región." },
];

export default function About() {
  return (
    <section id="nosotros" className="py-[clamp(3.5rem,8vw,10rem)] relative z-10">
      <div className="mx-auto grid max-w-[1216px] grid-cols-1 items-center gap-10 px-[--pad] lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-4 inline-block text-[13px] font-semibold tracking-[-0.02em] text-copper">
            // Quiénes somos
          </span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal text-paper-white">
            GRS: 20 años de mano técnica, no de improvisación.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fog max-w-[52ch]">
            Empezamos especializados en autos europeos y, a pedido de nuestros
            clientes, ampliamos a multimarca. Detrás de cada reparación hay un
            mecánico titulado de la USM y el compromiso de prevenir el problema
            antes de que aparezca.
          </p>
          <p className="mt-3 text-base leading-relaxed text-fog max-w-[52ch]">
            Autos particulares, flotas de empresa y maquinaria agroindustrial: si
            tiene motor, lo atendemos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[10px] border border-graphite bg-onyx px-8 py-4"
        >
          {creds.map((c, i) => (
            <div
              key={i}
              className={`flex gap-4 items-start py-4 ${
                i < creds.length - 1 ? "border-b border-graphite" : ""
              }`}
            >
              <span className="mt-0.5 flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border border-ok text-ok">
                <Check size={14} />
              </span>
              <div>
                <b className="font-body text-[15px] font-semibold text-paper-white">{c.title}</b>
                <p className="mt-1 text-[14px] text-fog">{c.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
