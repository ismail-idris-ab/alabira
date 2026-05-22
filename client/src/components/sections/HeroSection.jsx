import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/hero.webp'), url('/images/hero.jpg')",
          backgroundPosition: "center top",
        }}
        role="img"
        aria-label="Lush green farm fields at golden hour"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,30,30,0.5) 0%, rgba(30,30,30,0.2) 100%)",
        }}
      />

      {/* Fallback solid colour when no image */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "#2E6B3E" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="font-serif font-bold text-white leading-tight mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Nurturing Nature,
          <br />
          Feeding the World
        </motion.h1>

        <motion.p
          className="font-sans text-white/85 mb-10 mx-auto"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", maxWidth: "560px" }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          Sustainable organic farming from the heart of Nigeria — certified,
          ethical, and delivered globally.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          <a
            href="#products"
            className="bg-brand-green text-white font-sans font-medium text-lg px-10 py-4 rounded-xl hover:bg-[#1F4D2C] hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            style={{ minWidth: "200px" }}
          >
            Our Products
          </a>
          <a
            href="#about"
            className="border-2 border-white/70 text-white font-sans font-medium text-lg px-10 py-4 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
        aria-label="Scroll to next section"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}
