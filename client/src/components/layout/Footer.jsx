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
    <footer style={{ backgroundColor: "#0F1A14" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Main footer grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Brand column */}
          <div className="md:col-span-5">
            <img
              src="/alabira logo.png"
              alt="Alabira Global Farm"
              className="h-12 w-auto object-contain mb-6"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
            />
            <p
              className="font-sans leading-relaxed"
              style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "320px" }}
            >
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
                  className="flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "2px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="md:col-span-2" />

          {/* Quick links */}
          <div className="md:col-span-2">
            <p
              className="font-sans uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.18em", fontWeight: 500, color: "rgba(255,255,255,0.28)", marginBottom: "20px" }}
            >
              Navigate
            </p>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-sans transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-brand-sage rounded-sm"
                    style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div className="md:col-span-3">
            <p
              className="font-sans uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.18em", fontWeight: 500, color: "rgba(255,255,255,0.28)", marginBottom: "20px" }}
            >
              Get In Touch
            </p>
            <ul className="space-y-4">
              {[
                { label: "Email", value: "hello@alabiraglobalfarm.com", href: "mailto:hello@alabiraglobalfarm.com" },
                { label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
                { label: "Location", value: "Jos, Plateau State, Nigeria", href: "#" },
              ].map(({ label, value, href }) => (
                <li key={label}>
                  <span
                    className="font-sans block"
                    style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "3px", fontWeight: 500 }}
                  >
                    {label}
                  </span>
                  <a
                    href={href}
                    className="font-sans transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-brand-sage rounded-sm"
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p
            className="font-sans"
            style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.01em" }}
          >
            © {new Date().getFullYear()} Alabira Global Farm Tilde. All rights reserved.
          </p>
          <p
            className="font-sans italic"
            style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)" }}
          >
            Nurturing Nature · Feeding the World
          </p>
        </div>
      </div>
    </footer>
  );
}
