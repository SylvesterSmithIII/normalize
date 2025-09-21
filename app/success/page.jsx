"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); // Stripe Checkout Session ID
  const email = searchParams.get("email");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      setLoading(true);
      setError(null);
      try {
        // Call Printify API to get order by external_id
        const res = await fetch(`/api/printify-order?external_id=${orderId}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7E9] px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-amber-950 mb-2">Thank you for your purchase!</h1>
        <p className="text-lg text-gray-700 mb-4">Your order has been received and is being processed.</p>
        {orderId && <h2 className="text-xl font-semibold text-amber-700 mb-2">Order ID: {orderId}</h2>}
        {email && <h3 className="text-md text-gray-600 mb-4">A confirmation email will be sent to: {email}</h3>}
        {loading && <p className="text-amber-700">Loading your order details...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {order && (
          <div className="mt-6 text-left">
            <h2 className="text-2xl font-bold mb-2">Order Preview</h2>
            <p className="mb-2"><b>Status:</b> {order.status}</p>
            <p className="mb-2"><b>Shipping:</b> {order.shipping_method}</p>
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.line_items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-[#FFF7E9] rounded p-3 shadow">
                  {/* Try to show image if available */}
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={`Product ${item.product_id}`}
                      width={80}
                      height={80}
                      className="rounded border"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded border text-gray-400">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="font-medium">Product ID: {item.product_id}</p>
                    <p className="text-sm">Variant ID: {item.variant_id}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg font-bold">Total: ${order.total_price / 100}</p>
          </div>
        )}
        <p className="mt-8 text-gray-600">If you have any questions, please contact support.</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
