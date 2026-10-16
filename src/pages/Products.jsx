import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";
import { getAllProducts } from "../services/products";
import { parsePrice } from "../lib/utils";
import MasonryGrid from "../components/products/MasonryGrid";
import AddProductFab from "../components/admin/AddProductFab";
import LoadError from "../components/ui/LoadError";
import SortMenu from "../components/ui/SortMenu";
import { motion } from "framer-motion";

const CATEGORIES = ["all", "diffuser", "candle", "gift set", "perfume"];

const SORTS = [
  { value: "recommended", label: "Recommended" },
  {
    value: "price-asc",
    label: "Price: Low to High",
    compare: (a, b) => parsePrice(a.price) - parsePrice(b.price),
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
    compare: (a, b) => parsePrice(b.price) - parsePrice(a.price),
  },
  { value: "newest", label: "Newest", compare: (a, b) => b.order - a.order },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Products = () => {
  // The category lives in the URL so links like /products?category=candle work.
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category")?.toLowerCase();
  const filter = CATEGORIES.includes(categoryParam) ? categoryParam : "all";
  const setFilter = (cat) =>
    setSearchParams(cat === "all" ? {} : { category: cat }, { replace: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const pillRefs = useRef({});

  const selectCategory = (cat) => {
    setFilter(cat);
    // Bring the chosen pill fully into view when the row is scrolled (mobile).
    pillRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // Shuffled once per visit so the order stays put while searching/filtering.
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(false);
    getAllProducts()
      .then((items) => !cancelled && setProducts(shuffleArray(items)))
      .catch((err) => {
        console.error("Failed to load products", err);
        if (!cancelled) setLoadError(true);
      })
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    for (const p of products) {
      const key = p.category?.toLowerCase();
      if (key) counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const displayedProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matches = products.filter(
      (p) =>
        (filter === "all" || p.category?.toLowerCase() === filter) &&
        (!query ||
          p.name?.toLowerCase().includes(query) ||
          p.scent_type?.toLowerCase().includes(query))
    );
    const sorter = SORTS.find((s) => s.value === sort)?.compare;
    return sorter ? [...matches].sort(sorter) : matches;
  }, [products, filter, searchQuery, sort]);

  return (
    <AnimatedPage className="py-6 md:py-10">
      <title>Shop | Gemerald</title>
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <ScrollAnimatedItem amount={0.05} className="mb-4 md:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products or scents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 font-serif text-[var(--color-text)] 
            bg-[color-mix(in_srgb,var(--color-card),black_38%)] 
            border border-[color-mix(in_srgb,var(--color-wood),transparent_70%)]
            rounded-full focus:outline-none 
            focus:ring-1 focus:ring-[color-mix(in_srgb,var(--color-wood),white_20%)] 
            focus:border-transparent 
            placeholder:text-[#ffffff3d]
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

        {/* Category pills + result count + sort */}
        {/* z-20 keeps the sort dropdown above the animated cards below it */}
        <ScrollAnimatedItem amount={0.1} className="relative z-20 mb-6 md:mb-8">
          <div className="-mx-6 md:mx-0">
            <div
              role="tablist"
              aria-label="Filter by category"
              className="flex gap-2 overflow-x-auto no-scrollbar px-6 md:px-0 py-1 md:flex-wrap md:justify-center [mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-2.5rem),transparent)] md:[mask-image:none]"
            >
              {CATEGORIES.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => (pillRefs.current[cat] = el)}
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCategory(cat)}
                    className={`relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm capitalize whitespace-nowrap transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-wood)] ${
                      active
                        ? "border-[var(--color-wood)]/40 text-[var(--color-wood)]"
                        : "border-white/[0.08] text-[var(--color-text)]/60 hover:border-white/20 hover:text-[var(--color-text)]/90"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeCategoryPill"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-[rgba(222,184,135,0.12)]"
                      />
                    )}
                    <span className="relative font-serif">{cat}</span>
                    <span
                      className={`relative min-w-5 rounded-full px-1.5 py-px text-center text-[10px] font-semibold tabular-nums transition-colors ${
                        active
                          ? "bg-[var(--color-wood)]/20 text-[var(--color-wood)]"
                          : "bg-white/[0.06] text-white/45"
                      } ${isLoading ? "opacity-0" : ""}`}
                    >
                      {categoryCounts[cat] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
            <p className="text-sm text-white/45" aria-live="polite">
              {isLoading || loadError ? (
                " "
              ) : (
                <>
                  <span className="text-[var(--color-text)]/80 tabular-nums">
                    {displayedProducts.length}
                  </span>{" "}
                  {displayedProducts.length === 1 ? "product" : "products"}
                </>
              )}
            </p>
            <SortMenu
              label="Sort by"
              options={SORTS}
              value={sort}
              onChange={setSort}
            />
          </div>
        </ScrollAnimatedItem>

        {/* Grid or Fallback */}
        <div>
          {loadError ? (
            <LoadError
              message="We couldn't load the products."
              onRetry={() => setAttempt((n) => n + 1)}
            />
          ) : displayedProducts.length > 0 || isLoading ? (
            <MasonryGrid
              products={displayedProducts}
              loading={isLoading}
              onDeleted={(deleted) =>
                setProducts((items) =>
                  items.filter((p) => p.id !== deleted.id)
                )
              }
            />
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
      <AddProductFab />
    </AnimatedPage>
  );
};

export default Products;
