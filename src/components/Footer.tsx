"use client";

import { MessageCircle } from "lucide-react";
import { waLink, GREETING, WA_PHONE } from "@/lib/data";

function IgIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-graphite">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-copper)_50%,transparent)] opacity-20" />
      <div className="mx-auto max-w-[1216px] px-[--pad] py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 font-display text-lg text-paper-white tracking-[0.01em] font-medium">
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-paper-white text-sm font-bold tracking-tight text-black font-body">GRS</span>
              Taller GRS
            </a>
            <p className="mt-4 max-w-[32ch] text-[14px] leading-relaxed text-fog">
              Taller mecánico profesional especializado en vehículos europeos y multimarca. Viña del Mar, Región de Valparaíso.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a href="https://www.instagram.com/tallergrs/" target="_blank" rel="noopener" aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate text-fog transition-all hover:border-copper hover:text-copper hover:shadow-[0_0_12px_-4px_rgba(204,145,102,0.3)]">
                <IgIcon size={17} />
              </a>
              <a href="https://web.facebook.com/profile.php?id=100057040047218" target="_blank" rel="noopener" aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate text-fog transition-all hover:border-copper hover:text-copper hover:shadow-[0_0_12px_-4px_rgba(204,145,102,0.3)]">
                <FbIcon size={17} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ash">Servicios</h5>
            <a href="#servicios" className="mb-2.5 block text-[14px] text-fog transition-colors hover:text-copper">Mantención por km</a>
            <a href="#servicios" className="mb-2.5 block text-[14px] text-fog transition-colors hover:text-copper">Diagnóstico scanner</a>
            <a href="#servicios" className="mb-2.5 block text-[14px] text-fog transition-colors hover:text-copper">Chiptunning · DPF/EGR</a>
            <a href="#servicios" className="mb-2.5 block text-[14px] text-fog transition-colors hover:text-copper">Mecánico a domicilio</a>
          </div>

          <div>
            <h5 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ash">Horario</h5>
            <p className="mb-1 text-[14px] text-fog">Lunes a Viernes</p>
            <p className="text-[14px] font-medium text-silver">8:30 – 18:00</p>
            <h5 className="mb-4 mt-7 text-[10px] font-semibold uppercase tracking-[0.12em] text-ash">Ubicación</h5>
            <a href="https://maps.google.com/?q=Plath+1668+Santa+Ines+Viña+del+Mar" target="_blank" rel="noopener"
              className="text-[14px] text-fog transition-colors hover:text-copper">
              Plath 1668, Santa Inés<br />Viña del Mar
            </a>
          </div>

          <div>
            <h5 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ash">Contacto directo</h5>
            <a href={waLink(GREETING)} target="_blank" rel="noopener"
              className="text-base font-medium text-copper-hi transition-colors hover:text-copper">
              +56 9 {WA_PHONE.slice(2, 6)} {WA_PHONE.slice(6)}
            </a>
            <p className="mt-4 text-[14px] leading-relaxed text-fog">¿Consultas? Escríbenos por WhatsApp y respondemos a la brevedad.</p>
            <a
              href={waLink(GREETING)}
              target="_blank"
              rel="noopener"
              className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-[14px] font-medium text-[#052e16] transition-all hover:-translate-y-0.5 hover:bg-[#2ee073] hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle size={15} />
              Abrir WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-6 text-[12px] text-ash">
          <span>&copy; {year} Taller GRS · Viña del Mar, Chile</span>
          <span>Cotizador IA · Datos de prueba</span>
        </div>
      </div>
    </footer>
  );
}
