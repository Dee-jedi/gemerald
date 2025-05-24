import { useState } from "react";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";
import { ProductCard } from "../components/products/ProductCard";
import { allProducts } from "../data/products";

const Products = () => {
  const [filter, setFilter] = useState("all");

  const filteredProducts =
    filter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category.toLowerCase() === filter);

  return (
    <AnimatedPage className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <ScrollAnimatedItem amount={0.1}>
          <div className="mb-12">
            <span className="uppercase tracking-[0.2em] text-[var(--color-wood)] font-script">
              Gemerald Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mt-4">
              All Fragrances
            </h1>
          </div>
        </ScrollAnimatedItem>

        {/* Filters */}
        <ScrollAnimatedItem amount={0.1} className="mb-12">
          <div className="flex flex-wrap gap-4 border-b border-[var(--color-border)] pb-6">
            {["all", "perfume", "candle", "gift set"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 capitalize font-serif text-sm transition-colors ${
                  filter === cat
                    ? "text-[var(--color-wood)] border-b-2 border-[var(--color-wood)]"
                    : "text-gray-400 hover:text-[var(--color-text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollAnimatedItem>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ScrollAnimatedItem
              key={product.id}
              amount={0.1}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: Math.floor(index / 4) * 0.1 },
                },
              }}
            >
              <ProductCard product={product} />
            </ScrollAnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Products;
