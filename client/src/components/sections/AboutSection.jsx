import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import StatCard from "../ui/StatCard";

const STATS = [
  { icon: "🌾", value: 5000, suffix: "+", label: "Acres Farmed" },
  { icon: "🌍", value: 12, suffix: "", label: "Partner Farms" },
  { icon: "🛒", value: 8000, suffix: "+", label: "Happy Customers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="about"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src="/images/about.webp"
                alt="Alabira farm workers tending organic crops at sunrise"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.style.background =
                    "linear-gradient(135deg, #2E6B3E 0%, #7FB08A 100%)";
                }}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-brand-green text-white rounded-2xl px-6 py-4 shadow-lg">
              <span className="font-serif font-bold text-2xl block">15+</span>
              <span className="font-sans text-xs uppercase tracking-widest opacity-80">
                Years Growing
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
          >
            <p className="font-sans text-sm font-medium uppercase tracking-widest text-brand-sage mb-4">
              Our Story
            </p>
            <h2
              className="font-serif font-bold text-brand-green mb-6"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Rooted in Nigerian Soil,
              <br />
              Grown for the World
            </h2>
            <p
              className="font-sans text-brand-brown leading-relaxed mb-6"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              Founded on the fertile highlands of Plateau State, Alabira Global
              Farm Tilde has spent over a decade perfecting sustainable farming
              practices that honour the land while delivering world-class
              produce.
            </p>
            <p
              className="font-sans text-brand-brown leading-relaxed mb-10"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              From our solar-powered irrigation systems to our zero-waste
              processing facilities, every decision we make is guided by one
              principle: nature first.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} inView={inView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
