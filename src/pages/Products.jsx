import { useState } from "react";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";
import { ProductCard } from "../components/products/ProductCard";
import { allProducts } from "../data/products";

const Products = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts =
    filter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category.toLowerCase() === filter);

  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedPage className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar - Keep as is */}
        <ScrollAnimatedItem amount={0.05} className="mb-6 md:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 font-serif text-[var(--color-text)] bg-[var(--color-card)] 
            border border-[var(--color-border)] rounded-full focus:outline-none focus:ring-1 
            focus:ring-[var(--color-wood)] focus:border-transparent placeholder:text-[color-mix(in_srgb,var(--color-wood),transparent_50%)] 
            transition-all duration-200 backdrop-blur-sm"
            />
            <svg
              className="absolute right-5 top-3.5 h-5 w-5 text-[var(--color-soft-amber)]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </ScrollAnimatedItem>

        {/* Filters - Keep as is */}
        <ScrollAnimatedItem amount={0.1} className="mb-8 md:mb-12">
          <div className="flex flex-wrap gap-4 pb-6 relative">
            {["all", "perfume", "candle", "gift set"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 capitalize font-serif text-sm cursor-pointer transition-colors relative ${
                  filter === cat
                    ? "text-[var(--color-wood)]"
                    : "text-gray-400 hover:text-[var(--color-wood)] transition-colors duration-200"
                }`}
              >
                {cat}
                {filter === cat && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-30"></div>
                )}
              </button>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>
          </div>
        </ScrollAnimatedItem>

        {/* Simple Masonry Products Grid */}
        <div className="masonry-grid">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product, index) => (
              <ScrollAnimatedItem
                key={product.id}
                amount={0.1}
                variants={{
                  offscreen: { y: 40, opacity: 0 },
                  onscreen: {
                    y: 0,
                    opacity: 1,
                    transition: { delay: Math.floor(index / 5) * 0.1 },
                  },
                }}
              >
                <ProductCard product={product} />
              </ScrollAnimatedItem>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="font-serif text-xl text-[var(--color-wood)] mb-2">
                No products found
              </h3>
              <p className="text-[var(--color-text)] opacity-75">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Products;
