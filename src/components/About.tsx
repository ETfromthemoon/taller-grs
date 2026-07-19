"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

const creds = [
  { title: "Mecánico universitario titulado", desc: "Formación en la UFSM, no empírica. Diagnóstico con criterio de ingeniería." },
  { title: "Especialistas en línea VAG", desc: "VW, Audi, Skoda y Seat con scanner original. También multimarca con Launch." },
  { title: "Presupuesto antes de reparar", desc: "Sabés cuánto y por qué antes de aprobar. Cero costos ocultos." },
  { title: "Servicio y rescate a domicilio", desc: "Mecánico donde estés, en la V Región." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      id="nosotros"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { filter: "blur(16px)", opacity: 0 },
        visible: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="relative z-10 py-28 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1216px] grid-cols-1 items-center gap-12 px-[--pad] lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="mb-3 inline-block font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-copper">
            Trayectoria
          </span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal leading-[1.05] text-paper-white">
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
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[10px] border border-graphite bg-onyx px-8 py-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)]"
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
                <p className="mt-1 text-[14px] leading-relaxed text-fog">{c.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
