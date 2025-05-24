// src/components/products/MasonryGrid.jsx
import { useMediaQuery } from "react-responsive";
import { ProductCard } from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";

const MasonryGrid = ({ products, loading = false }) => {
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
              <ProductCard product={product} fixedHeight={true} />
            </ScrollAnimatedItem>
          )
        )}
      </div>
    );
  }

  // Masonry layout with varying heights for mobile
  return (
    <div className="columns-2 gap-4">
      {items.map((product, index) =>
        loading ? (
          <div key={index} className="mb-4 break-inside-avoid">
            <ProductSkeleton randomHeight />
          </div>
        ) : (
          <div key={product.id} className="mb-4 break-inside-avoid">
            <ScrollAnimatedItem
              amount={0.1}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: Math.floor(index / 2) * 0.1 },
                },
              }}
            >
              <ProductCard product={product} fixedHeight={false} />
            </ScrollAnimatedItem>
          </div>
        )
      )}
    </div>
  );
};

export default MasonryGrid;
