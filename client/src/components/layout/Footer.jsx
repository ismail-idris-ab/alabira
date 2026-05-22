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
    <footer style={{ backgroundColor: "#1E1E1E" }} className="text-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/alabira logo.png"
                alt="Alabira Global Farm"
                className="h-14 w-auto object-contain mb-1"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="font-sans italic text-sm text-brand-clay leading-relaxed">
              Nurturing Nature, Feeding the World. Sustainable organic farming
              from the heart of Nigeria.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-sans font-medium text-sm uppercase tracking-widest text-brand-clay mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-brand-cream hover:text-brand-sage hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-sans font-medium text-sm uppercase tracking-widest text-brand-clay mb-6">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="font-sans text-xs text-brand-clay">
            © {new Date().getFullYear()} Alabira Global Farm Tilde. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
