import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.webp'), url('/images/hero.jpg')",
        }}
        role="img"
        aria-label="Lush green farm fields at golden hour"
      />

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(15,26,20,0.72) 0%, rgba(15,26,20,0.38) 45%, rgba(15,26,20,0.75) 100%)",
        }}
      />

      {/* Fallback */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: "#1B3A2D" }} />

      {/* Floating badge — left (certification) */}
      <motion.div
        className="absolute hidden lg:flex flex-col items-start"
        style={{ left: "clamp(24px, 5vw, 80px)", top: "50%", transform: "translateY(-120%)" }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.0 }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            backgroundColor: "rgba(15,26,20,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(184,145,42,0.3)",
            borderRadius: "4px",
            padding: "14px 18px",
            minWidth: "190px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "2px",
              backgroundColor: "rgba(184,145,42,0.18)",
              border: "1px solid rgba(184,145,42,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8912A" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p
              className="font-sans"
              style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8912A", fontWeight: 500, marginBottom: "2px" }}
            >
              Certified Organic
            </p>
            <p
              className="font-display"
              style={{ fontSize: "0.9375rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em" }}
            >
              NASC Approved
            </p>
          </div>
        </div>
        {/* Connecting line */}
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(184,145,42,0.4), transparent)", marginLeft: "29px" }} />
      </motion.div>

      {/* Floating badge — right (families) */}
      <motion.div
        className="absolute hidden lg:flex flex-col items-end"
        style={{ right: "clamp(24px, 5vw, 80px)", top: "50%", transform: "translateY(-60%)" }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.15 }}
      >
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(127,176,138,0.4))", marginRight: "29px" }} />
        <div
          className="flex items-center gap-3"
          style={{
            backgroundColor: "rgba(15,26,20,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(127,176,138,0.25)",
            borderRadius: "4px",
            padding: "14px 18px",
            minWidth: "190px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "2px",
              backgroundColor: "rgba(127,176,138,0.15)",
              border: "1px solid rgba(127,176,138,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7FB08A" strokeWidth="1.5">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p
              className="font-display"
              style={{ fontSize: "1.375rem", fontWeight: 600, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              500+
            </p>
            <p
              className="font-sans"
              style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 500, marginTop: "3px" }}
            >
              Families Supported
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ maxWidth: "820px" }}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-white/50 uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.22em", marginBottom: "36px" }}
        >
          Est. 2010 &nbsp;&middot;&nbsp; Jos, Plateau State, Nigeria
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-white"
          style={{
            fontSize: "clamp(3.25rem, 8.5vw, 6.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
          }}
        >
          Nurturing Nature,
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.82)" }}>
            Feeding the World
          </em>
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          variants={fadeUp}
          style={{
            width: "56px",
            height: "1px",
            backgroundColor: "#B8912A",
            margin: "32px auto",
          }}
        />

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-white/60 leading-relaxed"
          style={{
            fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)",
            maxWidth: "460px",
            lineHeight: 1.75,
          }}
        >
          Certified organic produce from the highlands of Nigeria —
          sustainably farmed, ethically sourced, delivered globally.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3 mt-10"
        >
          <a
            href="#products"
            className="font-sans font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#B8912A] focus:ring-offset-2 focus:ring-offset-transparent hover:bg-[#9A7820]"
            style={{
              backgroundColor: "#B8912A",
              fontSize: "13.5px",
              letterSpacing: "0.03em",
              padding: "12px 32px",
              borderRadius: "2px",
              minWidth: "180px",
              textAlign: "center",
            }}
          >
            Explore Our Products
          </a>
          <a
            href="#about"
            className="font-sans font-medium text-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white hover:text-white hover:border-white/70"
            style={{
              fontSize: "13.5px",
              letterSpacing: "0.03em",
              padding: "11px 32px",
              borderRadius: "2px",
              border: "1px solid rgba(255,255,255,0.35)",
              minWidth: "180px",
              textAlign: "center",
            }}
          >
            Our Story
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-6 mt-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}
        >
          {[
            { value: "5,000+", label: "Acres" },
            { value: "4", label: "Farm Locations" },
            { value: "14+", label: "Years Farming" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-6">
              {i > 0 && <div style={{ width: "1px", height: "24px", backgroundColor: "rgba(255,255,255,0.12)" }} />}
              <div className="text-center">
                <p
                  className="font-display text-white"
                  style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}
                >
                  {value}
                </p>
                <p
                  className="font-sans text-white/40 uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.16em", marginTop: "4px" }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute flex flex-col items-center gap-2"
        style={{ bottom: "32px", left: "50%", transform: "translateX(-50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span
          className="font-sans text-white/35 uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.22em" }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            transformOrigin: "top",
          }}
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Corner accents */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ bottom: "28px", left: "28px", width: "36px", height: "36px", borderBottom: "1px solid rgba(255,255,255,0.12)", borderLeft: "1px solid rgba(255,255,255,0.12)" }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ bottom: "28px", right: "28px", width: "36px", height: "36px", borderBottom: "1px solid rgba(255,255,255,0.12)", borderRight: "1px solid rgba(255,255,255,0.12)" }}
      />
    </section>
  );
}
