import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, ChevronDown } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ContactForm from "../ui/ContactForm";
import NewsletterForm from "../ui/NewsletterForm";

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@alabiraglobalfarm.com",
    href: "mailto:hello@alabiraglobalfarm.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jos, Plateau State, Nigeria",
    href: "#",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri, 8:00 am – 5:00 pm WAT\nWeekend farm tours by appointment",
    href: null,
  },
];

const BotanicalA = ({ size = 520, color = "#2E6B3E" }) => (
  <svg viewBox="0 0 70 100" width={size} height={size * 1.43} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="35" cy="8"  rx="3.5" ry="6"   fill={color}/>
    <ellipse cx="27" cy="13" rx="3"   ry="5.5" fill={color} transform="rotate(-22 27 13)"/>
    <ellipse cx="43" cy="13" rx="3"   ry="5.5" fill={color} transform="rotate(22 43 13)"/>
    <line x1="35" y1="16" x2="35"   y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="35" y1="16" x2="27.5" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="35" y1="16" x2="42.5" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M35,16 C30,36 16,55 5,84"  fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M35,16 C40,36 54,55 65,84" fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M21,50 Q35,45 49,50" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <path d="M2,84 Q35,92 68,84"  fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="5"  y1="84" x2="1"  y2="96" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <line x1="35" y1="92" x2="35" y2="98" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <line x1="65" y1="84" x2="69" y2="96" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const LeafSvg = ({ width = 220, height = 420 }) => (
  <svg viewBox="0 0 220 420" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <path d="M110,0 C185,90 200,240 110,420 C20,240 35,90 110,0" fill="#7FB08A"/>
    <path d="M110,40 C165,110 178,230 110,390 C42,230 55,110 110,40" fill="#2E6B3E" opacity="0.4"/>
  </svg>
);

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
    <section id="contact">

      {/* ── CTA Hero ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-brand-cream py-32 px-6 lg:px-24">

        {/* Gold top stripe */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent" />

        {/* Botanical A watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.055]">
          <BotanicalA size={520} color="#2E6B3E" />
        </div>

        {/* Leaf decorations */}
        <div className="absolute -top-10 -right-14 pointer-events-none opacity-[0.11]">
          <LeafSvg width={220} height={420} />
        </div>
        <div className="absolute -bottom-10 -left-14 pointer-events-none opacity-[0.09] rotate-180">
          <LeafSvg width={190} height={360} />
        </div>

        {/* Gold corner accents */}
        {[
          "top-8 left-10 border-t border-l",
          "top-8 right-10 border-t border-r",
          "bottom-8 left-10 border-b border-l",
          "bottom-8 right-10 border-b border-r",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute w-12 h-12 border-brand-gold/40 pointer-events-none ${pos}`}
          />
        ))}

        {/* Content */}
        <motion.div
          ref={ref}
          className="relative z-10 max-w-[780px] mx-auto text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp} custom={0.05}
            className="inline-flex items-center gap-3.5 font-sans text-[10.5px] font-medium tracking-[0.32em] uppercase text-brand-sage mb-10"
          >
            <span className="w-7 h-px bg-brand-sage/60" />
            Get in Touch
            <span className="w-7 h-px bg-brand-sage/60" />
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={fadeUp} custom={0.18} className="mb-7">
            <span className="block font-display font-bold text-brand-ink leading-[1.08] tracking-heading"
              style={{ fontSize: "clamp(2.6rem, 4.8vw, 4rem)" }}>
              From Farm to Your Table —
            </span>
            <span className="relative inline-block font-display font-semibold italic text-brand-forest leading-[1.08] tracking-heading"
              style={{ fontSize: "clamp(3rem, 5.5vw, 4.8rem)" }}>
              Let's Talk.
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-brand-gold/70 rounded-full" />
            </span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            variants={fadeUp} custom={0.3}
            className="font-sans text-[17px] font-light text-brand-clay leading-[1.75] max-w-[480px] mx-auto mt-7 mb-14"
          >
            Whether you're a distributor, retailer, or simply curious about our produce — we'd love to hear from you.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={0.42} className="flex flex-col items-center gap-5">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2.5 font-sans font-medium text-[14.5px] tracking-[0.04em] bg-brand-forest text-white px-11 py-[18px] rounded-[3px] shadow-[0_4px_24px_rgba(46,107,62,0.18)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-brand-green hover:shadow-[0_10px_36px_rgba(46,107,62,0.26)] focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              Start a Conversation
              <ArrowRight size={15} />
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 font-sans text-[13px] text-brand-clay hover:text-brand-forest transition-colors duration-200"
            >
              or fill in the form below
              <ChevronDown size={13} strokeWidth={1.5} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Decorative Divider ────────────────────────────────── */}
      <div className="flex items-center bg-brand-cream">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-ink/15 to-transparent" />
        <div className="px-7 opacity-50">
          <svg viewBox="0 0 70 60" width="28" height="24" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="35" cy="6" rx="3" ry="5" fill="#C9952A"/>
            <path d="M35,13 C30,24 18,36 8,52"  fill="none" stroke="#7FB08A" strokeWidth="4" strokeLinecap="round"/>
            <path d="M35,13 C40,24 52,36 62,52" fill="none" stroke="#7FB08A" strokeWidth="4" strokeLinecap="round"/>
            <path d="M21,37 Q35,33 49,37" fill="none" stroke="#7FB08A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-brand-ink/15 to-transparent" />
      </div>

      {/* ── Form + Info ───────────────────────────────────────── */}
      <div id="contact-form" className="relative bg-brand-white overflow-hidden py-24 lg:py-28 px-6 lg:px-24">

        {/* Top border */}
        <div className="absolute top-0 left-12 right-12 h-px bg-brand-ink/7" />

        {/* Faint bg botanical mark */}
        <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.04]">
          <BotanicalA size={360} color="#2E6B3E" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-22">

          {/* LEFT: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-brand-sage mb-9 flex items-center gap-3.5 after:block after:h-px after:bg-brand-ink/10 after:flex-1 after:max-w-[72px]">
              Send a Message
            </p>
            <ContactForm />
          </motion.div>

          {/* RIGHT: Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.22}
          >
            <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-brand-sage mb-9 flex items-center gap-3.5 after:block after:h-px after:bg-brand-ink/10 after:flex-1 after:max-w-[72px]">
              Contact Information
            </p>

            {/* Contact items */}
            <ul className="flex flex-col">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }, i) => (
                <li
                  key={label}
                  className={`flex gap-[18px] items-start py-5 border-brand-ink/8 ${
                    i === 0 ? "border-t border-b" : "border-b"
                  }`}
                >
                  <div className="flex items-center justify-center size-10 rounded-full bg-brand-forest/7 border border-brand-forest/14 shrink-0 mt-0.5">
                    <Icon size={15} className="text-brand-forest" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-[9.5px] tracking-[0.24em] uppercase text-brand-sage font-medium mb-1.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-sans text-[14px] font-light text-brand-brown leading-[1.65] hover:text-brand-forest transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans text-[14px] font-light text-brand-brown leading-[1.65] whitespace-pre-line">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="relative mt-8 px-7 py-7 bg-brand-forest/[0.05] border border-brand-forest/15 rounded-[6px] overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-brand-forest rounded-l-[6px]" />
              <NewsletterForm />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
