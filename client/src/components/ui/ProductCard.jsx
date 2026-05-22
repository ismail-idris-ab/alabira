import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { name, category, description } = product;
  const imageUrl = product.image?.url || product.imageUrl;

  return (
    <motion.article
      className="bg-white rounded-2xl overflow-hidden border flex flex-col"
      style={{ borderColor: "rgba(78,59,50,0.1)" }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2, ease: "ease" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "220px",
          background: "linear-gradient(135deg, #7FB08A 0%, #2E6B3E 100%)",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="eager"
          />
        )}
        {category && (
          <span
            className="absolute top-3 left-3 bg-brand-green text-white font-sans font-medium text-xs px-3 py-1 rounded-lg"
            style={{ letterSpacing: "0.02em" }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-brand-brown mb-2" style={{ fontSize: "1.25rem" }}>
          {name}
        </h3>
        <p
          className="font-sans text-brand-clay text-sm leading-relaxed flex-1 mb-4"
          style={{
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
          className="font-sans font-medium text-brand-green text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-brand-green rounded self-start"
        >
          Learn More →
        </a>
      </div>
    </motion.article>
  );
}
