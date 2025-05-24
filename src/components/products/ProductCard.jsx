// src/components/products/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/CustomButton";
import { Eye } from "lucide-react";

export const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Generate random heights for masonry effect
  const getRandomHeight = () => {
    const heights = [200, 250, 280, 320, 240, 300];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  const [imageHeight] = useState(getRandomHeight());

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-soft-amber)] transition-all duration-300 shadow-sm hover:shadow-md mb-4">
      {/* Image with random height */}
      <div className="relative overflow-hidden">
        {!isImageLoaded && (
          <div
            className="absolute inset-0 bg-[var(--color-border)] animate-pulse rounded-2xl"
            style={{ height: `${imageHeight}px` }}
          ></div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          style={{ height: `${imageHeight}px` }}
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-sm md:text-base truncate">
              {product.name}
            </h3>
            <p className="text-[var(--color-soft-amber)] text-xs md:text-sm mt-0.5">
              {product.category}
            </p>
          </div>
          <span className="font-medium text-sm md:text-base whitespace-nowrap">
            ${product.price}
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="block mt-2 w-full">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            className="gap-1.5 py-1.5"
          >
            <Eye className="w-3 h-3 md:w-4 md:h-4 text-[var(--color-wood)]" />
            <span className="text-xs md:text-sm">View Details</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
