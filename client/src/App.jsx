import { lazy, Suspense } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ErrorBoundary from "./components/ui/ErrorBoundary";

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
    <HelmetProvider>
      <Helmet>
        <title>Alabira Global Farm — Certified Organic Produce from Nigeria</title>
        <meta name="description" content="Alabira Global Farm grows certified organic produce in the Highlands of Nigeria. Livestock, grains, fruits, and specialty crops — sustainably farmed and exported worldwide." />
        <meta name="keywords" content="organic farm Nigeria, certified organic produce, Plateau State farm, export farm Nigeria, organic beef chicken rice honey" />
        <meta property="og:title" content="Alabira Global Farm — Certified Organic Produce" />
        <meta property="og:description" content="Sustainably farmed organic produce from the Highlands of Nigeria. 500+ hectares, 40+ products, 18 countries reached." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/alabira-logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://alabiraglobalfarm.com" />
      </Helmet>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ProductsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <SustainabilitySection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <GlobalImpactSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
    </HelmetProvider>
  );
}
