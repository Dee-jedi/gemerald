import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { getFeaturedProducts } from "../../services/products";
import LoadError from "../ui/LoadError";
import SectionHeading from "../landing/SectionHeading";
import { MasonryColumns } from "./MasonryGrid";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(false);
    getFeaturedProducts()
      .then((items) => !cancelled && setProducts(items))
      .catch((err) => {
        console.error("Failed to load featured products", err);
        if (!cancelled) setLoadError(true);
      })
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  if (loadError) {
    return (
      <section className="py-12 bg-[var(--color-bg)]">
        <LoadError
          message="We couldn't load our featured fragrances."
          onRetry={() => setAttempt((n) => n + 1)}
        />
      </section>
    );
  }

  // Nothing featured yet: skip the section rather than show an empty heading.
  if (!isLoading && products.length === 0) return null;

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

  const handleDeleted = (deleted) =>
    setProducts((items) => items.filter((p) => p.id !== deleted.id));

  return (
    <section className="md:py-16 pt-12 pb-8 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Our favourites"
          title="Featured fragrances"
          className="mb-10 md:mb-14"
        />

        {isMobile ? (
          <MasonryColumns products={products} onDeleted={handleDeleted} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
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
                <ProductCard
                  product={product}
                  fixedHeight
                  onDeleted={handleDeleted}
                />
              </ScrollAnimatedItem>
            ))}
          </div>
        )}

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
      <div className="px-4 py-3.5 space-y-2">
        <div className="h-4 bg-[var(--color-border)] rounded w-3/4"></div>
        <div className="h-3 bg-[var(--color-border)] rounded w-1/3"></div>
      </div>
    )}
  </div>
);
