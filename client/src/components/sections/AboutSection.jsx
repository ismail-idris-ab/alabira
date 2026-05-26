import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import StatCard from "../ui/StatCard";

const STATS = [
  { value: 5000, suffix: "+", label: "Acres Farmed" },
  { value: 12, suffix: "", label: "Partner Farms" },
  { value: 8000, suffix: "+", label: "Happy Customers" },
];

const HIGHLIGHTS = [
  "Solar-powered irrigation across all farms",
  "Zero-waste processing — every byproduct repurposed",
  "NASC-certified organic since 2014",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="about" className="py-24 lg:py-36 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-24" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="overflow-hidden aspect-[3/2] sm:aspect-[4/5] rounded-[4px] bg-card-gradient relative">
              <div id="about-pulse" className="absolute inset-0 animate-pulse bg-brand-sage/[0.12]" />
              <img
                src="/images/about.png"
                alt="Alabira farm workers tending organic crops at sunrise"
                className="w-full h-full object-cover opacity-0 transition-opacity duration-500 relative z-10"
                loading="lazy"
                onLoad={(e) => {
                  e.target.style.opacity = "1";
                  const pulse = e.target.parentElement.querySelector("#about-pulse");
                  if (pulse) pulse.style.display = "none";
                }}
              />
            </div>

            {/* Years badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-brand-ink px-6 py-5 rounded-[3px]"
            >
              <span className="font-display block text-[2.5rem] font-semibold leading-none tracking-heading text-brand-gold">
                15+
              </span>
              <span className="font-sans block mt-1.5 text-[10px] tracking-footer uppercase text-white/45">
                Years Growing
              </span>
            </motion.div>

            {/* Organic cert badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 -left-4 lg:-left-8 bg-brand-gold px-4 py-3 rounded-[3px]"
            >
              <span className="font-sans block text-white text-[9px] tracking-section uppercase font-semibold">
                NASC Certified
              </span>
              <span className="font-sans block text-white/75 text-[9px] tracking-[0.1em] mt-0.5">
                Organic
              </span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.14 }}
          >
            <p className="font-sans text-eyebrow uppercase text-brand-sage tracking-section font-medium mb-5">
              Our Story
            </p>

            <h2 className="font-display text-section text-brand-green font-semibold tracking-heading leading-[1.08] mb-6">
              Rooted in Nigerian Soil,
              <br />
              <em className="italic font-normal">Grown for the World</em>
            </h2>

            <div className="w-10 h-px bg-brand-gold mb-7" />

            <p className="font-sans text-brand-ink/60 text-[17px] leading-[1.78] mb-4">
              Founded on the fertile highlands of Plateau State, Alabira Global Farm
              has spent over a decade perfecting sustainable farming practices that honour
              the land while delivering world-class produce.
            </p>
            <p className="font-sans text-brand-ink/60 text-[17px] leading-[1.78] mb-8">
              From solar-powered irrigation to zero-waste processing, every decision
              is guided by one principle: nature first.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-brand-green shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="font-sans text-[15px] text-brand-ink/65 leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats strip */}
            <div className="grid grid-cols-3 border-t border-brand-ink/10">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={i < STATS.length - 1 ? "border-r border-brand-ink/10" : ""}
                >
                  <StatCard {...stat} inView={inView} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
