import { motion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";

const CATEGORY_LABELS = {
  livestock: "Livestock",
  grains: "Grains",
  produce: "Produce",
  specialty: "Specialty",
};

const CATEGORY_COLORS = {
  livestock: "bg-amber-900/70",
  grains:    "bg-brand-ink/65",
  produce:   "bg-brand-forest/75",
  specialty: "bg-brand-gold/80",
};

export default function ProductCard({ product }) {
  const { name, category, description } = product;
  const imageUrl = product.image?.url || product.imageUrl;
  const badgeBg = CATEGORY_COLORS[category] || "bg-brand-ink/65";

  return (
    <motion.article
      className="group bg-brand-white flex flex-col overflow-hidden relative rounded-[6px] border border-brand-ink/[7%] shadow-[0_2px_12px_rgba(15,26,20,0.05)]"
      whileHover={{ y: -5, boxShadow: "0 24px 56px rgba(15,26,20,0.13)" }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image / Placeholder */}
      <div className="relative overflow-hidden h-[196px] bg-card-gradient">
        {imageUrl ? (
          <>
            <div className="absolute inset-0 animate-pulse bg-brand-sage/[0.10]" />
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:scale-[1.06]"
              loading="lazy"
              onLoad={(e) => { e.target.style.opacity = "1"; }}
            />
          </>
        ) : (
          /* Botanical placeholder when no image */
          <div className="absolute inset-0 flex items-end justify-center pb-4 overflow-hidden">
            <svg
              viewBox="0 0 120 100"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 opacity-[0.12]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M60,10 C48,35 22,58 8,90" stroke="#C4A35A" strokeWidth="3" strokeLinecap="round"/>
              <path d="M60,10 C72,35 98,58 112,90" stroke="#C4A35A" strokeWidth="3" strokeLinecap="round"/>
              <path d="M38,55 Q60,49 82,55" stroke="#C4A35A" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M5,90 Q60,100 115,90" stroke="#C4A35A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <ellipse cx="60" cy="6" rx="5" ry="7" fill="#C9922B"/>
              <ellipse cx="50" cy="11" rx="4" ry="6" fill="#C9922B" transform="rotate(-20 50 11)"/>
              <ellipse cx="70" cy="11" rx="4" ry="6" fill="#C9922B" transform="rotate(20 70 11)"/>
            </svg>
            <Leaf size={22} className="text-brand-gold/40 relative z-10" strokeWidth={1.2} />
          </div>
        )}

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        {category && (
          <span className={`absolute bottom-3 left-3 font-sans font-medium text-white text-[10px] tracking-[0.12em] uppercase ${badgeBg} backdrop-blur-[6px] py-[5px] px-3 rounded-[3px]`}>
            {CATEGORY_LABELS[category] || category}
          </span>
        )}

        {/* Arrow on hover */}
        <div className="absolute top-3 right-3 flex items-center justify-center size-7 rounded-[3px] bg-white/95 text-brand-ink opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 shadow-sm">
          <ArrowUpRight size={13} strokeWidth={2.2} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-brand-ink text-[1.15rem] font-semibold tracking-heading-sm leading-[1.18] mb-2">
          {name}
        </h3>
        <p className="font-sans text-brand-ink/50 text-[13.5px] leading-[1.68] mb-5 flex-1 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-brand-ink/[6%]">
          <a
            href="#contact"
            className="font-sans font-semibold text-brand-green text-[13px] flex items-center gap-1.5 transition-all duration-200 hover:text-brand-forest hover:gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-sm"
          >
            Enquire
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
        </div>
      </div>
    </motion.article>
  );
}
