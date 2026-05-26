import { IconInstagram, IconFacebook, IconLinkedin, IconYoutube } from "../ui/SocialIcons";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Global Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL = [
  { icon: IconInstagram, label: "Instagram", href: "#" },
  { icon: IconFacebook, label: "Facebook", href: "#" },
  { icon: IconLinkedin, label: "LinkedIn", href: "#" },
  { icon: IconYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/[8%]">

          {/* Brand column */}
          <div className="md:col-span-5">
            <a href="#" className="inline-block mb-6 focus:outline-none focus:ring-1 focus:ring-brand-sage rounded-sm">
              <img
                src="/alabira-logo.svg"
                alt="Alabira Global Farm Tilde"
                width="160"
                height="36"
                className="h-9 w-auto brightness-0 invert opacity-85"
              />
            </a>

            <p className="font-sans text-[15px] text-white/40 leading-[1.75] max-w-[300px]">
              Sustainable organic farming from the heart of Nigeria — nurturing
              nature and feeding communities since 2010.
            </p>

            {/* Social row */}
            <div className="flex gap-2 mt-8">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center size-9 rounded-[3px] border border-white/10 text-white/40 transition-all duration-200 hover:bg-white/[6%] hover:text-white/85 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick links */}
          <div className="md:col-span-2">
            <p className="font-sans text-label tracking-footer font-semibold uppercase text-white/[28%] mb-5">
              Navigate
            </p>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-sans text-[0.9rem] text-white/45 transition-colors duration-150 hover:text-white/85 focus:outline-none focus:ring-1 focus:ring-brand-sage rounded-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div className="md:col-span-4">
            <p className="font-sans text-label tracking-footer font-semibold uppercase text-white/[28%] mb-5">
              Get In Touch
            </p>
            <ul className="space-y-5">
              {[
                { label: "Email", value: "hello@alabiraglobalfarm.com", href: "mailto:hello@alabiraglobalfarm.com" },
                { label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
                { label: "Location", value: "Jos, Plateau State, Nigeria", href: "#" },
              ].map(({ label, value, href }) => (
                <li key={label}>
                  <span className="font-sans block text-[10px] tracking-[0.14em] uppercase text-white/[22%] mb-1 font-semibold">
                    {label}
                  </span>
                  <a
                    href={href}
                    className="font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white/85 focus:outline-none focus:ring-1 focus:ring-brand-sage rounded-sm"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center mt-8 font-sans font-semibold text-[13px] tracking-cta py-2.5 px-6 rounded-[3px] bg-brand-green text-white hover:bg-brand-forest transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sage"
            >
              Start a Conversation
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p className="font-sans text-xs text-white/[22%] tracking-[0.01em] text-center sm:text-left">
            © {new Date().getFullYear()} Alabira Global Farm. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-sans text-xs text-white/[22%] hover:text-white/55 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
