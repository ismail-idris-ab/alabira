import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ProductCard from "../ui/ProductCard";
import { productsApi } from "../../services/api";
import { staticProducts } from "../../data/static";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function SkeletonCard() {
  return (
    <div
      className="bg-white animate-pulse overflow-hidden"
      style={{ borderRadius: "4px", border: "1px solid rgba(15,26,20,0.08)" }}
    >
      <div style={{ height: "220px", backgroundColor: "rgba(127,176,138,0.12)" }} />
      <div className="p-5 space-y-3">
        <div className="h-4 rounded-sm w-3/4" style={{ backgroundColor: "rgba(15,26,20,0.07)" }} />
        <div className="h-3 rounded-sm w-full" style={{ backgroundColor: "rgba(15,26,20,0.05)" }} />
        <div className="h-3 rounded-sm w-2/3" style={{ backgroundColor: "rgba(15,26,20,0.05)" }} />
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    productsApi
      .list()
      .then((res) => setProducts(res.data.data || res.data))
      .catch(() => setProducts(staticProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="products" className="py-24 lg:py-36" style={{ backgroundColor: "#FDFAF5" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16" ref={ref}>

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-sans uppercase text-brand-sage"
            style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 500, marginBottom: "16px" }}
          >
            What We Grow
          </p>
          <h2
            className="font-display text-brand-ink"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            Our Organic Products
          </h2>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={cardVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certification banner */}
        <motion.div
          className="mt-10 py-4 px-8 text-center"
          style={{ backgroundColor: "#1B3A2D", borderRadius: "2px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p
            className="font-sans italic text-white/70"
            style={{ fontSize: "0.9375rem", letterSpacing: "0.01em" }}
          >
            All products are certified organic and ethically sourced
          </p>
        </motion.div>
      </div>
    </section>
  );
}
