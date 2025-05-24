// src/components/products/FeaturedProducts.jsx
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { featuredProducts } from "../../data/products";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";
import Button from "../ui/CustomButton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(featuredProducts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16  bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollAnimatedItem amount={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-medium ">
              Featured Fragrances
            </h2>
          </div>
        </ScrollAnimatedItem>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ScrollAnimatedItem
              key={product.id}
              amount={0.1}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: index * 0.1 },
                },
              }}
            >
              <ProductCard product={product} />
            </ScrollAnimatedItem>
          ))}
        </div>

        <div className="flex justify-end mt-6 px-4 md:px-6">
          <Link
            to="/products"
            className="text-[var(--color-accent)] font-medium hover:underline flex items-center gap-1 group"
          >
            See All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ProductSkeleton = () => (
  <div className="animate-pulse rounded-xl bg-[var(--color-card)]">
    <div className="aspect-square bg-[var(--color-border)] rounded-t-xl"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-[var(--color-border)] rounded w-3/4"></div>
      <div className="h-4 bg-[var(--color-border)] rounded w-1/2"></div>
      <div className="h-10 bg-[var(--color-border)] rounded"></div>
    </div>
  </div>
);
