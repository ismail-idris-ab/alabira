import { lazy, Suspense } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import WhatsAppButton from "./components/ui/WhatsAppButton";

const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const ProductsSection = lazy(() => import("./components/sections/ProductsSection"));
const SustainabilitySection = lazy(() => import("./components/sections/SustainabilitySection"));
const GlobalImpactSection = lazy(() => import("./components/sections/GlobalImpactSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));

function SectionFallback() {
  return <div className="min-h-100" />;
}

export default function App() {
  return (
    <>
<Header />
      <main id="main-content">
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProductsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SustainabilitySection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GlobalImpactSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
