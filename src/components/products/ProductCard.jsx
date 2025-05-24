// src/components/products/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/CustomButton";
import { Eye } from "lucide-react"; // 👈 Import the icon

export const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg md:rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-soft-amber)] transition-all duration-300">
      {/* Image */}
      <div className="h-44 md:h-60 overflow-hidden relative">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-[var(--color-border)] animate-pulse"></div>
        )}
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

      {/* Info */}
      <div className="px-4 py-2 md:p-4 ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl">{product.name}</h3>
            <p className="text-[var(--color-soft-amber)] text-sm mt-1">
              {product.category}
            </p>
          </div>
          <span className="font-italic">${product.price}</span>
        </div>

        {/* Custom Button with Eye icon */}
        <Link
          to={`/products/${product.id}`}
          className="block mt-2 md:mt-4 w-full "
        >
          <Button variant="outline" size="md" fullWidth className="gap-2">
            <Eye className="w-4 h-4 text-[var(--color-wood)]" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
