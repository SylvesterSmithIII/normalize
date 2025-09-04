'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart:v1');
      if (raw) setCartItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('cart:v1', JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  const match = (a, id, size) =>
    String(a.id) === String(id) && String(a.size ?? '') === String(size ?? '');

  const addToCart = (item) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => match(p, item.id, item.size));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity };
        return copy;
      }
      return [...prev, { ...item, quantity: Math.max(1, item.quantity) }];
    });
  };

  // 🔑 absolute quantity (what your CartDrawer calls)
  const updateQuantity = (id, size, newQty) => {
    setCartItems((prev) =>
      prev.map((i) =>
        match(i, id, size) ? { ...i, quantity: Math.max(1, newQty) } : i
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((i) => !match(i, id, size)));
  };

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({ cartItems, isOpen, setIsOpen, addToCart, updateQuantity, removeFromCart, clearCart }),
    [cartItems, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
