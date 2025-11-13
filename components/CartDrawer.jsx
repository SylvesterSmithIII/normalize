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

  // Calculate subtotal (price in cents)
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0), 0);

  // Shipping logic
  const shippingRates = {
    standard: { first: 4.75, additional: 2.4 },
    economy: { first: 3.99, additional: 2.09 },
  };

  // Shipping should consider total items (quantity), charging `first` for first item and `additional` for each additional unit
  const totalUnits = cartItems.reduce((acc, i) => acc + (Number(i.quantity) || 0), 0);
  const shipping = totalUnits > 0
    ? shippingRates[shippingMethod].first + shippingRates[shippingMethod].additional * Math.max(0, totalUnits - 1)
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
            productId: i.productId,
            productTitle: i.productTitle,
            variantId: i.variantId,
            variantTitle: i.variantTitle,
            color: i.color,
            size: i.size,
            quantity: i.quantity,
            price: i.price,
            cost: i.cost,
            image: i.image,
            description: i.description,
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
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transition-transform duration-300 flex flex-col z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl font-bold cursor-pointer">×</button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.key ?? `${item.variantId ?? item.productId ?? item.productTitle}-${item.size || ''}`} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img src={item.image} alt={item.productTitle} className="w-14 h-14 object-cover rounded border" />
                  )}
                  <div>
                    <p className="font-medium">{item.productTitle}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  </div>
                </div>

                  <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 border-2 border-black rounded-none hover:bg-black hover:text-white"
                  >–</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    className="px-2 py-1 border-2 border-black rounded-none hover:bg-black hover:text-white"
                  >+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.key)}
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
