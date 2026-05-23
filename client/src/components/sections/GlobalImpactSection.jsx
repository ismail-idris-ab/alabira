import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import TestimonialCarousel from "../ui/TestimonialCarousel";
import { testimonialsApi } from "../../services/api";
import { staticTestimonials } from "../../data/static";

const FarmMap = lazy(() => import("../ui/FarmMap"));

const IMPACT_STATS = [
  { value: "500+", label: "Families Supported" },
  { value: "4", label: "Farm Locations" },
  { value: "5,000+", label: "Acres Cultivated" },
];

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
    <section id="impact" className="py-24 lg:py-36" style={{ backgroundColor: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16" ref={ref}>

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-sans uppercase text-brand-sage"
            style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "16px" }}
          >
            Where We Farm
          </p>
          <h2
            className="font-display text-brand-ink"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            Our Global Impact
          </h2>
        </motion.div>

        {/* Impact stat strip */}
        <motion.div
          className="grid grid-cols-3 mb-14"
          style={{ borderTop: "1px solid rgba(15,26,20,0.1)", borderBottom: "1px solid rgba(15,26,20,0.1)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {IMPACT_STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center text-center py-6"
              style={{ borderRight: i < IMPACT_STATS.length - 1 ? "1px solid rgba(15,26,20,0.1)" : "none" }}
            >
              <span
                className="font-display text-brand-green"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {value}
              </span>
              <span
                className="font-sans uppercase text-brand-clay mt-2"
                style={{ fontSize: "10px", letterSpacing: "0.16em", fontWeight: 500 }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Suspense
            fallback={
              <div
                className="animate-pulse flex items-center justify-center"
                style={{ height: "450px", backgroundColor: "rgba(127,176,138,0.12)", borderRadius: "4px" }}
              >
                <span className="font-sans text-brand-clay" style={{ fontSize: "0.875rem" }}>Loading map…</span>
              </div>
            }
          >
            <FarmMap />
          </Suspense>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <p
            className="font-sans uppercase text-brand-sage text-center"
            style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "12px" }}
          >
            Testimonials
          </p>
          <h3
            className="font-display text-brand-ink text-center"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "40px" }}
          >
            What Our Partners Say
          </h3>
          <TestimonialCarousel testimonials={testimonials.length ? testimonials : staticTestimonials} />
        </motion.div>
      </div>
    </section>
  );
}
