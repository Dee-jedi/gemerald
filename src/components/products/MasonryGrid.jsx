// src/components/products/MasonryGrid.jsx
import { useMediaQuery } from "react-responsive";
import { getMobileCardHeight, ProductCard } from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";

const MasonryGrid = ({ products, loading = false, onDeleted }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const items = loading ? Array(8).fill(null) : products;

  if (!isMobile) {
    // Regular grid layout for desktop
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((product, index) =>
          loading ? (
            <ProductSkeleton key={index} />
          ) : (
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
              <ProductCard
                product={product}
                fixedHeight={true}
                onDeleted={onDeleted}
              />
            </ScrollAnimatedItem>
          )
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 items-start">
        {[0, 1].map((col) => (
          <div key={col} className="flex flex-col gap-4">
            {items
              .map((_, index) => index)
              .filter((index) => index % 2 === col)
              .map((index) => (
                <ProductSkeleton key={index} randomHeight index={index} />
              ))}
          </div>
        ))}
      </div>
    );
  }

  return <MasonryColumns products={products} onDeleted={onDeleted} />;
};

// Two-column masonry for mobile. CSS `columns` fills the whole left column
// before the right, which breaks sorted order; instead each product goes, in
// order, to whichever column is currently shorter, so order reads across rows.
export const MasonryColumns = ({ products, onDeleted }) => {
  const columns = [[], []];
  const heights = [0, 0];
  products.forEach((product) => {
    const col = heights[0] <= heights[1] ? 0 : 1;
    columns[col].push({ product });
    heights[col] += getMobileCardHeight(product);
  });

  return (
    <div className="grid grid-cols-2 gap-4 items-start">
      {columns.map((column, col) => (
        <div key={col} className="flex flex-col gap-4">
          {column.map(({ product }) => (
            <ScrollAnimatedItem
              key={product.id}
              amount={0.1}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: col * 0.08 },
                },
              }}
            >
              <ProductCard
                product={product}
                fixedHeight={false}
                onDeleted={onDeleted}
              />
            </ScrollAnimatedItem>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
