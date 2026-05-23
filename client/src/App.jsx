import { lazy, Suspense } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";

const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const BenefitsSection = lazy(() => import("./components/sections/BenefitsSection"));
const ProductsSection = lazy(() => import("./components/sections/ProductsSection"));
const SustainabilitySection = lazy(() => import("./components/sections/SustainabilitySection"));
const GlobalImpactSection = lazy(() => import("./components/sections/GlobalImpactSection"));
const CTABannerSection = lazy(() => import("./components/sections/CTABannerSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));

function SectionFallback() {
  return <div style={{ minHeight: "400px" }} />;
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <BenefitsSection />
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
          <CTABannerSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
