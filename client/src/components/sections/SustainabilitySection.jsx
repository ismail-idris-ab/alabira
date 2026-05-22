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
      "Every crop byproduct is either composted, biofermented, or repurposed as animal feed — nothing leaves our facility as waste.",
  },
  {
    icon: Trees,
    title: "Reforestation",
    description:
      "For every acre we cultivate, we plant 10 trees in surrounding buffer zones — restoring native ecosystems and improving soil health.",
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
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SustainabilitySection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="sustainability"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#2E6B3E" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-white/60 mb-4">
            How We Farm
          </p>
          <h2
            className="font-serif font-bold text-white"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Our Sustainability Pillars
          </h2>
        </motion.div>

        {/* Pillars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="rounded-2xl p-8 text-center flex flex-col items-center"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="mb-6 pb-6 w-full flex justify-center"
                style={{ borderBottom: "2px solid rgba(255,255,255,0.2)" }}
              >
                <Icon size={48} color="white" strokeWidth={1.5} />
              </div>
              <h3
                className="font-serif font-semibold text-white mb-4"
                style={{ fontSize: "1.5rem" }}
              >
                {title}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-serif font-semibold text-white text-center text-2xl mb-12">
            Our Journey
          </h3>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:flex items-start justify-between relative">
            <div
              className="absolute top-4 left-0 right-0 h-px"
              style={{ borderTop: "2px dashed rgba(255,255,255,0.3)" }}
            />
            {MILESTONES.map(({ year, text }, i) => (
              <div
                key={year}
                className="flex flex-col items-center text-center relative z-10"
                style={{ width: `${100 / MILESTONES.length}%` }}
              >
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <span className="font-serif font-bold text-brand-gold text-lg block mb-1">
                  {year}
                </span>
                <span
                  className="font-sans text-xs leading-relaxed px-2"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden flex flex-col gap-8 relative">
            <div
              className="absolute left-4 top-0 bottom-0 w-px"
              style={{ borderLeft: "2px dashed rgba(255,255,255,0.3)" }}
            />
            {MILESTONES.map(({ year, text }) => (
              <div key={year} className="flex items-start gap-6 relative z-10">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div>
                  <span className="font-serif font-bold text-brand-gold text-lg block mb-1">
                    {year}
                  </span>
                  <span
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.75)" }}
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
