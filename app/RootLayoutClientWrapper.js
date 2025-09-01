'use client';

import { CartProvider } from "@/components/CartContext";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";

export default function RootLayoutClientWrapper({ children }) {
  return (
    <CartProvider>
      <Nav />
      <CartDrawer />
      {children}
    </CartProvider>
  );
}
