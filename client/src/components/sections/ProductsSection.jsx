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
    <div className="bg-white animate-pulse overflow-hidden rounded-[4px] border border-brand-ink/[8%]">
      <div className="h-[200px] bg-brand-sage/[12%]" />
      <div className="p-5 space-y-3">
        <div className="h-4 rounded-sm w-3/4 bg-brand-ink/[7%]" />
        <div className="h-3 rounded-sm w-full bg-brand-ink/[5%]" />
        <div className="h-3 rounded-sm w-2/3 bg-brand-ink/[5%]" />
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
      .then((res) => setProducts(res.data.data))
      .catch(() => setProducts(staticProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="products">

      {/* Dark section header */}
      <div className="bg-brand-green py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            ref={ref}
          >
            <div>
              <p className="font-sans text-eyebrow uppercase text-brand-sage tracking-section font-medium mb-4">
                What We Grow
              </p>
              <h2 className="font-display text-section text-white font-semibold tracking-heading leading-[1.08]">
                Our Organic Products
              </h2>
            </div>
            <p className="font-sans md:text-right text-[15px] text-white/45 leading-[1.7] max-w-[340px]">
              Certified organic produce sustainably farmed on the highlands of Plateau State.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Product grid */}
      <div className="bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 py-16 lg:py-24">
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

          {/* Certification strip */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-5 px-8 bg-brand-green/[6%] rounded-[4px] border border-brand-green/10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="font-sans text-[15px] text-brand-ink/60 italic text-center sm:text-left">
              All products are certified organic and ethically sourced
            </p>
            <a
              href="#contact"
              className="shrink-0 font-sans font-semibold text-[13px] tracking-cta py-2.5 px-6 rounded-[3px] bg-brand-green text-white hover:bg-brand-forest transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              Request a Sample
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
