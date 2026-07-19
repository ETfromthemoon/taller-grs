"use client";

import { motion } from "framer-motion";
import { Wrench, Gauge, ScanEye, Cog, Home, Car, ShieldCheck, Zap, Leaf, Fuel } from "lucide-react";
import { SERVICES, type Service } from "@/lib/data";
import { cn } from "@/components/utils";

const icons: Record<string, React.ReactNode> = {
  mant_menor: <Wrench size={18} />,
  diag: <ScanEye size={18} />,
  frenos: <Gauge size={18} />,
  mant_mayor: <ShieldCheck size={18} />,
  motor: <Cog size={18} />,
  caja: <ScanEye size={18} />,
  domicilio: <Home size={18} />,
  potencia: <Zap size={18} />,
  dpf_egr: <Leaf size={18} />,
  economia: <Fuel size={18} />,
  precompra: <Car size={18} />,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-[10px] border bg-onyx p-6 transition-all duration-300 hover:-translate-y-1",
        "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_-2px_rgba(0,0,0,0.3)]",
        service.feat
          ? "border-slate ring-1 ring-copper/10"
          : "border-graphite hover:border-slate"
      )}
    >
      {service.badge && (
        <span className="absolute right-5 top-5 rounded-full border border-copper px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-copper">
          {service.badge}
        </span>
      )}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "mb-4 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300",
          service.feat
            ? "border-none bg-copper text-[#1a0f06] shadow-[0_0_16px_-4px_rgba(204,145,102,0.4)]"
            : "border-graphite bg-carbon text-copper group-hover:border-copper/40 group-hover:shadow-[0_0_12px_-4px_rgba(204,145,102,0.2)]"
        )}
      >
        {icons[service.id] || <Wrench size={18} />}
      </motion.div>
      <h3 className="font-body text-[16px] font-medium tracking-[-0.01em] text-paper-white">
        {service.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-fog">{service.desc}</p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="relative z-10 py-28 sm:py-32">
      <div className="mx-auto max-w-[1216px] px-[--pad]">
        <motion.div
          initial={{ filter: "blur(12px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-[60ch]"
        >
          <span className="mb-3 inline-block font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-copper">
            Especialización
          </span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal leading-[1.05] text-paper-white">
            Del cambio de aceite al aumento de potencia.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog max-w-[48ch]">
            Cubrimos el ciclo completo de tu vehículo: mantención, diagnóstico
            electrónico, reparación mayor y reprogramación, con la misma mano técnica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
