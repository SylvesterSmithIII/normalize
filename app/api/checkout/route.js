import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

    // Map items for Stripe (attach Printify IDs in metadata)
    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productTitle + " - " + item.variantTitle,
            description: item.description,
            images: [item.image],
            metadata: {
              printify_product_id: item.productId,
              printify_variant_id: item.variantId,
              size: item.size,
              color: item.color,
            },
          },
          unit_amount: item.price, // cents
        },
        quantity: item.quantity,
      };
    });

    // Shipping options (Stripe will display them for selection)
    const shipping_options = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 475 + (totalQuantity - 1) * 240,
            currency: "usd",
          },
          display_name: "Standard",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
          metadata: { printify_shipping_method: "1" }, // Printify standard
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 399 + (totalQuantity - 1) * 209,
            currency: "usd",
          },
          display_name: "Economy",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 4 },
            maximum: { unit: "business_day", value: 8 },
          },
          metadata: { printify_shipping_method: "4" }, // Printify economy
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Stripe checkout failed" }, { status: 500 });
  }
}
