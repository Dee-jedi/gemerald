import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { featuredProducts } from "../../data/products";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="md:py-16 pt-12 pb-8 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimatedItem amount={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-nowrap text-[var(--color-text)]">
              Featured Fragrances
            </h2>
          </div>
        </ScrollAnimatedItem>

        <div
          className={
            isMobile
              ? "columns-2 gap-4"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          }
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={isMobile ? "mb-4 break-inside-avoid" : ""}
            >
              <ScrollAnimatedItem
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
                <ProductCard product={product} fixedHeight={!isMobile} />
              </ScrollAnimatedItem>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 px-4 md:px-6">
          <Link
            to="/products"
            className="text-[var(--color-soft-amber)] font-medium hover:underline flex items-center gap-1 group"
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

const ProductSkeleton = ({ isMobile = false }) => (
  <div
    className={`animate-pulse rounded-xl bg-[var(--color-card)] ${
      !isMobile ? "flex flex-col h-full" : ""
    }`}
  >
    <div
      className={`${
        !isMobile ? "aspect-square" : "h-full"
      } bg-[var(--color-border)] rounded-t-xl`}
    ></div>
    {!isMobile && (
      <div className="p-3 space-y-1.5">
        <div className="h-4 bg-[var(--color-border)] rounded w-3/4"></div>
        <div className="h-3 bg-[var(--color-border)] rounded w-1/2"></div>
        <div className="h-8 bg-[var(--color-border)] rounded mt-2"></div>
      </div>
    )}
  </div>
);
