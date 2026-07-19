import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#08080a" };

export const metadata: Metadata = {
  title: "Taller GRS · Mecánica europea de precisión en Viña del Mar",
  description:
    "Taller mecánico universitario con 20 años de experiencia en vehículos europeos y multimarca. Cotiza tu servicio con nuestro asistente inteligente.",
  metadataBase: new URL("https://tallergrs.vercel.app"),
  openGraph: {
    title: "Taller GRS · Mecánica europea de precisión",
    description:
      "Diagnóstico, mantención y performance para tu vehículo europeo. Cotiza en 30 segundos.",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} antialiased`}
      style={{ scrollBehavior: "auto" }}
    >
      <body className="min-h-screen bg-obsidian text-bone font-body">
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
