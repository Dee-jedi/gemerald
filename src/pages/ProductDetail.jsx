// src/pages/ProductDetail.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { allProducts } from "../data/products";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[var(--color-soft-amber)] hover:text-[var(--color-wood)] transition-colors mt-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Products</span>
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  // Prepare both basic and additional details
  const basicDetails = [
    product.size && `Size: ${product.size}`,
    product.category && `Category: ${product.category}`,
    product.scent_type && `Scents: ${product.scent_type}`,
  ].filter(Boolean);

  return (
    <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Back button */}
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-[var(--color-soft-amber)] hover:text-[var(--color-wood)] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Products</span>
        </Link>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <ScrollAnimatedItem amount={0.1}>
            <div className="relative rounded-3xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </ScrollAnimatedItem>

          {/* Product Info */}
          <div className="space-y-8">
            <ScrollAnimatedItem amount={0.1} delay={0.1}>
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-[var(--color-text)] leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-5 mt-4">
                  <p className="text-3xl font-semibold text-[var(--color-soft-amber)]">
                    #{product.price}
                  </p>
                  <div className="flex items-center gap-2 text-base font-medium text-[var(--color-text)] bg-[var(--color-card-hover)] px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>{product.rating?.toFixed(1) || "4.0"}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimatedItem>

            {/* Description section */}
            {product.description && (
              <ScrollAnimatedItem amount={0.2} delay={0.2}>
                <div className="prose max-w-none text-[var(--color-text)]/90">
                  <p>{product.description}</p>
                </div>
              </ScrollAnimatedItem>
            )}

            {/* Basic Product Details */}
            <ScrollAnimatedItem amount={0.1} delay={0.3}>
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[var(--color-soft-amber)] border-b border-[var(--color-border)] pb-2">
                  Specifications
                </h3>
                <ul className="space-y-3">
                  {basicDetails.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[var(--color-soft-amber)] text-lg mt-0.5">
                        •
                      </span>
                      <span className="text-[var(--color-text)]/85 text-lg">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimatedItem>

            {/* Additional Product Details */}
            {product.details && product.details.length > 0 && (
              <ScrollAnimatedItem amount={0.1} delay={0.4}>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-[var(--color-soft-amber)] border-b border-[var(--color-border)] pb-2">
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[var(--color-soft-amber)] text-lg mt-0.5">
                          •
                        </span>
                        <span className="text-[var(--color-text)]/85 text-lg">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimatedItem>
            )}

            {/* Add to Cart button */}
            <ScrollAnimatedItem amount={0.1} delay={0.5}>
              <div className="pt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    addToCart({
                      ...product,
                      price: Number(product.price.replace(/,/g, "")),
                    });
                    setIsAdded(true);
                    setTimeout(() => setIsAdded(false), 2000);
                  }}
                  className={`w-full py-4 px-6 text-lg font-medium flex items-center justify-center gap-3 rounded-lg transition-all ${
                    isAdded
                      ? "bg-emerald-700 text-white"
                      : "bg-[var(--color-wood)]/30 hover:bg-[var(--color-wood)]/40 text-[var(--color-wood)] hover:text-[var(--color-wood)] border border-transparent"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-6 h-6" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                {/* Optional: Small notification that appears when added */}
                {isAdded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-emerald-400 mt-2 text-sm"
                  >
                    Item added to your cart
                  </motion.div>
                )}
              </div>
            </ScrollAnimatedItem>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProductDetail;
