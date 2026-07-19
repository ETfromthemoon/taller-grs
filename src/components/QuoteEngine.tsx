"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Copy, Send, RotateCcw, Check, Clock, ChevronDown } from "lucide-react";
import {
  SERVICES,
  BRAND_MULT,
  SYMPTOMS,
  CLP,
  waLink,
} from "@/lib/data";
import { computeQuote, aiMessage, formatQuoteText, type QuoteInput, type QuoteResult } from "@/lib/quote-engine";

const DEMOS = [
  { marca: "Audi", modelo: "A4 2.0 TFSI", anio: "2018", km: "85000", servicioId: "frenos", detalle: "Vibración al frenar sobre 80 km/h. Además quiero revisión general porque viajo al sur en dos semanas." },
  { marca: "Volkswagen", modelo: "Golf GTI Mk7", anio: "2016", km: "132000", servicioId: "mant_mayor", detalle: "Nunca le hice la distribución. Quiero dejarlo al día." },
  { marca: "Porsche", modelo: "Cayenne S", anio: "2014", km: "96000", servicioId: "diag", detalle: "Se encendió el testigo del motor y perdió respuesta." },
  { marca: "Skoda", modelo: "Octavia RS TDI", anio: "2019", km: "70000", servicioId: "dpf_egr", detalle: "Bota humo negro en ciudad y quiero optimizar el DPF." },
  { marca: "Seat", modelo: "León Cupra", anio: "2020", km: "48000", servicioId: "potencia", detalle: "Busco más torque para uso mixto, sin comprometer la mecánica." },
];

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 max-w-[60ch]"
    >
      <span className="mb-4 inline-block text-[13px] font-semibold tracking-[-0.02em] text-copper">
        // Asistente de cotización
      </span>
      <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-normal text-paper-white">
        Cuéntale a nuestro asistente qué necesita tu auto.
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-fog">
        Ingresa los datos de tu vehículo y el servicio. El asistente inteligente
        de GRS estima repuestos, mano de obra y tiempo, y te arma la cotización
        lista para enviar por WhatsApp.
      </p>
    </motion.div>
  );
}

