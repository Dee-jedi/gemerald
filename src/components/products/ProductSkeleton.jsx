// src/components/products/ProductSkeleton.jsx
import { useMediaQuery } from "react-responsive";

const ProductSkeleton = ({ randomHeight = false }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Height variations for mobile
  const mobileHeights = ["180px", "220px", "240px", "200px", "260px"];
  const mobileHeight = randomHeight
    ? mobileHeights[Math.floor(Math.random() * mobileHeights.length)]
    : "240px";

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] animate-pulse"
      style={isMobile && randomHeight ? { height: mobileHeight } : {}}
    >
      {/* Image skeleton - matches both layouts */}
      <div className={`relative ${!isMobile ? "aspect-square" : "h-full"}`}>
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-border),transparent_20%)] rounded-t-xl" />
      </div>

      {/* Info skeleton - different for mobile/desktop */}
      {!isMobile ? (
        // Desktop layout - below image
        <div className="p-3 space-y-1.5 bg-[var(--color-card)]">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="h-4 bg-[color-mix(in_srgb,var(--color-border),transparent_30%)] rounded w-3/4"></div>
              <div className="h-3 bg-[color-mix(in_srgb,var(--color-soft-amber),transparent_80%)] rounded w-1/2"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-[color-mix(in_srgb,var(--color-wood),transparent_70%)] rounded-full"></div>
              <div className="h-2.5 bg-[color-mix(in_srgb,var(--color-border),transparent_30%)] rounded w-6"></div>
            </div>
          </div>
          <div className="h-8 bg-[color-mix(in_srgb,var(--color-border),transparent_20%)] rounded mt-1 border border-[var(--color-border)]"></div>
        </div>
      ) : (
        // Mobile layout - overlay on image
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="h-3 bg-[color-mix(in_srgb,white,transparent_60%)] rounded w-3/4"></div>
                <div className="h-2.5 bg-[color-mix(in_srgb,var(--color-soft-amber),transparent_30%)] rounded w-1/2"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-[color-mix(in_srgb,var(--color-wood),transparent_30%)] rounded-full"></div>
                <div className="h-2.5 bg-[color-mix(in_srgb,white,transparent_60%)] rounded w-4"></div>
              </div>
            </div>
            <div className="h-7 bg-[color-mix(in_srgb,white,transparent_85%)] rounded mt-1 border border-[color-mix(in_srgb,var(--color-border),transparent_50%)]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSkeleton;
