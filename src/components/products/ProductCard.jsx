// src/components/products/ProductCard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/CustomButton";
import { Eye } from "lucide-react";

export const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [cardSize, setCardSize] = useState(30);

  useEffect(() => {
    // Calculate card size based on content
    const baseSize = 30;
    const nameLength = product.name.length;
    const size = nameLength > 30 ? baseSize + 5 : baseSize;
    setCardSize(size);
  }, [product.name]);

  return (
    <div
      className="product-card group relative overflow-hidden rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-soft-amber)] transition-all duration-300 shadow-sm hover:shadow-md"
      style={{ "--card-size": cardSize }}
    >
      {/* Image */}
      <div className="overflow-hidden relative rounded-t-xl max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[400px] xl:max-h-[440px]">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-[var(--color-border)] animate-pulse rounded-t-xl" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          style={{
            maxHeight: "100%", // fallback
          }}
        />
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-[var(--color-text)] line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-[var(--color-soft-amber)] mt-0.5">
              {product.category}
            </p>
          </div>
          <span className="font-medium text-sm whitespace-nowrap">
            ${product.price}
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="block pt-1.5">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            className="gap-1.5 py-1.5 text-xs"
          >
            <Eye className="w-3 h-3 text-[var(--color-wood)]" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