export default function QuoteEngine() {
  const [marca, setMarca] = useState("Audi");
  const [modelo, setModelo] = useState("A4 2.0 TFSI");
  const [anio, setAnio] = useState("2018");
  const [km, setKm] = useState("85000");
  const [servicioId, setServicioId] = useState("frenos");
  const [detalle, setDetalle] = useState("Vibración al frenar sobre 80 km/h. Además quiero revisión general porque viajo al sur en dos semanas.");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [thinking, setThinking] = useState(false);
  const [thinkStep, setThinkStep] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const quoteRef = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    setThinking(true);
    setQuote(null);
    setThinkStep(0);

    const inp: QuoteInput = { marca, modelo, anio, km, servicioId, detalle };
    const q = computeQuote(inp);

    const steps = [
      "Leyendo ficha del vehículo…",
      "Cruzando síntomas con historial de fallas…",
      "Estimando repuestos y disponibilidad…",
      "Calculando mano de obra y tiempo en taller…",
      "Redactando tu cotización…",
    ];

    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setThinkStep(i + 1);
        i++;
        setTimeout(tick, 260);
      } else {
        setTimeout(() => {
          setThinking(false);
          setQuote(q);
          quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 240);
      }
    };
    tick();
  }, [marca, modelo, anio, km, servicioId, detalle]);

  useEffect(() => {
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSymptomClick = (symptom: { t: string; s: string }) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom.t)
        ? prev.filter((x) => x !== symptom.t)
        : [...prev, symptom.t]
    );
    setServicioId(symptom.s);
  };

  const loadDemo = () => {
    const idx = DEMOS.findIndex((d) => d.marca === marca && d.servicioId === servicioId);
    const next = DEMOS[(idx + 1) % DEMOS.length];
    setMarca(next.marca);
    setModelo(next.modelo);
    setAnio(next.anio);
    setKm(next.km);
    setServicioId(next.servicioId);
    setDetalle(next.detalle);
    setSelectedSymptoms([]);
    setTimeout(run, 100);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const handleSend = () => {
    if (!quote) return;
    const inp: QuoteInput = { marca, modelo, anio, km, servicioId, detalle };
    const text = formatQuoteText(inp, quote);
    window.open(waLink(text), "_blank", "noopener");
    showToast("Abriendo WhatsApp con tu cotización lista…");
  };

  const handleCopy = async () => {
    if (!quote) return;
    const inp: QuoteInput = { marca, modelo, anio, km, servicioId, detalle };
    try {
      await navigator.clipboard.writeText(formatQuoteText(inp, quote));
      showToast("Cotización copiada al portapapeles");
    } catch {
      showToast("No se pudo copiar en este entorno");
    }
  };

  const inp: QuoteInput = { marca, modelo, anio, km, servicioId, detalle };

  return (
    <section id="cotizador" className="py-[clamp(3.5rem,8vw,10rem)] relative z-10">
      <div className="mx-auto max-w-[1216px] px-[--pad]">
        <SectionHeader />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[10px] border border-graphite bg-onyx"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
            {/* FORM */}
            <div className="border-b border-graphite p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <h3 className="font-display text-[clamp(1.5rem,2vw,1.75rem)] font-normal text-paper-white">
                Tu vehículo
              </h3>
              <p className="mt-2 text-[15px] text-fog">
                Datos de prueba precargados. Edita lo que quieras.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3.5">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ash">
                    Marca
                  </label>
                  <select
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="w-full rounded-full border border-graphite bg-carbon px-4 py-3 text-[15px] text-bone transition-colors focus:border-copper focus:outline-none appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239194a1' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.4rem",
                    }}
                  >
                    {Object.keys(BRAND_MULT).map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ash">
                    Modelo
                  </label>
                  <input
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Ej: A4 2.0 TFSI"
                    className="w-full rounded-full border border-graphite bg-carbon px-4 py-3 text-[15px] text-bone placeholder:text-ash transition-colors focus:border-copper focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3.5">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ash">
                    Año
                  </label>
                  <select
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                    className="w-full rounded-full border border-graphite bg-carbon px-4 py-3 text-[15px] text-bone transition-colors focus:border-copper focus:outline-none appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239194a1' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.4rem",
                    }}
                  >
                    {Array.from({ length: new Date().getFullYear() - 1997 }, (_, i) => new Date().getFullYear() - i).map(
                      (y) => (
                        <option key={y} value={y}>{y}</option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ash">
                    Kilometraje
                  </label>
                  <input
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    inputMode="numeric"
                    placeholder="Ej: 85000"
                    className="w-full rounded-full border border-graphite bg-carbon px-4 py-3 text-[15px] text-bone placeholder:text-ash transition-colors focus:border-copper focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ash">
                  Servicio principal
                </label>
                <select
                  value={servicioId}
                  onChange={(e) => setServicioId(e.target.value)}
                  className="w-full rounded-full border border-graphite bg-carbon px-4 py-3 text-[15px] text-bone transition-colors focus:border-copper focus:outline-none appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239194a1' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.4rem",
                  }}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ash">
                  Síntomas o extras
                </label>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS.map((sym) => (
                    <button
                      key={sym.t}
                      type="button"
                      onClick={() => handleSymptomClick(sym)}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-all ${
                        selectedSymptoms.includes(sym.t)
                          ? "border-copper bg-copper font-semibold text-[#1a0f06]"
                          : "border-slate bg-transparent text-fog hover:border-copper hover:text-bone"
                      }`}
                    >
                      {sym.t}
                    </button>
                  ))}
                </div>
                <textarea
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                  placeholder="Describe lo que notas en tu vehículo…"
                  rows={3}
                  className="mt-3 w-full rounded-2xl border border-graphite bg-carbon px-4 py-3 text-[15px] text-bone placeholder:text-ash transition-colors focus:border-copper focus:outline-none resize-y min-h-[76px]"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={run}
                  disabled={thinking}
                  className="inline-flex items-center gap-2 rounded-full bg-paper-white px-6 py-3 text-[14px] font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-[#f2f2f2] disabled:opacity-60"
                >
                  <Brain size={16} />
                  {thinking ? "Analizando…" : "Generar cotización"}
                </button>
                <button
                  onClick={loadDemo}
                  className="text-[14px] text-copper underline underline-offset-[3px] transition-colors hover:text-paper-white"
                >
                  <RotateCcw size={14} className="inline mr-1" />
                  Cargar otro caso de prueba
                </button>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="p-6 sm:p-8 relative">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper text-[#1a0f06]">
                  <Brain size={18} />
                </div>
                <div>
                  <b className="block font-display text-lg font-normal text-paper-white">Asistente GRS</b>
                  <span className="text-[10px] font-semibold tracking-[0.05em] text-copper">MOTOR DE COTIZACIÓN · IA</span>
                </div>
              </div>

              {!thinking && !quote && (
                <div className="flex min-h-[340px] flex-col items-center justify-center gap-4 text-center text-ash">
                  <Brain size={48} className="text-graphite" />
                  <p className="max-w-[30ch] text-[14px]">
                    Completá los datos y presioná <b>Generar cotización</b>. Tu estimación aparece aquí en segundos.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[340px] flex-col justify-center gap-3"
                  >
                    {[
                      "Leyendo ficha del vehículo…",
                      "Cruzando síntomas con historial de fallas…",
                      "Estimando repuestos y disponibilidad…",
                      "Calculando mano de obra y tiempo en taller…",
                      "Redactando tu cotización…",
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.3, x: -6 }}
                        animate={{
                          opacity: thinkStep > i ? 1 : 0.3,
                          x: thinkStep > i ? 0 : -6,
                          color: thinkStep > i ? "var(--color-silver)" : "var(--color-ash)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2.5 text-[14px]"
                      >
                        <span className={`w-4 text-copper flex-none ${thinkStep > i ? "text-ok" : ""}`}>▸</span>
                        {step}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {quote && !thinking && (() => {
                  const v = `${marca} ${modelo} · ${anio}`.trim();
                  const rangeTxt = Math.abs(quote.hi - quote.lo) < 1000 ? CLP(quote.lo) : `${CLP(quote.lo)} — ${CLP(quote.hi)}`;
                  return (
                    <motion.div
                      ref={quoteRef}
                      key="quote"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="text-[11px] font-semibold tracking-[0.04em] text-copper mb-3">
                        ▸ {v.toUpperCase()} · {Number(quote.km).toLocaleString("es-CL")} KM
                      </div>
                      <div
                        className="rounded-[10px] border border-graphite bg-carbon p-4 text-[14px] leading-relaxed text-silver mb-4"
                        dangerouslySetInnerHTML={{ __html: aiMessage(inp, quote) }}
                      />
                      <div className="rounded-[10px] border border-graphite overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-graphite px-4 py-3 text-[13px]">
                          <div>
                            <span>Mano de obra{quote.brandMult > 1 ? ` · línea ${marca}` : ""}</span>
                            <span className="block text-[11px] text-ash mt-0.5">Servicio: {quote.svc.name}</span>
                          </div>
                          <span className="tabular-nums text-bone self-center whitespace-nowrap">{CLP(quote.labor)}</span>
                        </div>
                        {quote.hasParts && (
                          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-graphite px-4 py-3 text-[13px]">
                            <div>
                              <span>Repuestos e insumos</span>
                              <span className="block text-[11px] text-ash mt-0.5">Rango estimado según diagnóstico</span>
                            </div>
                            <span className="tabular-nums text-bone self-center whitespace-nowrap">{CLP(quote.partsLo)} – {CLP(quote.partsHi)}</span>
                          </div>
                        )}
                        {quote.travel > 0 && (
                          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-graphite px-4 py-3 text-[13px]">
                            <div>
                              <span>Traslado a domicilio</span>
                              <span className="block text-[11px] text-ash mt-0.5">Dentro de la V Región</span>
                            </div>
                            <span className="tabular-nums text-bone self-center whitespace-nowrap">{CLP(quote.travel)}</span>
                          </div>
                        )}
                        <div className="grid grid-cols-[1fr_auto] gap-4 bg-carbon px-4 py-3">
                          <span className="font-display text-[17px] text-paper-white self-center">Total estimado</span>
                          <span className="text-[18px] font-bold tabular-nums text-copper whitespace-nowrap">{rangeTxt}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate px-2.5 py-1 text-[11px] text-fog">
                          <Clock size={12} className="text-copper" />
                          {quote.timeTxt}
                        </span>
                        {quote.recs.map((r, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-slate px-2.5 py-1 text-[11px] text-fog">
                            <Check size={12} className="text-copper" />
                            {r}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <a
                          href={waLink(formatQuoteText(inp, quote))}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => { e.preventDefault(); handleSend(); }}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[--wa-green] px-5 py-3 text-[14px] font-medium text-[#052e16] transition-all hover:-translate-y-0.5 hover:bg-[--wa-green-hover] min-w-[150px]"
                        >
                          <Send size={15} />
                          Enviar cotización
                        </a>
                        <button
                          onClick={handleCopy}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-paper-white px-5 py-3 text-[14px] font-medium text-paper-white transition-all hover:-translate-y-0.5 hover:bg-white/6 min-w-[150px]"
                        >
                          <Copy size={15} />
                          Copiar
                        </button>
                      </div>
                      <p className="mt-4 text-[11px] leading-relaxed text-ash">
                        * Estimación referencial generada con datos de prueba. El valor final se confirma tras el diagnóstico presencial.
                      </p>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] rounded-[10px] border border-slate bg-carbon px-5 py-3.5 text-[14px] text-bone flex items-center gap-2.5 shadow-lg"
          >
            <Check size={16} className="text-ok" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
