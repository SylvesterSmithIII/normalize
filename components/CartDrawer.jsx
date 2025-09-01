'use client'

import { useCart } from "./CartContext";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [loading, setLoading] = useState(false);

  // Lock scrolling when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Shipping logic
  const shippingRates = {
    standard: { first: 4.75, additional: 2.4 },
    economy: { first: 3.99, additional: 2.09 },
  };

  const shipping = cartItems.length > 0
    ? shippingRates[shippingMethod].first +
      shippingRates[shippingMethod].additional * (cartItems.length - 1)
    : 0;

  const total = subtotal / 100 + shipping; // assuming price is in cents

  // ✅ Checkout handler
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map(i => ({
            id: i.id,
            title: i.title,
            quantity: i.quantity,
            price: i.price,
            size: i.size
          })),
          shippingMethod,
          shippingCost: shipping,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
      } else {
        alert("Something went wrong with checkout.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Cart items */}
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

        {/* Shipping method */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                  className="mr-2"
                />
                Standard (2–5 business days)
              </label>
              <span>${shippingRates.standard.first.toFixed(2)} for first, ${shippingRates.standard.additional.toFixed(2)} each after</span>
            </div>
            <div className="flex justify-between items-center">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="economy"
                  checked={shippingMethod === "economy"}
                  onChange={() => setShippingMethod("economy")}
                  className="mr-2"
                />
                Economy (4–8 business days)
              </label>
              <span>${shippingRates.economy.first.toFixed(2)} for first, ${shippingRates.economy.additional.toFixed(2)} each after</span>
            </div>

            {/* Subtotal and total */}
            <div className="mt-4 border-t pt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mt-4"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
