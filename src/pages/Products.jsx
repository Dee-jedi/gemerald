import { useState, useEffect } from "react";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";
import { allProducts } from "../data/products";
import MasonryGrid from "../components/products/MasonryGrid";

const Products = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const filterAndSearch = () => {
    const filtered =
      filter === "all"
        ? allProducts
        : allProducts.filter((p) => p.category.toLowerCase() === filter);

    const searched = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return shuffleArray(searched);
  };

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setDisplayedProducts(filterAndSearch());
      setIsLoading(false);
    }, 800); // simulate load delay

    return () => clearTimeout(timeout);
  }, [filter, searchQuery]);

  return (
    <AnimatedPage className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <ScrollAnimatedItem amount={0.05} className="mb-4 md:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 font-serif text-[var(--color-text)] 
            bg-[color-mix(in_srgb,var(--color-card),black_38%)] 
            border border-[color-mix(in_srgb,var(--color-wood),transparent_89%)]
            rounded-full focus:outline-none 
            focus:ring-1 focus:ring-[color-mix(in_srgb,var(--color-wood),white_20%)] 
            focus:border-transparent 
            placeholder:text-[#ffffff1a]
            transition-all duration-300 
            shadow-sm shadow-black/20
            hover:border-[color-mix(in_srgb,var(--color-border),white_10%)]"
            />
            <svg
              className="absolute right-5 top-3.5 h-5 w-5 text-[var(--color-wood)] opacity-50"
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

        {/* Filters - Updated with nowrap and scrollable container */}
        <ScrollAnimatedItem amount={0.1} className="mb-6 md:mb-12">
          <div className="flex flex-nowrap gap-4 pb-6 relative overflow-x-auto no-scrollbar">
            {["all", "diffuser", "candle", "gift set", "perfume"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 capitalize font-serif text-sm cursor-pointer transition-colors relative whitespace-nowrap ${
                  filter === cat
                    ? "text-[var(--color-wood)]"
                    : "text-gray-400 hover:text-[var(--color-wood)]"
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

        {/* Grid or Fallback */}
        <div>
          {displayedProducts.length > 0 || isLoading ? (
            <MasonryGrid products={displayedProducts} loading={isLoading} />
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
