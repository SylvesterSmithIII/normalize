'use client'

import { useCart } from "./CartContext";
import { useEffect } from "react";

export default function CartDrawer() {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart } = useCart();

  // Lock scrolling when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transition-transform duration-300 flex flex-col z-20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl font-bold">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 border-2 border-black rounded-none hover:bg-black hover:text-white"
                  >–</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="px-2 py-1 border-2 border-black rounded-none hover:bg-black hover:text-white"
                  >+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="ml-2 text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
