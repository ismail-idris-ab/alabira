import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import TestimonialCarousel from "../ui/TestimonialCarousel";
import { testimonialsApi } from "../../services/api";
import { staticTestimonials } from "../../data/static";

// Lazy-load Leaflet map to keep initial bundle small
const FarmMap = lazy(() => import("../ui/FarmMap"));

export default function GlobalImpactSection() {
  const [testimonials, setTestimonials] = useState([]);
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    testimonialsApi
      .list()
      .then((res) => setTestimonials(res.data.data || res.data))
      .catch(() => setTestimonials(staticTestimonials));
  }, []);

  return (
    <section
      id="impact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-brand-sage mb-4">
            Where We Farm
          </p>
          <h2
            className="font-serif font-bold text-brand-charcoal mb-4"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Our Global Impact
          </h2>
          <p className="font-sans text-brand-clay text-lg">
            Supporting{" "}
            <span className="font-serif font-bold text-brand-green text-2xl">
              500+
            </span>{" "}
            families across Nigeria
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Suspense
            fallback={
              <div
                className="bg-brand-sage/20 rounded-2xl animate-pulse flex items-center justify-center"
                style={{ height: "450px" }}
              >
                <span className="font-sans text-brand-clay">Loading map…</span>
              </div>
            }
          >
            <FarmMap />
          </Suspense>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <h3 className="font-serif font-bold text-brand-charcoal text-2xl text-center mb-10">
            What Our Partners Say
          </h3>
          <TestimonialCarousel testimonials={testimonials.length ? testimonials : staticTestimonials} />
        </motion.div>
      </div>
    </section>
  );
}
