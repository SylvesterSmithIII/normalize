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

  // Create a stable composite key for each cart line: productId::variantId::size
  const makeKey = (productId, variantId, size) => `${productId ?? ''}::${variantId ?? ''}::${size ?? ''}`;

  // Match by composite key when available, otherwise try legacy id+size matching
  const match = (a, keyOrId, size) => {
    // If caller passed a composite key, compare by key
    if (typeof keyOrId === 'string' && keyOrId.includes('::')) {
      return a.key === keyOrId;
    }
    // Otherwise, compute incoming key from productId/variantId and size
    const incomingKey = makeKey(keyOrId, '', size);
    if (a.key) return a.key === incomingKey || a.key.includes(String(keyOrId));
    const aIds = [a.variantId, a.productId, a.id].filter(Boolean).map(String);
    const bId = String(keyOrId ?? '');
    return aIds.includes(bId) && String(a.size ?? '') === String(size ?? '');
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const incomingProductId = item.productId ?? item.id ?? '';
      const incomingVariantId = item.variantId ?? '';
      const incomingKey = makeKey(incomingProductId, incomingVariantId, item.size);

      const idx = prev.findIndex((p) => p.key === incomingKey || match(p, incomingVariantId, item.size) || match(p, incomingProductId, item.size));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity };
        return copy;
      }
      // attach key to new item for reliable future matching
      return [...prev, { ...item, quantity: Math.max(1, item.quantity), key: incomingKey }];
    });
  };

  // 🔑 absolute quantity (what your CartDrawer calls)
  // Update/remove operate on composite key (generated at add time)
  const updateQuantity = (key, newQty) => {
    setCartItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, newQty) } : i)));
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((i) => i.key !== key));
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
