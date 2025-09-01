'use client'

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

 const addToCart = (item) => {
  setCartItems(prev => {
    const existing = prev.find(
      i => i.variantId === item.variantId && i.size === item.size
    );

    if (existing) {
      return prev.map(i =>
        i.variantId === item.variantId && i.size === item.size
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    }

    return [...prev, item];
  });
};



 const removeFromCart = (variantId, size) => {
  setCartItems(prev => prev.filter(i => i.variantId !== variantId || i.size !== size));
};

const updateQuantity = (variantId, size, quantity) => {
  setCartItems(prev =>
    prev.map(i =>
      i.variantId === variantId && i.size === size ? { ...i, quantity } : i
    )
  );
};


  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}
