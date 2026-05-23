import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function CTABannerSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      aria-label="Call to action"
      style={{ backgroundColor: "#1B3A2D", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle diagonal texture lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(255,255,255,0.018) 60px, rgba(255,255,255,0.018) 61px)",
          pointerEvents: "none",
        }}
      />

      {/* Corner gold accents */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "28px",
          left: "28px",
          width: "32px",
          height: "32px",
          borderTop: "1px solid rgba(184,145,42,0.35)",
          borderLeft: "1px solid rgba(184,145,42,0.35)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "28px",
          right: "28px",
          width: "32px",
          height: "32px",
          borderBottom: "1px solid rgba(184,145,42,0.35)",
          borderRight: "1px solid rgba(184,145,42,0.35)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-28" ref={ref}>
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left — headline */}
          <div style={{ maxWidth: "580px" }}>
            <p
              className="font-sans uppercase text-brand-sage"
              style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "16px" }}
            >
              Ready to Source Organic?
            </p>
            <h2
              className="font-display text-white"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              From Our Farm to Your Table —{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.65)" }}>
                Start the Conversation
              </em>
            </h2>
            <p
              className="font-sans mt-5"
              style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "440px" }}
            >
              Whether you need a bulk supply agreement, a wholesale partnership,
              or a custom growing arrangement — our team responds within 24 hours.
            </p>
          </div>

          {/* Right — CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row lg:flex-col gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <a
              href="#contact"
              className="font-sans font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#B8912A] hover:bg-[#9A7820]"
              style={{
                backgroundColor: "#B8912A",
                fontSize: "13.5px",
                letterSpacing: "0.03em",
                padding: "13px 36px",
                borderRadius: "2px",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Get In Touch
            </a>
            <a
              href="#products"
              className="font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              style={{
                fontSize: "13.5px",
                letterSpacing: "0.03em",
                padding: "12px 36px",
                borderRadius: "2px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                e.currentTarget.style.color = "rgba(255,255,255,0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              Browse Products
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          className="flex flex-wrap items-center gap-8 mt-14 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          {[
            { value: "24h", label: "Response Time" },
            { value: "MOQ Flexible", label: "Minimum Order" },
            { value: "Global Shipping", label: "Export Certified" },
            { value: "Net 30", label: "Payment Terms" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-8">
              {i > 0 && (
                <div
                  style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.1)" }}
                />
              )}
              <div>
                <p
                  className="font-display text-white"
                  style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}
                >
                  {value}
                </p>
                <p
                  className="font-sans uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
