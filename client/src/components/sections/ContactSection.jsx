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
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function ContactSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#4A3B32" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-brand-sage mb-4">
            Get In Touch
          </p>
          <h2
            className="font-serif font-bold text-brand-cream"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.01em",
            }}
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

          {/* Contact details + newsletter */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.25}
            className="flex flex-col gap-10"
          >
            {/* Details */}
            <div>
              <h3 className="font-serif font-semibold text-brand-cream text-xl mb-6">
                Contact Information
              </h3>
              <ul className="space-y-5">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <Icon size={20} className="text-brand-green mt-0.5 shrink-0" />
                    <div>
                      <span className="font-sans text-xs text-brand-clay uppercase tracking-widest block mb-1">
                        {label}
                      </span>
                      <a
                        href={href}
                        className="font-sans text-brand-cream hover:text-brand-sage transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded"
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
              <h3 className="font-serif font-semibold text-brand-cream text-xl mb-6">
                Follow Our Farm
              </h3>
              <div className="flex gap-3">
                {SOCIAL.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <h3 className="font-serif font-semibold text-brand-cream text-xl mb-4">
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
