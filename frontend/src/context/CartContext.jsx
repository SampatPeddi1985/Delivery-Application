import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const found = prev.find(i => i.menuItem._id === item._id);
      if (found)
        return prev.map(i => i.menuItem._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

