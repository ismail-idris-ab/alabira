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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const val = menuOpen ? "hidden" : "";
    document.body.style.overflow = val;
    document.documentElement.style.overflow = val;
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 h-full flex items-center justify-between gap-8">

        {/* Logo */}
        <a
          href="#"
          className="shrink-0 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-sm"
          aria-label="Alabira Global Farm — Home"
        >
          <img
            src="/alabira-logo.svg"
            alt="Alabira Global Farm Tilde"
            width="148"
            height="33"
            className="h-8.25 w-auto brightness-0 invert"
          />
        </a>

        {/* Desktop nav */}
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
                className={`relative font-sans font-medium text-cta tracking-nav pb-px transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-sm ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
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
          className="hidden md:inline-flex shrink-0 items-center font-sans font-semibold text-[13px] tracking-cta py-2.25 px-5.5 rounded-[3px] border border-white/40 text-white/90 hover:bg-white/10 hover:border-white/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          Get in Touch
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden p-2.5 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40"
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
                className="block"
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
                className="block"
              >
                <Menu size={21} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-brand-ink pt-16"
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
                  className={`font-display italic text-mobile-nav font-normal py-2.5 px-8 transition-colors duration-150 ${
                    activeSection === link.href.slice(1) ? "text-brand-gold" : "text-white/75"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.055 + 0.06, duration: 0.28 }}
                className="mt-8 font-sans font-semibold text-sm bg-brand-green text-white hover:bg-brand-forest transition-colors duration-200 py-3 px-9 rounded-[3px] tracking-[0.04em]"
              >
                Get in Touch
              </motion.a>
            </nav>

            <p className="text-center pb-8 font-sans text-[11px] tracking-[0.15em] text-white/20">
              ALABIRA GLOBAL FARM · JOS, NIGERIA
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
