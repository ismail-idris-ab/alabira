import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const STATS = [
  { num: "500", sup: "+", label: "Hectares Farmed" },
  { num: "40", sup: "+", label: "Organic Products" },
  { num: "18", sup: null, label: "Countries Reached" },
  { num: "100", sup: "%", label: "Certified Organic" },
];

// Hero palette (reference design values, independent of global brand tokens)
const GOLD = "#C4A35A";
const CREAM = "#F0E6CC";

// Border classes per stat index — mobile 2×2, desktop 4×1
const STAT_BORDERS = [
  "border-r border-b sm:border-b-0 border-[#F0E6CC]/[0.08]",
  "border-b sm:border-b-0 sm:border-r border-[#F0E6CC]/[0.08]",
  "border-r border-b sm:border-b-0 border-[#F0E6CC]/[0.08]",
  "border-b sm:border-b-0 border-[#F0E6CC]/[0.08]",
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 bg-hero-grain pointer-events-none z-[5] opacity-55 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Corner accent glows */}
      <div
        className="absolute -top-[120px] -left-[120px] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: `radial-gradient(circle, ${GOLD} 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[100px] -right-[100px] w-[320px] h-[320px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: `radial-gradient(circle, ${GOLD} 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[60px] left-[8%] w-[200px] h-[200px] rounded-full border border-[#C4A35A] pointer-events-none opacity-[0.06]"
        aria-hidden="true"
      />

      {/* Globe decoration */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute w-[min(760px,90vw)] h-[min(760px,90vw)] rounded-full border border-[#C4A35A]/10" />
        <div className="absolute w-[min(680px,82vw)] h-[min(680px,82vw)] rounded-full border border-white/[0.04]" />
        <div className="absolute w-[min(540px,72vw)] h-[min(540px,72vw)] rounded-full border border-dashed border-[#C4A35A]/[0.06]" />
        <svg
          className="absolute w-[min(760px,90vw)] h-[min(760px,90vw)] opacity-[0.07]"
          viewBox="0 0 760 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="380" cy="380" r="370" stroke={GOLD} strokeWidth="0.5" />
          <ellipse
            cx="380"
            cy="380"
            rx="370"
            ry="120"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <ellipse
            cx="380"
            cy="380"
            rx="370"
            ry="220"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <ellipse
            cx="380"
            cy="380"
            rx="120"
            ry="370"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <ellipse
            cx="380"
            cy="380"
            rx="220"
            ry="370"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="380"
            x2="750"
            y2="380"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <line
            x1="380"
            y1="10"
            x2="380"
            y2="750"
            stroke={GOLD}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Side labels — desktop only */}
      <p
        className="hidden lg:block absolute left-14 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-sans text-label text-white/20 uppercase tracking-editorial whitespace-nowrap pointer-events-none z-[5]"
        aria-hidden="true"
      >
        Est. 2024 &middot; Jos, Plateau State, Nigeria
      </p>
      <p
        className="hidden lg:block absolute right-14 top-1/2 -translate-y-1/2 rotate-90 origin-center font-sans text-label text-white/20 uppercase tracking-editorial whitespace-nowrap pointer-events-none z-[5]"
        aria-hidden="true"
      >
        Certified Organic &middot; Sustainably Farmed
      </p>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 max-w-[1060px] w-full pt-32 sm:pt-40 pb-24 sm:pb-30"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Origin pill tag */}

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-hero font-semibold tracking-heading leading-[0.94] text-[#F0E6CC]"
        >
          <span className="block">Nurturing Nature</span>
          {/* <span className="block">Nature,</span> */}
          <em className="block font-light italic text-[#F0E6CC]/55">
            Feeding the World
          </em>
        </motion.h1>

        {/* Ornament */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 my-7"
          aria-hidden="true"
        >
          <div className="flex-1 max-w-20 h-px bg-[#C4A35A]/45" />
          <div className="w-1.5 h-1.5 bg-[#C4A35A] rotate-45 shrink-0" />
          <div className="flex-1 max-w-20 h-px bg-[#C4A35A]/45" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-body-fluid font-light text-[#F0E6CC]/55 max-w-[520px] leading-[1.85] mb-12 tracking-[0.01em]"
        >
          At Alabira Global Farm Tilde, we are committed to producing certified organic, high quality crops through sustainable and eco-friendly farming practices. <br/> our work is guided by environmental responsibility, community engagement, and economic enpowerment. <br/> We aim to deliver fresh, nutritious food while while contributing to a healthier planet and stronger communities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto"
        >
          <a
            href="#products"
            className="font-sans font-semibold text-cta text-brand-ink uppercase tracking-cta px-[38px] py-[15px] rounded-[4px] bg-[#C4A35A] w-full sm:w-auto text-center transition-all duration-250 hover:-translate-y-[3px] hover:bg-[#ceac62] hover:shadow-[0_16px_40px_rgba(196,163,90,0.35)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#C4A35A] focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Explore Our Products
          </a>
          <a
            href="#about"
            className="font-sans font-medium text-cta text-[#F0E6CC]/90 uppercase tracking-cta px-[34px] py-[14px] rounded-[4px] border border-[#F0E6CC]/20 w-full sm:w-auto text-center transition-all duration-250 hover:border-[#F0E6CC]/50 hover:bg-[#F0E6CC]/[0.07] hover:text-[#F0E6CC] focus:outline-none focus:ring-2 focus:ring-white"
          >
            Our Story
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          className="w-full border-t border-[#F0E6CC]/10 flex flex-wrap"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 min-w-[50%] sm:min-w-0 flex flex-col items-center py-8 px-4 gap-2 ${STAT_BORDERS[i]}`}
            >
              <div
                className="font-display text-stat font-semibold leading-none tracking-heading-sm"
                style={{ color: GOLD }}
              >
                {stat.num}
                {stat.sup && (
                  <sup className="text-[0.45em] align-super">{stat.sup}</sup>
                )}
              </div>
              <div
                className="w-4 h-px opacity-30"
                style={{ background: GOLD }}
              />
              <div className="font-sans text-label uppercase tracking-footer text-[#F0E6CC]/40 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden="true"
      >
        <div className="w-px h-14 bg-white/15 relative overflow-hidden rounded-[1px]">
          <motion.div
            className="absolute left-0 w-full bg-[#C4A35A]"
            animate={{
              height: ["0%", "100%", "0%"],
              top: ["0%", "0%", "100%"],
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
        <span className="font-sans text-label text-white/30 uppercase tracking-editorial">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
