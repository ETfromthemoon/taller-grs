export const WA_PHONE = "56982278401";

export const CLP = (n: number) =>
  "$" + Math.round(n).toLocaleString("es-CL");

export function waLink(text: string) {
  return `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(text)}`;
}

export const GREETING =
  "Hola Taller GRS 🚗, me gustaría consultar por un servicio para mi vehículo.";

export interface Service {
  id: string;
  name: string;
  desc: string;
  laborH: number;
  partsLo: number;
  partsHi: number;
  fixedLabor?: number;
  travel?: number;
  feat?: boolean;
  badge?: string;
}

export const SERVICES: Service[] = [
  {
    id: "mant_menor", name: "Mantención preventiva",
    desc: "Aceite, filtros y revisión por kilometraje según manual del fabricante.",
    laborH: 1.8, partsLo: 45000, partsHi: 110000,
  },
  {
    id: "diag", name: "Diagnóstico con scanner",
    desc: "Scanner VAG-COM original y Launch multimarca. Detectamos la falla real.",
    laborH: 1, partsLo: 0, partsHi: 0, fixedLabor: 35000,
  },
  {
    id: "frenos", name: "Servicio de frenos",
    desc: "Pastillas, discos, líquido y sangrado. Recuperamos la mordida y el pedal firme.",
    laborH: 2.5, partsLo: 90000, partsHi: 340000,
  },
  {
    id: "mant_mayor", name: "Mantención mayor",
    desc: "Servicio completo de alto kilometraje: bujías, correas, líquidos y puntos de desgaste.",
    laborH: 4, partsLo: 150000, partsHi: 380000, feat: true,
  },
  {
    id: "motor", name: "Ajuste de motor",
    desc: "Metales, levas, culata y armado. Reparación mayor con criterio de ingeniería.",
    laborH: 9, partsLo: 180000, partsHi: 820000,
  },
  {
    id: "caja", name: "Reparación de caja",
    desc: "Cajas automáticas y mecánicas: mantención, cambio de aceite ATF y reparación.",
    laborH: 8, partsLo: 120000, partsHi: 1100000,
  },
  {
    id: "domicilio", name: "Mecánico a domicilio",
    desc: "Servicio y rescate donde estés en la V Región. Ideal para no mover un auto con falla.",
    laborH: 2, partsLo: 20000, partsHi: 120000, travel: 28000, badge: "NUEVO",
  },
  {
    id: "potencia", name: "Aumento de potencia",
    desc: "Reprogramación de ECU para más torque y respuesta, respetando la mecánica.",
    laborH: 3, partsLo: 220000, partsHi: 520000,
  },
  {
    id: "dpf_egr", name: "DPF OFF · EGR OFF",
    desc: "Desactivación, vaciado y limpieza de filtro de partículas. Elimina recirculación.",
    laborH: 5, partsLo: 160000, partsHi: 420000,
  },
  {
    id: "economia", name: "Chip de economía",
    desc: "Optimización del mapa para bajar consumo de combustible en ruta y ciudad.",
    laborH: 2.5, partsLo: 180000, partsHi: 360000,
  },
  {
    id: "precompra", name: "Asesoría de compra",
    desc: "Inspección pre-compra: revisamos el auto que estás por comprar antes de que firmes.",
    laborH: 2, partsLo: 0, partsHi: 0, fixedLabor: 60000,
  },
];

export const BRAND_MULT: Record<string, number> = {
  Porsche: 1.7, Audi: 1.35, BMW: 1.4, "Mercedes-Benz": 1.4,
  Volkswagen: 1.18, Skoda: 1.12, Seat: 1.12, "Otra marca": 1.0,
};

export const BRANDS = [
  "Volkswagen", "Audi", "Porsche", "Skoda", "SEAT", "BMW", "Mercedes-Benz", "Multimarca",
];

export const LABOR_RATE = 28000;

export interface Symptom {
  t: string;
  s: string;
}

export const SYMPTOMS: Symptom[] = [
  { t: "Testigo encendido", s: "diag" },
  { t: "Vibración al frenar", s: "frenos" },
  { t: "Pérdida de potencia", s: "motor" },
  { t: "Ruido en caja", s: "caja" },
  { t: "Humo negro / DPF", s: "dpf_egr" },
  { t: "Alto consumo", s: "economia" },
];

export interface Testimonial {
  q: string;
  n: string;
  c: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { q: "Llevé mi Audi con una falla que dos talleres no encontraron. Acá diagnosticaron a la primera con el scanner y quedó impecable.", n: "Rodrigo Valdés", c: "Audi A4 · Reñaca" },
  { q: "Me pasaron el presupuesto antes de tocar nada y respetaron el precio. Cero letra chica. Volví con el auto de mi señora.", n: "Camila Fuentes", c: "VW Tiguan · Concón" },
  { q: "El servicio a domicilio me salvó. El auto no arrancaba y llegaron a mi casa en Viña. Profesionalismo total.", n: "Ignacio Bravo", c: "Skoda Octavia · Viña del Mar" },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  { q: "¿Atienden solo autos europeos?",
    a: "Somos especialistas en la línea europea (VW, Audi, Porsche, Skoda, Seat), pero atendemos multimarca. También trabajamos maquinaria agroindustrial." },
  { q: "¿La cotización de la web es el precio final?",
    a: "Es una estimación referencial. El valor final lo confirmamos tras el diagnóstico presencial con scanner, y no se toca nada sin tu aprobación." },
  { q: "¿Cómo funciona el mecánico a domicilio?",
    a: "Vamos donde estés dentro de la V Región para diagnóstico, servicio o rescate. Incluye un cargo de traslado." },
  { q: "¿Qué es el chiptunning, DPF OFF y EGR OFF?",
    a: "Son servicios de reprogramación de la ECU: aumento de potencia, chip de economía de combustible y gestión del filtro de partículas." },
  { q: "¿Dónde están y en qué horario?",
    a: "En Plath 1668, Santa Inés, Viña del Mar. Lun a Vie de 8:30 a 18:00. Puedes agendar por WhatsApp al +56 9 8227 8401." },
];
