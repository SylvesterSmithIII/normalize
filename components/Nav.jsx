'use client'

import { useState } from "react";
import { useCart } from "./CartContext";
import { Alex_Brush } from "next/font/google";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function Nav() {
  const { cartItems, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 lg:px-8 lg:py-6 bg-white lg:bg-transparent z-50">
      {/* Left: Hamburger menu (mobile only) */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black lg:text-white hover:text-yellow-300 transition"
        >
          <Menu size={28} />
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute top-14 left-4 bg-black text-white rounded-lg shadow-lg p-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </div>
        )}
      </div>

      {/* Center: Logo */}
      <div className={`text-xl lg:text-4xl font-bold text-black lg:text-white ${alexBrush.className}`}>
        Lets Normalize
      </div>

      {/* Right: Cart Icon (Mobile) */}
      <button
        onClick={() => setIsOpen(true)} // <-- open drawer instead of checkout
        className="relative hover:text-yellow-300 transition"
      >
        <ShoppingCart size={28} className="lg:hidden" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-black lg:text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Desktop Nav Links + Cart */}
      <div className="hidden lg:flex items-center gap-20 text-black lg:text-white font-medium text-lg">
        <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link href="/shop" className="hover:text-yellow-300 transition">Shop</Link>
        <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
        <button
          onClick={() => setIsOpen(true)} // <-- open drawer
          className="relative px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
        >
          <ShoppingCart size={28} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
