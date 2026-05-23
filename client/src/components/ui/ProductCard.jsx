import { useState } from "react";
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
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="bg-white flex flex-col overflow-hidden"
      style={{ borderRadius: "4px", border: "1px solid rgba(15,26,20,0.08)", cursor: "pointer" }}
      whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(15,26,20,0.12)" }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "220px", background: "linear-gradient(135deg, #1B3A2D 0%, #7FB08A 100%)" }}
      >
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="eager"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Category badge */}
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

        {/* Arrow indicator — Prodmast-style, appears on hover */}
        <motion.div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "30px",
            height: "30px",
            borderRadius: "2px",
            backgroundColor: "#B8912A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.18 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
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

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid rgba(15,26,20,0.06)",
          }}
        >
          <a
            href="#contact"
            className="font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded-sm"
            style={{ fontSize: "13px", letterSpacing: "0.02em", color: hovered ? "#B8912A" : "#1B3A2D" }}
          >
            Enquire →
          </a>
          <span
            className="font-sans uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.16em", color: "rgba(15,26,20,0.25)" }}
          >
            Organic
          </span>
        </div>
      </div>
    </motion.article>
  );
}
