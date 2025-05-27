// src/pages/CartPage.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/CustomButton";
import { X, ShoppingCart, ArrowLeft } from "lucide-react";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
  } = useCart();

  // Calculate total price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formattedSubtotal = subtotal.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  return (
    <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[var(--color-wood)] hover:text-[var(--color-soft-amber)] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Continue Shopping</span>
          </Link>

          <h1 className="text-3xl font-serif font-medium text-[var(--color-text)]">
            Your Cart{" "}
            <span className="text-[var(--color-soft-amber)]">
              ({cartItemCount})
            </span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto text-[var(--color-wood)]/30 mb-6" />
            <h2 className="text-2xl font-serif mb-6 text-[var(--color-text)]/90">
              Your cart is empty
            </h2>
            <Link
              to="/products"
              className="inline-flex items-center px-5 py-2.5 bg-transparent border border-[var(--color-wood)]/30 hover:border-[var(--color-wood)]/70 text-[var(--color-wood)]/80 hover:text-[var(--color-wood)] rounded-lg transition-all duration-500"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <ScrollAnimatedItem key={item.id} amount={0.1}>
                  <div className="flex flex-col sm:flex-row gap-4 p-4 bg-[var(--color-glass)] backdrop-blur-sm rounded-lg border border-[var(--color-border)] hover:border-[var(--color-soft-amber)] transition-all duration-300">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--color-bg)] flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-lg font-medium text-[var(--color-text)]">
                            {item.name}
                          </h3>
                          <p className="text-[var(--color-soft-amber)] mt-1">
                            #{item.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[var(--color-text)]/50 hover:text-[var(--color-wood)] transition-colors p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-[var(--color-text)]/80">
                              Quantity:
                            </span>
                            <select
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded py-[5px] pl-3 pr-8 text-sm text-[var(--color-text)] focus:border-[var(--color-wood)] focus:outline-none focus:ring-1 focus:ring-[var(--color-wood)]/30 appearance-none cursor-pointer transition-all duration-200 bg-no-repeat bg-[length:16px_16px] bg-[right_0.5rem_center]"
                              style={{
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23d1834f'%3e%3cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3e%3c/svg%3e\")",
                              }}
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option
                                  key={num}
                                  value={num}
                                  className="bg-[var(--color-card)] text-[var(--color-text)]"
                                >
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                          <span className="text-[var(--color-text)] font-medium">
                            #{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimatedItem>
              ))}

              {/* Clear Cart Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-[var(--color-wood)] hover:text-[var(--color-soft-amber)] underline transition-colors"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <ScrollAnimatedItem amount={0.1} delay={0.2}>
                <div className="bg-[var(--color-glass)] backdrop-blur-sm p-6 rounded-lg border border-[var(--color-border)] sticky top-8">
                  <h2 className="text-xl font-serif font-medium text-[var(--color-text)] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 text-[var(--color-text)]/90">
                    <div className="flex justify-between">
                      <span>
                        Subtotal ({cartItemCount}{" "}
                        {cartItemCount === 1 ? "item" : "items"})
                      </span>
                      <span className="font-medium">{formattedSubtotal}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-[var(--color-soft-amber)]">
                        Calculated at checkout
                      </span>
                    </div>

                    <div className="border-t border-[var(--color-border)] pt-4 flex justify-between font-medium">
                      <span>Estimated Total</span>
                      <span>{formattedSubtotal}</span>
                    </div>

                    <Button
                      as={Link}
                      to="/checkout"
                      className="w-full py-3.5 mt-6 font-medium flex items-center justify-center gap-2 bg-[var(--color-wood)]/10 hover:bg-[var(--color-wood)]/20 text-[var(--color-wood)] hover:text-[var(--color-wood)] border border-transparent rounded-lg transition-all duration-500"
                    >
                      Proceed to Checkout
                    </Button>

                    <p className="text-xs text-center text-[var(--color-text)]/60 mt-4">
                      Taxes calculated at checkout
                    </p>
                  </div>
                </div>
              </ScrollAnimatedItem>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default CartPage;
