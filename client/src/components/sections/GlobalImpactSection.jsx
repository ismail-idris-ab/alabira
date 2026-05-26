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

function TestimonialSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[0, 1].map((i) => (
        <div key={i} className="animate-pulse bg-white rounded-2xl p-8 shadow-sm">
          <div className="h-8 w-8 rounded-sm bg-brand-sage/20 mb-4" />
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-brand-ink/[6%] rounded w-full" />
            <div className="h-4 bg-brand-ink/[6%] rounded w-5/6" />
            <div className="h-4 bg-brand-ink/[6%] rounded w-3/4" />
          </div>
          <div className="h-3 bg-brand-ink/[5%] rounded w-1/3 mb-1" />
          <div className="h-3 bg-brand-ink/[4%] rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}

export default function GlobalImpactSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    testimonialsApi
      .list()
      .then((res) => setTestimonials(res.data.data))
      .catch(() => setTestimonials(staticTestimonials))
      .finally(() => setLoadingTestimonials(false));
  }, []);

  return (
    <section id="impact" className="py-24 lg:py-36 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-24" ref={ref}>

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-eyebrow uppercase text-brand-sage tracking-section font-medium mb-4">
            Where We Farm
          </p>
          <h2 className="font-display text-section text-brand-ink font-semibold tracking-heading leading-[1.08]">
            Our Global Impact
          </h2>
        </motion.div>

        {/* Impact stat strip */}
        <motion.div
          className="grid grid-cols-3 mb-14 border-t border-b border-brand-ink/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {IMPACT_STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center text-center py-6 ${i < IMPACT_STATS.length - 1 ? "border-r border-brand-ink/10" : ""}`}
            >
              <span className="font-display text-stat-sm text-brand-green font-semibold tracking-heading leading-none">
                {value}
              </span>
              <span className="font-sans text-label uppercase text-brand-clay tracking-label font-medium mt-2">
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
              <div className="animate-pulse flex items-center justify-center h-112.5 bg-brand-sage/12 rounded-sm">
                <span className="font-sans text-sm text-brand-clay">Loading map…</span>
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
          <p className="font-sans text-eyebrow uppercase text-brand-sage text-center tracking-section font-medium mb-3">
            Testimonials
          </p>
          <h3 className="font-display text-subtitle text-brand-ink text-center font-semibold tracking-heading-sm mb-10">
            What Our Partners Say
          </h3>
          {loadingTestimonials ? (
            <TestimonialSkeleton />
          ) : (
            <TestimonialCarousel testimonials={testimonials.length ? testimonials : staticTestimonials} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
