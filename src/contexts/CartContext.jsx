import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // ADD TO CART (FIXED)
  // =========================
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          price: Number(product.price), // 🔥 VERY IMPORTANT
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // REMOVE
  // =========================
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item._id !== id));

  // =========================
  // CLEAR
  // =========================
  const clearCart = () => setCart([]);

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: qty < 1 ? 1 : qty }
          : item
      )
    );
  };

  // =========================
  // TOTALS
  // =========================
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
