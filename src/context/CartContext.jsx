import { createContext, useContext, useState, useEffect } from "react";
import { parsePrice } from "../lib/utils";

const CartContext = createContext();

// Split a product's comma-separated scent list into options.
export const parseScentTypes = (scentString) =>
  (scentString || "")
    .split(/\s*,\s*(?![^()]*\))/)
    .map((s) => s.trim())
    .filter(Boolean);

// The same product in two scents is two separate cart lines.
const lineIdFor = (productId, scent) => `${productId}::${scent ?? ""}`;

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("cart") ?? "[]");
    return Array.isArray(saved)
      ? saved.map((item) => ({
          ...item,
          lineId: item.lineId ?? lineIdFor(item.id, item.selectedScent),
        }))
      : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [cartItems]);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToCart = (product, scent, quantity = 1) => {
    const selectedScent = scent ?? parseScentTypes(product.scent_type)[0] ?? "";
    const lineId = lineIdFor(product.id, selectedScent);

    setCartItems((prevItems) => {
      if (prevItems.some((item) => item.lineId === lineId)) {
        return prevItems.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          scent_type: product.scent_type,
          price: parsePrice(product.price),
          selectedScent,
          lineId,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (lineId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.lineId !== lineId)
    );
  };

  const updateQuantity = (lineId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(lineId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.lineId === lineId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateScent = (lineId, newScent) => {
    setCartItems((prevItems) => {
      const line = prevItems.find((item) => item.lineId === lineId);
      if (!line) return prevItems;
      const newLineId = lineIdFor(line.id, newScent);
      const existing = prevItems.find((item) => item.lineId === newLineId);

      // Switching to a scent that's already in the cart merges the two lines.
      if (existing && existing !== line) {
        return prevItems
          .filter((item) => item.lineId !== lineId)
          .map((item) =>
            item.lineId === newLineId
              ? { ...item, quantity: item.quantity + line.quantity }
              : item
          );
      }
      return prevItems.map((item) =>
        item.lineId === lineId
          ? { ...item, selectedScent: newScent, lineId: newLineId }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateScent,
        clearCart,
        parseScentTypes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
