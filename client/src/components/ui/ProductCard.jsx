import { motion } from "framer-motion";

const CATEGORY_LABELS = {
  livestock: "Livestock",
  grains: "Grains",
  produce: "Produce",
  specialty: "Specialty",
};

export default function ProductCard({ product }) {
  const { name, category, description } = product;
  const imageUrl = product.image?.url || product.imageUrl;

  return (
    <motion.article
      className="bg-white flex flex-col overflow-hidden"
      style={{ borderRadius: "4px", border: "1px solid rgba(15,26,20,0.08)" }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(15,26,20,0.10)" }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "220px", background: "linear-gradient(135deg, #1B3A2D 0%, #7FB08A 100%)" }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
        )}
        {category && (
          <span
            className="absolute top-3 left-3 font-sans font-medium text-white"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backgroundColor: "rgba(15,26,20,0.65)",
              backdropFilter: "blur(4px)",
              padding: "4px 10px",
              borderRadius: "2px",
            }}
          >
            {CATEGORY_LABELS[category] || category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display text-brand-ink"
          style={{ fontSize: "1.2rem", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px" }}
        >
          {name}
        </h3>
        <p
          className="font-sans text-brand-ink/50 leading-relaxed flex-1"
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.65,
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
        <a
          href="#contact"
          className="font-sans font-medium text-brand-green transition-colors hover:text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-green rounded-sm self-start"
          style={{ fontSize: "13px", letterSpacing: "0.02em" }}
        >
          Enquire →
        </a>
      </div>
    </motion.article>
  );
}
