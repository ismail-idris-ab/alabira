import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const BENEFITS = [
  {
    title: "Farm-Direct Quality Assurance",
    description:
      "Every batch is traceable from soil to shipment. NASC-certified processes ensure zero adulteration — what you order is exactly what we grow.",
  },
  {
    title: "Scalable Supply for Any Volume",
    description:
      "From boutique restaurant orders to bulk B2B contracts, our 5,000-acre operation flexes to your demand without compromising freshness or lead time.",
  },
  {
    title: "Sustainability Built Into the Price",
    description:
      "Solar irrigation, zero-waste processing, and active reforestation aren't add-ons — they're baked into every product, at no premium to you.",
  },
];

const METRICS = [
  { value: "13", label: "Product Lines", sub: "Livestock · Grains · Produce · Specialty" },
  { value: "100%", label: "Solar Powered", sub: "Irrigation & processing facility" },
  { value: "2014", label: "Certified Since", sub: "NASC Organic Certification" },
  { value: "0%", label: "Waste Output", sub: "Full circular processing cycle" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function BenefitsSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="benefits"
      className="py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#FDFAF5" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Farm metrics dashboard card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Main card */}
            <div
              style={{
                backgroundColor: "#0F1A14",
                borderRadius: "8px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle radial glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "240px",
                  height: "240px",
                  background: "radial-gradient(circle, rgba(127,176,138,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p
                    className="font-sans uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", fontWeight: 500, marginBottom: "4px" }}
                  >
                    Farm Overview
                  </p>
                  <p
                    className="font-display text-white"
                    style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}
                  >
                    Alabira Global Farm
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "rgba(127,176,138,0.15)",
                    border: "1px solid rgba(127,176,138,0.3)",
                    borderRadius: "2px",
                    padding: "5px 10px",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#7FB08A" }} />
                  <span className="font-sans" style={{ fontSize: "11px", color: "#7FB08A", letterSpacing: "0.04em" }}>Active</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3">
                {METRICS.map(({ value, label, sub }, i) => (
                  <div
                    key={label}
                    style={{
                      backgroundColor: i === 0 ? "rgba(184,145,42,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${i === 0 ? "rgba(184,145,42,0.25)" : "rgba(255,255,255,0.07)"}`,
                      borderRadius: "4px",
                      padding: "18px 16px",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: "1.875rem",
                        fontWeight: 600,
                        letterSpacing: "-0.03em",
                        color: i === 0 ? "#B8912A" : "rgba(255,255,255,0.9)",
                        lineHeight: 1,
                        marginBottom: "6px",
                      }}
                    >
                      {value}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.55)", marginBottom: "3px" }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", lineHeight: 1.4 }}
                    >
                      {sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress bar row */}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Annual Supply Capacity</span>
                  <span className="font-sans" style={{ fontSize: "11px", color: "#7FB08A" }}>87% allocated</span>
                </div>
                <div style={{ height: "4px", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", backgroundColor: "#7FB08A", borderRadius: "2px" }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: "87%" } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-sans" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Organic Certification Coverage</span>
                  <span className="font-sans" style={{ fontSize: "11px", color: "#B8912A" }}>100%</span>
                </div>
                <div style={{ height: "4px", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden", marginTop: "6px" }}>
                  <motion.div
                    style={{ height: "100%", backgroundColor: "#B8912A", borderRadius: "2px" }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                backgroundColor: "#B8912A",
                borderRadius: "4px",
                padding: "14px 18px",
                boxShadow: "0 8px 32px rgba(184,145,42,0.3)",
              }}
            >
              <p
                className="font-display text-white"
                style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}
              >
                10,000+
              </p>
              <p
                className="font-sans text-white/75 uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.16em", marginTop: "4px" }}
              >
                Trees Planted
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Benefits bullets */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <p
                className="font-sans uppercase text-brand-sage"
                style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "16px" }}
              >
                Why Alabira
              </p>
              <h2
                className="font-display text-brand-ink"
                style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}
              >
                Key Benefits for Your
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "#1B3A2D" }}>Business &amp; Community</em>
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#B8912A", marginTop: "20px" }} />
            </motion.div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-8"
            >
              {BENEFITS.map(({ title, description }, i) => (
                <motion.li key={title} variants={itemVariants} className="flex gap-4">
                  {/* Gold checkmark */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "2px",
                      backgroundColor: "rgba(184,145,42,0.12)",
                      border: "1px solid rgba(184,145,42,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8912A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-display text-brand-ink"
                      style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "6px" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="font-sans text-brand-ink/55 leading-relaxed"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.72 }}
                    >
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA link */}
            <motion.a
              href="#products"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="inline-flex items-center gap-2 font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-sage"
              style={{
                marginTop: "36px",
                fontSize: "13.5px",
                letterSpacing: "0.02em",
                color: "#1B3A2D",
                borderBottom: "1px solid rgba(27,58,45,0.35)",
                paddingBottom: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#B8912A";
                e.currentTarget.style.borderBottomColor = "rgba(184,145,42,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#1B3A2D";
                e.currentTarget.style.borderBottomColor = "rgba(27,58,45,0.35)";
              }}
            >
              View all products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
