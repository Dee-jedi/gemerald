// src/components/products/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../admin/AdminMenu";
import { formatPrice } from "../../lib/utils";

// Height variations for mobile masonry (px), picked per product so they stay stable.
const MOBILE_HEIGHTS = [280, 220, 240, 200, 260];

export const getMobileCardHeight = (product) =>
  MOBILE_HEIGHTS[product.id % MOBILE_HEIGHTS.length];

export const ProductCard = ({ product, fixedHeight = false, onDeleted }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const cardHeight = `${getMobileCardHeight(product)}px`;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl sm:rounded-2xl bg-[var(--color-card)] transition-all duration-300 shadow-sm hover:shadow-md ${
        fixedHeight ? "h-full" : ""
      }`}
      style={!fixedHeight ? { height: cardHeight } : {}}
    >
      <Link
        to={`/products/${product.id}`}
        className={`block h-full rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-wood)] ${
          fixedHeight ? "flex flex-col" : ""
        }`}
      >
        {/* Image */}
        <div
          className={`relative ${
            fixedHeight ? "aspect-square flex-shrink-0" : "h-full"
          }`}
        >
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-[var(--color-border)] animate-pulse" />
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

        {/* Info - below the image on desktop, overlaid on mobile */}
        {fixedHeight ? (
          <div className="px-4 py-3.5 bg-[var(--color-card)] flex-grow">
            <h3 className="font-medium text-[15px] text-[var(--color-text)] line-clamp-1 leading-tight transition-colors group-hover:text-[var(--color-wood)]">
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-[var(--color-soft-amber)]">
              {formatPrice(product.price)}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
            <h3 className="font-medium text-sm text-white line-clamp-1 leading-tight">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs font-semibold text-[var(--color-soft-amber)]">
              {formatPrice(product.price)}
            </p>
          </div>
        )}
      </Link>

      {/* Kept outside the link so opening the menu never navigates. */}
      <div className="absolute top-3 right-3 z-10">
        <AdminMenu product={product} onDeleted={onDeleted} />
      </div>
    </div>
  );
};
