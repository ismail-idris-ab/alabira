import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { IconInstagram, IconFacebook, IconLinkedin, IconYoutube } from "../ui/SocialIcons";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ContactForm from "../ui/ContactForm";
import NewsletterForm from "../ui/NewsletterForm";

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "hello@alabiraglobalfarm.com", href: "mailto:hello@alabiraglobalfarm.com" },
  { icon: Phone, label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
  { icon: MapPin, label: "Address", value: "Jos, Plateau State, Nigeria", href: "#" },
];

const SOCIAL = [
  { icon: IconInstagram, label: "Instagram", href: "#" },
  { icon: IconFacebook, label: "Facebook", href: "#" },
  { icon: IconLinkedin, label: "LinkedIn", href: "#" },
  { icon: IconYoutube, label: "YouTube", href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function ContactSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="contact" className="py-24 lg:py-36" style={{ backgroundColor: "#0F1A14" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-24" ref={ref}>

        {/* Heading */}
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p
            className="font-sans uppercase text-brand-sage"
            style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "16px" }}
          >
            Get In Touch
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            Let's Work Together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            <ContactForm />
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.22}
            className="flex flex-col gap-10"
          >
            {/* Contact details */}
            <div>
              <h3
                className="font-display text-white"
                style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "20px" }}
              >
                Contact Information
              </h3>
              <ul className="space-y-5">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <Icon size={16} color="rgba(127,176,138,0.7)" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <div>
                      <span
                        className="font-sans block"
                        style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "3px", fontWeight: 500 }}
                      >
                        {label}
                      </span>
                      <a
                        href={href}
                        className="font-sans transition-colors focus:outline-none focus:ring-1 focus:ring-brand-sage rounded-sm"
                        style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)" }}
                        onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.95)"}
                        onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}
                      >
                        {value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3
                className="font-display text-white"
                style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "16px" }}
              >
                Follow Our Farm
              </h3>
              <div className="flex gap-2">
                {SOCIAL.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "2px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "32px" }}>
              <h3
                className="font-display text-white"
                style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "16px" }}
              >
                Join Our Community
              </h3>
              <NewsletterForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
