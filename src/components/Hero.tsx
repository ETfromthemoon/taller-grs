"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GREETING, waLink } from "@/lib/data";

function AnimatedCounter({
  target,
  prefix,
  suffix,
  label,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / 1400);
            setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={nodeRef} className="flex flex-col">
      <b className="font-display text-[28px] font-normal leading-none text-paper-white">
        {prefix}
        {count}
        {suffix}
      </b>
      <span className="mt-1.5 max-w-[18ch] text-[13px] text-fog">{label}</span>
    </div>
  );
}

function DiagnosticoPanel() {
  const [barsAnimated, setBarsAnimated] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={panelRef}
      style={{ y: panelY }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[10px] border border-graphite bg-onyx p-6 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.04em] text-fog">
          // SCANNER VAG-COM · ECU LIVE
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] text-ok">
          <span className="inline-block h-1.5 w-1.5 animate-[pulse_1.6s_infinite] rounded-full bg-ok" />
          EN LÍNEA
        </span>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2.5">
        {[
          { val: 92, unit: "°C", label: "Motor", hot: true },
          { val: 14, unit: "v", label: "Batería" },
          { val: 38, unit: "psi", label: "Presión" },
        ].map((g, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            className="rounded-[10px] border border-graphite bg-carbon px-3 py-3 text-center"
          >
            <div
              className={`font-display text-[22px] tabular-nums ${
                g.hot ? "text-copper" : "text-paper-white"
              }`}
            >
              {barsAnimated ? g.val : 0}
              <span className="font-body text-[10px] text-fog">{g.unit}</span>
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.06em] text-fog">
              {g.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {[
          { name: "Inyección", pct: 94 },
          { name: "Frenos", pct: 88 },
          { name: "Suspensión", pct: 76 },
          { name: "Emisiones", pct: 97 },
        ].map((bar, i) => (
          <div key={i} className="grid grid-cols-[88px_1fr_auto] items-center gap-2.5 text-[11.5px]">
            <span className="text-fog">{bar.name}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-graphite">
              <motion.span
                className="block h-full rounded-full"
                style={{
                  width: barsAnimated ? `${bar.pct}%` : "0%",
                  background:
                    "linear-gradient(103deg, rgb(174,147,87), rgb(255,240,204) 40%, rgb(174,147,87) 70%, rgba(189,157,79,0))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: barsAnimated ? `${bar.pct}%` : "0%" }}
                transition={{ duration: 1.3, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            <span className="tabular-nums text-silver">{bar.pct}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative pt-[clamp(6rem,10vw,8rem)] pb-[clamp(3rem,6vw,6rem)]"
    >
      <div className="mx-auto grid max-w-[1216px] grid-cols-1 items-center gap-10 px-[--pad] lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate bg-transparent px-3 py-1.5 text-[13px] text-fog"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            Agenda abierta · Lun a Vie 8:30–18:00
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.6rem,5vw,4.75rem)] font-normal leading-[1.05] tracking-[0.01em] text-paper-white"
          >
            La precisión de un{" "}
            <span className="text-copper">mecánico universitario</span> para tu
            auto europeo.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[36ch] text-lg leading-relaxed text-silver"
          >
            20 años reparando VW, Audi, Porsche, Skoda y Seat en Viña del Mar.
            Diagnóstico con scanner original, repuestos de calidad y una
            cotización clara antes de tocar tu motor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3.5"
          >
            <a
              href="#cotizador"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-paper-white px-6 py-3 text-[15px] font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-[#f2f2f2]"
            >
              Cotizar con IA en 30 seg
              <ArrowRight size={16} />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-full border border-paper-white px-6 py-3 text-[15px] font-medium text-paper-white transition-all hover:-translate-y-0.5 hover:bg-white/6"
            >
              Ver servicios
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-graphite pt-8"
          >
            <AnimatedCounter target={20} label="años de experiencia comprobable" />
            <div className="flex flex-col">
              <b className="font-display text-[28px] font-normal leading-none text-paper-white">
                UFSM
              </b>
              <span className="mt-1.5 max-w-[18ch] text-[13px] text-fog">
                mecánico titulado, U. Federico Santa María
              </span>
            </div>
            <AnimatedCounter target={8} prefix="+" label="marcas europeas y multimarca" />
          </motion.div>
        </div>

        <DiagnosticoPanel />
      </div>
    </section>
  );
}
