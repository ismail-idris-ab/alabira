import { lazy, Suspense } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// Retries the dynamic import up to 3 times before giving up
const lazyWithRetry = (factory, retries = 3, delay = 400) =>
  lazy(() => {
    const attempt = (n) =>
      factory().catch((err) => {
        if (n <= 0) throw err;
        return new Promise((res) => setTimeout(res, delay)).then(() => attempt(n - 1));
      });
    return attempt(retries);
  });

const AboutSection          = lazyWithRetry(() => import("./components/sections/AboutSection"));
const ProductsSection       = lazyWithRetry(() => import("./components/sections/ProductsSection"));
const SustainabilitySection = lazyWithRetry(() => import("./components/sections/SustainabilitySection"));
const GlobalImpactSection   = lazyWithRetry(() => import("./components/sections/GlobalImpactSection"));
const ContactSection        = lazyWithRetry(() => import("./components/sections/ContactSection"));

function SectionFallback() {
  return (
    <div className="min-h-[420px] w-full animate-pulse bg-gradient-to-b from-brand-cream/60 to-transparent" />
  );
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
