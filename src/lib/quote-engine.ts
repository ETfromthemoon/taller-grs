import { SERVICES, BRAND_MULT, LABOR_RATE, CLP, type Service } from "./data";

export interface QuoteInput {
  marca: string;
  modelo: string;
  anio: string;
  km: string;
  servicioId: string;
  detalle: string;
}

export interface QuoteResult {
  svc: Service;
  labor: number;
  partsLo: number;
  partsHi: number;
  travel: number;
  lo: number;
  hi: number;
  timeTxt: string;
  recs: string[];
  brandMult: number;
  km: number;
  age: number;
  hasParts: boolean;
}

const RECS: Record<string, string[]> = {
  frenos: ["revisión de discos y cañerías", "estado de líquido de frenos DOT4"],
  mant_menor: ["nivel de refrigerante", "estado de neumáticos y alineación"],
  mant_mayor: ["correa/cadena de distribución", "bomba de agua", "filtros de habitáculo"],
  motor: ["compresión por cilindro", "sistema de refrigeración", "fugas de aceite"],
  caja: ["nivel y color del aceite ATF", "soportes de motor y caja"],
  diag: ["lectura de códigos en vivo", "borrado y prueba de ruta"],
  dpf_egr: ["contrapresión de escape", "estado del turbo"],
  economia: ["bujías/inyectores", "presión de neumáticos"],
  potencia: ["salud del embrague", "sistema de admisión"],
  precompra: ["historial de mantención", "estado estructural y de chasis"],
  domicilio: ["diagnóstico en terreno", "definir si requiere traslado a taller"],
};

export function computeQuote(input: QuoteInput): QuoteResult {
  const svc = SERVICES.find((s) => s.id === input.servicioId) || SERVICES[0];
  const brandMult = BRAND_MULT[input.marca] ?? 1.0;
  const nowY = new Date().getFullYear();
  const age = Math.max(0, nowY - Number(input.anio || nowY));
  const km = Number(String(input.km).replace(/\D/g, "")) || 0;

  let wear = 1;
  if (km > 150000) wear += 0.14;
  else if (km > 90000) wear += 0.08;
  if (age > 12) wear += 0.1;
  else if (age > 7) wear += 0.05;

  const laborBase = svc.fixedLabor ?? svc.laborH * LABOR_RATE;
  const labor = laborBase * brandMult;
  const partsMult = wear * (1 + (brandMult - 1) * 0.5);
  const partsLo = svc.partsLo * partsMult;
  const partsHi = svc.partsHi * partsMult;
  const travel = svc.travel || 0;
  const lo = labor + partsLo + travel;
  const hi = labor + partsHi + travel;

  const hrs = svc.laborH * (0.9 + wear * 0.2);
  const timeTxt =
    hrs <= 3
      ? `${Math.round(hrs)} h aprox. (mismo día)`
      : hrs <= 8
        ? `1 día hábil`
        : `${Math.ceil(hrs / 8)} días hábiles`;

  const recs = RECS[svc.id] || ["inspección visual general"];

  return { svc, labor, partsLo, partsHi, travel, lo, hi, timeTxt, recs, brandMult, km, age, hasParts: svc.partsHi > 0 };
}

export function aiMessage(inp: QuoteInput, q: QuoteResult): string {
  const veh = `${inp.marca} ${inp.modelo || ""} ${inp.anio}`.trim();
  let intro = `Analicé tu <b>${veh}</b> con ${Number(q.km).toLocaleString("es-CL")} km. `;
  let body: string;
  switch (q.svc.id) {
    case "frenos":
      body = `La vibración al frenar que describís suele venir de discos deformados. Presupuesté un servicio de frenos completo.`;
      break;
    case "diag":
      body = `Con un testigo encendido lo primero es leer la ECU. Este valor es solo el diagnóstico; confirmada la falla te paso el presupuesto.`;
      break;
    case "mant_mayor":
      body = `Por el kilometraje, la mantención mayor es la decisión correcta: adelantamos desgastes antes de que te dejen en ruta.`;
      break;
    case "motor":
      body = `Un ajuste de motor tiene un rango amplio porque depende de lo que se encuentre al abrir. El diagnóstico previo acota bastante la cifra.`;
      break;
    default:
      body = `Preparé una estimación para el servicio seleccionado. El valor final se confirma tras el diagnóstico en taller.`;
  }
  return intro + body;
}

export function formatQuoteText(inp: QuoteInput, q: QuoteResult): string {
  const veh = `${inp.marca} ${inp.modelo || ""} · ${inp.anio}`.trim();
  const rangeTxt = Math.abs(q.hi - q.lo) < 1000 ? CLP(q.lo) : `${CLP(q.lo)} — ${CLP(q.hi)}`;
  return `Hola Taller GRS 🚗, quiero agendar este servicio (cotización web):

🔧 Vehículo: ${veh} · ${Number(q.km).toLocaleString("es-CL")} km
🛠️ Servicio: ${q.svc.name}
💰 Estimado: ${rangeTxt}
⏱️ Tiempo: ${q.timeTxt}
${inp.detalle ? `📝 Detalle: ${inp.detalle}\n` : ""}
¿Tienen hora disponible?`;
}
