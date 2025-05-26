// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/CustomButton";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { allProducts } from "../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[var(--color-wood)] hover:text-[var(--color-soft-amber)] transition-colors mt-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  // Prepare both basic and additional details
  const basicDetails = [
    product.size && `Size: ${product.size}`,
    product.category && `Category: ${product.category}`,
    product.scent_type && `Scents: ${product.scent_type}`,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Back button */}
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-[var(--color-wood)] hover:text-[var(--color-soft-amber)] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Products</span>
        </Link>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="relative rounded-3xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] group">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-[var(--color-text)] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-5 mt-4">
                <p className="text-3xl font-semibold text-[var(--color-soft-amber)]">
                  #{product.price}
                </p>
                <div className="flex items-center gap-2 text-base font-medium text-[var(--color-text)] bg-[var(--color-card-hover)] px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{product.rating?.toFixed(1) || "4.0"}</span>
                </div>
              </div>
            </div>

            {/* Description section */}
            {product.description && (
              <div className="prose max-w-none text-[var(--color-text)]/90">
                <p>{product.description}</p>
              </div>
            )}

            {/* Basic Product Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[var(--color-soft-amber)] border-b border-[var(--color-border)] pb-2">
                Specifications
              </h3>
              <ul className="space-y-3">
                {basicDetails.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[var(--color-wood)] text-lg mt-0.5">
                      •
                    </span>
                    <span className="text-[var(--color-text)]/85 text-lg">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Product Details */}
            {product.details && product.details.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[var(--color-soft-amber)] border-b border-[var(--color-border)] pb-2">
                  Features
                </h3>
                <ul className="space-y-3">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[var(--color-wood)] text-lg mt-0.5">
                        •
                      </span>
                      <span className="text-[var(--color-text)]/85 text-lg">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart button */}
            <div className="pt-6">
              <Button
                onClick={() =>
                  addToCart({
                    ...product,
                    price: Number(product.price.replace(/,/g, "")),
                  })
                }
                className="w-full py-5 text-lg font-medium flex items-center justify-center gap-3 hover:bg-[var(--color-soft-amber)] hover:text-[var(--color-bg)] transition-all"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
