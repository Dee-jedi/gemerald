// src/components/products/ProductCard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/CustomButton";
import { Eye, Star } from "lucide-react";

export const ProductCard = ({ product, fixedHeight = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [cardHeight, setCardHeight] = useState("auto");

  useEffect(() => {
    if (!fixedHeight) {
      // Height variations for mobile masonry
      const heights = ["280px", "220px", "240px", "200px", "260px"];
      setCardHeight(heights[Math.floor(Math.random() * heights.length)]);
    }
  }, [fixedHeight]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-soft-amber)] transition-all duration-300 shadow-sm hover:shadow-md ${
        fixedHeight ? "h-full flex flex-col" : ""
      }`}
      style={!fixedHeight ? { height: cardHeight } : {}}
    >
      {/* Image container - updated */}
      <div
        className={`relative ${
          fixedHeight ? "aspect-square flex-shrink-0" : "h-full"
        }`}
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-[var(--color-border)] animate-pulse rounded-t-xl" />
        )}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </div>

      {/* Info section - different layout for mobile/desktop */}
      {fixedHeight ? (
        // Desktop layout - below image
        <div className="p-3 space-y-1.5 bg-[var(--color-card)] flex-grow flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-[var(--color-text)] line-clamp-1 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs font-semibold text-[var(--color-soft-amber)]">
                #{product.price}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[var(--color-wood)] whitespace-nowrap">
              <Star className="w-3 h-3 text-yellow-500" />
              {product.rating?.toFixed(1) ?? "4.0"}
            </div>
          </div>
          <Link to={`/products/${product.id}`} className="block pt-1">
            <Button
              variant="outline"
              fullWidth
              className="gap-2 py-3 text-xs font-medium"
            >
              <Eye className="w-3.5 h-3.5 text-[var(--color-wood)]" />
              View Details
            </Button>
          </Link>
        </div>
      ) : (
        // Mobile layout - overlay on image
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-6">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-white line-clamp-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-[var(--color-soft-amber)]">
                  #{product.price}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-white whitespace-nowrap">
                <Star className="w-3 h-3 text-yellow-300" />
                {product.rating?.toFixed(1) ?? "4.0"}
              </div>
            </div>
            <Link to={`/products/${product.id}`} className="block pt-1">
              <Button
                variant="outline"
                fullWidth
                className="gap-2 py-[10px] text-xs font-medium bg-black"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--color-wood)]" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
