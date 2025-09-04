import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// 🔹 helper: send order to Printify
async function sendOrderToPrintify(orderData) {
  const res = await fetch(
    `https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Printify order failed: ${err}`);
  }

  return res.json();
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ["line_items", "customer_details", "shipping_cost.shipping_rate"],
    });

    const customer = session.customer_details;

    // 🔹 Map Stripe line_items → Printify line_items
    const lineItems = session.line_items.data.map((item) => {
      console.log(item); // Debug log for item
      const meta = item.price_data.product_data.metadata;
      return {
        product_id: Number(meta.printify_product_id),
        variant_id: Number(meta.printify_variant_id),
        quantity: item.quantity,
      };
    });

    // 🔹 Map shipping method from Stripe → Printify
    const shippingMethod =
      session.shipping_cost?.shipping_rate?.metadata?.printify_shipping_method || "1";

    const printifyOrder = {
      external_id: session.id,
      line_items: lineItems,
      shipping_method: Number(shippingMethod),
      send_shipping_notification: true,
      address_to: {
        first_name: customer?.name?.split(" ")[0] || "First",
        last_name: customer?.name?.split(" ").slice(1).join(" ") || "Last",
        email: customer?.email,
        phone: "0000000000",
        country: customer?.address?.country,
        region: customer?.address?.state,
        address1: customer?.address?.line1,
        city: customer?.address?.city,
        zip: customer?.address?.postal_code,
      },
    };

    try {
      const orderRes = await sendOrderToPrintify(printifyOrder);
      console.log("✅ Printify order created:", orderRes.id);
    } catch (err) {
      console.error("❌ Failed to create Printify order:", err.message);
    }
  }

  return NextResponse.json({ received: true });
}
