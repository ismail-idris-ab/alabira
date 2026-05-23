import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import StatCard from "../ui/StatCard";

const STATS = [
  { value: 5000, suffix: "+", label: "Acres Farmed" },
  { value: 12, suffix: "", label: "Partner Farms" },
  { value: 8000, suffix: "+", label: "Happy Customers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="about" className="py-24 lg:py-36" style={{ backgroundColor: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div
              className="overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: "4px",
                background: "linear-gradient(135deg, #1B3A2D 0%, #7FB08A 100%)",
              }}
            >
              <img
                src="/images/about.webp"
                alt="Alabira farm workers tending organic crops at sunrise"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-brand-ink"
              style={{ padding: "20px 24px", borderRadius: "2px" }}
            >
              <span
                className="font-display block"
                style={{ fontSize: "2.5rem", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.03em", color: "#B8912A" }}
              >
                15+
              </span>
              <span
                className="font-sans block mt-1.5"
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}
              >
                Years Growing
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
            <p
              className="font-sans uppercase text-brand-sage"
              style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "20px" }}
            >
              Our Story
            </p>

            <h2
              className="font-display text-brand-green"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "24px" }}
            >
              Rooted in Nigerian Soil,
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Grown for the World</em>
            </h2>

            <div style={{ width: "40px", height: "1px", backgroundColor: "#B8912A", marginBottom: "28px" }} />

            <p
              className="font-sans text-brand-ink/60 leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.78, marginBottom: "16px" }}
            >
              Founded on the fertile highlands of Plateau State, Alabira Global Farm Tilde
              has spent over a decade perfecting sustainable farming practices that honour
              the land while delivering world-class produce.
            </p>
            <p
              className="font-sans text-brand-ink/60 leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.78, marginBottom: "40px" }}
            >
              From solar-powered irrigation to zero-waste processing, every decision
              is guided by one principle: nature first.
            </p>

            {/* Stats — editorial strip */}
            <div className="grid grid-cols-3" style={{ borderTop: "1px solid rgba(15,26,20,0.1)" }}>
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(15,26,20,0.1)" : "none" }}
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
