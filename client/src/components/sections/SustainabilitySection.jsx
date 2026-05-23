import { motion } from "framer-motion";
import { Sun, Recycle, Trees } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const PILLARS = [
  {
    icon: Sun,
    title: "Solar Irrigation",
    description:
      "100% of our water pumping is powered by on-farm solar arrays, eliminating fossil fuel dependency and cutting irrigation costs by 80%.",
  },
  {
    icon: Recycle,
    title: "Zero-Waste Processing",
    description:
      "Every crop byproduct is composted, biofermented, or repurposed as animal feed — nothing leaves our facility as waste.",
  },
  {
    icon: Trees,
    title: "Reforestation",
    description:
      "For every acre cultivated, we plant 10 trees in surrounding buffer zones — restoring native ecosystems and improving soil health.",
  },
];

const MILESTONES = [
  { year: "2010", text: "Founded on 200 acres in Plateau State" },
  { year: "2014", text: "First organic certification (NASC)" },
  { year: "2018", text: "Solar irrigation fully operational" },
  { year: "2021", text: "Zero-waste processing facility opened" },
  { year: "2024", text: "10,000 trees planted milestone" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function SustainabilitySection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="sustainability" className="py-24 lg:py-36" style={{ backgroundColor: "#1B3A2D" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-24" ref={ref}>

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-sans uppercase text-brand-sage"
            style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "16px" }}
          >
            How We Farm
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            Our Sustainability Pillars
          </h2>
        </motion.div>

        {/* Pillars — left-border cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex flex-col"
              style={{
                borderLeft: "1px solid rgba(184,145,42,0.4)",
                paddingLeft: "28px",
              }}
            >
              <Icon
                size={32}
                color="rgba(184,145,42,0.85)"
                strokeWidth={1.5}
                style={{ marginBottom: "20px" }}
              />
              <h3
                className="font-display text-white"
                style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "12px" }}
              >
                {title}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9375rem", lineHeight: 1.75 }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p
            className="font-sans uppercase text-center text-brand-sage"
            style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "40px" }}
          >
            Our Journey
          </p>

          {/* Desktop */}
          <div className="hidden md:flex items-start justify-between relative">
            <div
              className="absolute"
              style={{ top: "7px", left: "0", right: "0", height: "1px", backgroundColor: "rgba(255,255,255,0.12)" }}
            />
            {MILESTONES.map(({ year, text }) => (
              <div
                key={year}
                className="flex flex-col items-center text-center relative z-10"
                style={{ width: `${100 / MILESTONES.length}%` }}
              >
                <div
                  style={{ width: "14px", height: "14px", backgroundColor: "#B8912A", borderRadius: "50%", marginBottom: "16px", flexShrink: 0 }}
                />
                <span
                  className="font-display block"
                  style={{ fontSize: "1.25rem", fontWeight: 600, color: "#B8912A", letterSpacing: "-0.02em", marginBottom: "6px" }}
                >
                  {year}
                </span>
                <span
                  className="font-sans leading-relaxed px-3"
                  style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-8 relative">
            <div
              className="absolute"
              style={{ left: "7px", top: "0", bottom: "0", width: "1px", backgroundColor: "rgba(255,255,255,0.12)" }}
            />
            {MILESTONES.map(({ year, text }) => (
              <div key={year} className="flex items-start gap-5 relative z-10">
                <div
                  style={{ width: "14px", height: "14px", backgroundColor: "#B8912A", borderRadius: "50%", marginTop: "4px", flexShrink: 0 }}
                />
                <div>
                  <span
                    className="font-display block"
                    style={{ fontSize: "1.25rem", fontWeight: 600, color: "#B8912A", letterSpacing: "-0.02em", marginBottom: "4px" }}
                  >
                    {year}
                  </span>
                  <span
                    className="font-sans"
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}
                  >
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
