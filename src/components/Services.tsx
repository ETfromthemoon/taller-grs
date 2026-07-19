"use client";

import { motion } from "framer-motion";
import { Wrench, Gauge, ScanEye, Cog, Home, Car, ShieldCheck, Zap, Leaf, Fuel, Tractor } from "lucide-react";
import { SERVICES, type Service } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  mant_menor: <Wrench size={20} />,
  diag: <ScanEye size={20} />,
  frenos: <Gauge size={20} />,
  mant_mayor: <ShieldCheck size={20} />,
  motor: <Cog size={20} />,
  caja: <ScanEye size={20} />,
  domicilio: <Home size={20} />,
  potencia: <Zap size={20} />,
  dpf_egr: <Leaf size={20} />,
  economia: <Fuel size={20} />,
  precompra: <Car size={20} />,
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={`group relative rounded-[10px] border bg-onyx p-6 transition-colors hover:border-slate ${
        service.feat ? "border-slate" : "border-graphite"
      }`}
    >
      {service.badge && (
        <span className="absolute right-5 top-5 rounded-full border border-copper px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-copper">
          {service.badge}
        </span>
      )}
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border ${
          service.feat
            ? "border-none bg-copper text-[#1a0f06]"
            : "border-graphite bg-carbon text-copper"
        }`}
      >
        {icons[service.id] || <Wrench size={20} />}
      </div>
      <h3 className="font-body text-[17px] font-medium tracking-[-0.01em] text-paper-white">
        {service.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-fog">{service.desc}</p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-[clamp(3.5rem,8vw,10rem)] relative z-10">
      <div className="mx-auto max-w-[1216px] px-[--pad]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-[60ch]"
        >
          <span className="mb-4 inline-block text-[13px] font-semibold tracking-[-0.02em] text-copper">
            // Lo que hacemos
          </span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal text-paper-white">
            Del cambio de aceite al aumento de potencia.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fog">
            Cubrimos el ciclo completo de tu vehículo: mantención, diagnóstico
            electrónico, reparación mayor y reprogramación.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
