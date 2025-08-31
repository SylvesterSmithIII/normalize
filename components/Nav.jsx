'use client'

import { useCart } from "./CartContext";
import { Alex_Brush } from "next/font/google";
import Link from "next/link";

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function Nav() {
  const { setIsOpen, cartItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 lg:px-8 lg:py-6 bg-transparent z-50">
      {/* Left: Logo */}
      <div className={`text-xl lg:text-4xl font-bold text-white ${alexBrush.className}`}>
        Lets Normalize
      </div>

      {/* Right: Nav Links + Cart */}
      <div className="flex items-center gap-4 lg:gap-20 text-white font-medium text-sm lg:text-lg">
        <Link href="/" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link href="/shop" className="hover:text-yellow-300 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-yellow-300 transition">
          About
        </Link>

        {/* Cart Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="hidden lg:block relative px-4 py-2 border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
        >
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>

      </div>

      <button
          onClick={() => setIsOpen(true)}
          className="relative lg:hidden px-1 py-0.5 lg:px-4 lg:py-2 border-2 border-white rounded hover:bg-white text-white hover:text-black transition-colors"
        >
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
    </nav>
  );
}
