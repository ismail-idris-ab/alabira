import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F2E8]/97 backdrop-blur-sm"
          : "bg-transparent"
      }`}
      style={{
        height: "64px",
        borderBottom: scrolled ? "1px solid rgba(15,26,20,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 h-full flex items-center justify-between gap-8">

        {/* Logo */}
        <a
          href="#"
          className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-sm"
          aria-label="Alabira Global Farm — Home"
        >
          <img
            src="/alabira logo.png"
            alt="Alabira Global Farm"
            className="h-10 w-auto object-contain transition-all duration-300"
            style={{
              filter: scrolled
                ? "none"
                : "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
            }}
          />
        </a>

        {/* Desktop nav — centered */}
        <nav
          className="hidden md:flex items-center gap-8 flex-1 justify-center"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-sans font-medium pb-px transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-sm ${
                  isActive
                    ? scrolled
                      ? "text-brand-ink"
                      : "text-white"
                    : scrolled
                    ? "text-brand-ink/55 hover:text-brand-ink"
                    : "text-white/65 hover:text-white"
                }`}
                style={{ fontSize: "13.5px", letterSpacing: "0.015em" }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-0 right-0 ${
                      scrolled ? "bg-brand-ink" : "bg-white"
                    }`}
                    style={{ height: "1px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className={`hidden md:inline-flex shrink-0 items-center font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ${
            scrolled
              ? "border border-brand-ink/25 text-brand-ink hover:bg-brand-ink hover:text-brand-cream hover:border-brand-ink focus:ring-offset-brand-cream"
              : "border border-white/40 text-white/90 hover:bg-white/10 hover:border-white/70 focus:ring-offset-transparent"
          }`}
          style={{
            fontSize: "13px",
            letterSpacing: "0.025em",
            padding: "8px 20px",
            borderRadius: "2px",
          }}
        >
          Get in Touch
        </a>

        {/* Hamburger */}
        <button
          className={`md:hidden p-2 -mr-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors ${
            scrolled ? "text-brand-ink" : "text-white"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.18 }}
                style={{ display: "block" }}
              >
                <X size={21} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.18 }}
                style={{ display: "block" }}
              >
                <Menu size={21} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile overlay — dark, editorial */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 top-[64px] z-40 md:hidden flex flex-col"
            style={{ backgroundColor: "#0F1A14" }}
          >
            <nav
              className="flex flex-col items-center justify-center flex-1 gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display italic py-2.5 px-8 transition-colors duration-150"
                  style={{
                    fontSize: "clamp(2rem, 9vw, 2.75rem)",
                    fontWeight: 400,
                    color:
                      activeSection === link.href.slice(1)
                        ? "#B8912A"
                        : "rgba(255,255,255,0.75)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: NAV_LINKS.length * 0.055 + 0.06,
                  duration: 0.28,
                }}
                className="mt-8 font-sans font-medium text-sm transition-all duration-200 hover:bg-[#B8912A] hover:text-[#0F1A14]"
                style={{
                  border: "1px solid #B8912A",
                  color: "#B8912A",
                  padding: "10px 32px",
                  borderRadius: "2px",
                  letterSpacing: "0.04em",
                }}
              >
                Get in Touch
              </motion.a>
            </nav>

            {/* Subtle bottom brand line */}
            <p
              className="text-center pb-8 font-sans"
              style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)" }}
            >
              ALABIRA GLOBAL FARM · JOS, NIGERIA
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
