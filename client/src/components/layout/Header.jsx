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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
      style={{ height: "72px" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-green rounded"
        >
          <img
            src="/alabira logo.png"
            alt="Alabira Global Farm"
            className="h-12 w-auto object-contain transition-all duration-200"
            style={{
              filter: scrolled
                ? "none"
                : "brightness(0) invert(1) drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans font-medium text-[15px] transition-colors relative pb-1 focus:outline-none focus:ring-2 focus:ring-brand-green rounded ${
                activeSection === link.href.slice(1)
                  ? "text-brand-green after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-green"
                  : scrolled
                  ? "text-brand-brown hover:text-brand-green"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 bg-brand-green text-white font-sans font-medium text-sm px-8 py-3 rounded-xl hover:bg-[#1F4D2C] hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-green ${
            scrolled ? "text-brand-brown" : "text-white"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile slide-in overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-white z-40 flex flex-col px-6 py-10 gap-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-sans font-medium text-2xl transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-brand-green"
                    : "text-brand-brown"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-brand-green text-white font-sans font-medium text-base px-8 py-4 rounded-xl text-center hover:bg-[#1F4D2C] transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
