import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGoBack } from "../hooks/useGoBack";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import AdminMenu from "../components/admin/AdminMenu";
import { ProductCard } from "../components/products/ProductCard";
import LoadError from "../components/ui/LoadError";
import { parseScentTypes, useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";
import { getProductById, getRelatedProducts } from "../services/products";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";

const BulletList = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="text-[var(--color-soft-amber)] text-lg leading-7">•</span>
        <span className="text-[var(--color-text)]/85 text-base md:text-lg leading-7">
          {item}
        </span>
      </li>
    ))}
  </ul>
);

const ProductDetail = () => {
  const { id } = useParams();
  // Back returns to wherever the visitor came from (Home, Products, a related
  // product); opened directly, it falls back to the Products page.
  const goBack = useGoBack("/products");
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [selectedScent, setSelectedScent] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(false);
    getProductById(id)
      .then((item) => {
        if (cancelled) return;
        setProduct(item);
        setSelectedScent(parseScentTypes(item?.scent_type)[0] ?? null);
        if (item) {
          getRelatedProducts(item)
            .then((items) => !cancelled && setRelated(items))
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.error("Failed to load product", err);
        if (!cancelled) setLoadError(true);
      })
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => setIsAdded(false), 2500);
    return () => clearTimeout(timer);
  }, [isAdded]);

  if (isLoading) {
    return (
      <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">
            <div className="aspect-square rounded-3xl bg-[var(--color-card)]" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded bg-[var(--color-card)]" />
              <div className="h-8 w-1/3 rounded bg-[var(--color-card)]" />
              <div className="h-24 rounded bg-[var(--color-card)]" />
            </div>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (loadError) {
    return (
      <AnimatedPage className="min-h-[70vh] flex items-center justify-center">
        <LoadError
          message="We couldn't load this product."
          onRetry={() => setAttempt((n) => n + 1)}
        />
      </AnimatedPage>
    );
  }

  if (!product) {
    return (
      <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
        <title>Product not found | Gemerald</title>
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

  const scents = parseScentTypes(product.scent_type);
  const specifications = [
    product.size && `Size: ${product.size}`,
    product.category && `Category: ${product.category}`,
  ].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, selectedScent ?? undefined);
    setIsAdded(true);
  };

  const addButton = (className = "") => (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
        isAdded
          ? "bg-emerald-700 text-white"
          : "bg-[rgba(222,184,135,0.3)] hover:bg-[rgba(222,184,135,0.4)] text-[#deb887]"
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </>
      )}
    </motion.button>
  );

  return (
    <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <title>{`${product.name} | Gemerald`}</title>
      <meta
        name="description"
        content={product.description || `${product.name} by Gemerald`}
      />

      {/* Back button */}
      <div className="container mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[var(--color-soft-amber)] hover:text-[var(--color-wood)] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back</span>
        </button>
        <AdminMenu product={product} variant="plain" onDeleted={goBack} />
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-6 pb-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Product Image */}
          <ScrollAnimatedItem amount={0.1}>
            <div className="relative rounded-3xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] group lg:sticky lg:top-24">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </ScrollAnimatedItem>

          {/* Product Info */}
          <div className="space-y-8">
            <ScrollAnimatedItem amount={0.1} delay={0.1}>
              <div>
                {product.category && (
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-wood)]/70">
                    {product.category}
                  </p>
                )}
                <h1 className="mt-2 text-4xl md:text-5xl font-serif font-medium text-[var(--color-text)] leading-tight">
                  {product.name}
                </h1>
                <p className="mt-4 text-3xl font-semibold text-[var(--color-soft-amber)]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </ScrollAnimatedItem>

            {product.description && (
              <ScrollAnimatedItem amount={0.2} delay={0.15}>
                <p className="text-[var(--color-text)]/85 leading-relaxed">
                  {product.description}
                </p>
              </ScrollAnimatedItem>
            )}

            {/* Scent picker */}
            {scents.length > 0 && (
              <ScrollAnimatedItem amount={0.1} delay={0.2}>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[var(--color-wood)]">
                    Choose your scent
                    {selectedScent && (
                      <span className="ml-2 font-normal text-[var(--color-text)]/60">
                        {selectedScent}
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Scent">
                    {scents.map((scent) => {
                      const active = scent === selectedScent;
                      return (
                        <button
                          key={scent}
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSelectedScent(scent)}
                          className={`rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
                            active
                              ? "border-[var(--color-wood)] bg-[rgba(222,184,135,0.15)] text-[var(--color-wood)]"
                              : "border-white/10 text-[var(--color-text)]/75 hover:border-white/30"
                          }`}
                        >
                          {scent}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </ScrollAnimatedItem>
            )}

            {/* Add to cart (desktop; mobile uses the sticky bar below) */}
            <div className="hidden md:block">
              {addButton("w-full py-4 text-lg")}
              <AnimatePresence>
                {isAdded && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-center text-sm text-emerald-400"
                  >
                    Saved to your cart.{" "}
                    <Link to="/cart" className="underline hover:text-emerald-300">
                      View cart
                    </Link>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {specifications.length > 0 && (
              <ScrollAnimatedItem amount={0.1} delay={0.1}>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-[var(--color-soft-amber)] border-b border-[var(--color-border)] pb-2">
                    Specifications
                  </h3>
                  <BulletList items={specifications} />
                </div>
              </ScrollAnimatedItem>
            )}

            {product.details?.length > 0 && (
              <ScrollAnimatedItem amount={0.1} delay={0.1}>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-[var(--color-soft-amber)] border-b border-[var(--color-border)] pb-2">
                    Features
                  </h3>
                  <BulletList items={product.details} />
                </div>
              </ScrollAnimatedItem>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 font-serif text-2xl md:text-3xl">
              You may also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} fixedHeight />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky add-to-cart bar on mobile */}
      <div className="md:hidden fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[var(--color-glass)] p-2.5 pl-4 shadow-xl shadow-black/60 backdrop-blur-lg">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-white/60">
              {isAdded ? (
                <Link to="/cart" className="text-emerald-400 underline">
                  View cart
                </Link>
              ) : (
                selectedScent || product.name
              )}
            </p>
            <p className="font-semibold text-[var(--color-soft-amber)]">
              {formatPrice(product.price)}
            </p>
          </div>
          {addButton("px-5 py-3 text-sm")}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProductDetail;
