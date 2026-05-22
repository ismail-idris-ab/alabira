import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ProductCard from "../ui/ProductCard";
import { productsApi } from "../../services/api";
import { staticProducts } from "../../data/static";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border animate-pulse" style={{ borderColor: "rgba(78,59,50,0.1)" }}>
      <div className="bg-brand-sage/20" style={{ height: "220px" }} />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-brand-clay/20 rounded w-3/4" />
        <div className="h-4 bg-brand-clay/10 rounded w-full" />
        <div className="h-4 bg-brand-clay/10 rounded w-2/3" />
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
    <section
      id="products"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#FDFAF5" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-brand-sage mb-4">
            What We Grow
          </p>
          <h2
            className="font-serif font-bold text-brand-charcoal"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Our Organic Products
          </h2>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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

        {/* Certification callout */}
        <motion.div
          className="mt-12 bg-brand-green rounded-2xl py-5 px-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-sans italic text-white text-base">
            All products are certified organic and ethically sourced
          </p>
        </motion.div>
      </div>
    </section>
  );
}
