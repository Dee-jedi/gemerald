// src/components/products/ProductSkeleton.jsx
import { useMediaQuery } from "react-responsive";

// Height variations for mobile
const MOBILE_HEIGHTS = ["180px", "220px", "240px", "200px", "260px"];

const ProductSkeleton = ({ randomHeight = false, index = 0 }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const mobileHeight = randomHeight
    ? MOBILE_HEIGHTS[index % MOBILE_HEIGHTS.length]
    : "240px";

  return (
    <div
      className="relative overflow-hidden rounded-3xl sm:rounded-2xl bg-[var(--color-card)] animate-pulse"
      style={isMobile && randomHeight ? { height: mobileHeight } : {}}
    >
      <div className={`relative ${!isMobile ? "aspect-square" : "h-full"}`}>
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-border),transparent_20%)]" />
      </div>

      {!isMobile ? (
        <div className="px-4 py-3.5 space-y-2 bg-[var(--color-card)]">
          <div className="h-4 bg-[color-mix(in_srgb,var(--color-border),transparent_30%)] rounded w-3/4"></div>
          <div className="h-3 bg-[color-mix(in_srgb,var(--color-soft-amber),transparent_80%)] rounded w-1/3"></div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
          <div className="h-3 bg-[color-mix(in_srgb,white,transparent_85%)] rounded w-3/4"></div>
          <div className="h-2.5 bg-[color-mix(in_srgb,var(--color-soft-amber),transparent_75%)] rounded w-1/3"></div>
        </div>
      )}
    </div>
  );
};

export default ProductSkeleton;
