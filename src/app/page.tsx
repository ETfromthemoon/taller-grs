import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import QuoteEngine from "@/components/QuoteEngine";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Services />
        <QuoteEngine />
        <About />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
