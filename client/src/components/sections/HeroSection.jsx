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

      {/* Cinematic overlay — richer than a flat rgba */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(15,26,20,0.65) 0%, rgba(15,26,20,0.35) 45%, rgba(15,26,20,0.72) 100%)",
        }}
      />

      {/* Fallback when no image */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "#1B3A2D" }}
      />

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
          Est. 2024 &nbsp;&middot;&nbsp; Jos, Plateau State, Nigeria
        </motion.p>

        {/* Headline — Cormorant Garamond, editorial scale */}
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
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Feeding the World
          </em>
        </motion.h1>

        {/* Gold rule — brand anchor */}
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
      </motion.div>

      {/* Scroll indicator — editorial text + animated line */}
      <motion.div
        className="absolute flex flex-col items-center gap-2"
        style={{ bottom: "32px", left: "50%", transform: "translateX(-50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
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
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            transformOrigin: "top",
          }}
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Corner accents — thin L-brackets, architectural detail */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "28px",
          left: "28px",
          width: "36px",
          height: "36px",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          borderLeft: "1px solid rgba(255,255,255,0.12)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "28px",
          right: "28px",
          width: "36px",
          height: "36px",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          borderRight: "1px solid rgba(255,255,255,0.12)",
        }}
      />
    </section>
  );
}
