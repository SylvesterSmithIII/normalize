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
      // Avoid double size in name if variantTitle already includes size
      let name = item.productTitle;
      if (item.variantTitle) {
        name += ` - ${item.variantTitle}`;
        // Only append size if not already in variantTitle
        if (!item.variantTitle.toLowerCase().includes(item.size?.toLowerCase?.() || "")) {
          name += item.size ? ` (${item.size})` : "";
        }
      } else {
        name += item.size ? ` (${item.size})` : "";
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            images: item.image ? [item.image] : [],
            metadata: {
              productId: item.productId,
              variantId: item.variantId,
              color: item.color,
              size: item.size,
            },
             tax_code: "txcd_99999999",
          },
          unit_amount: item.price,
          tax_behavior: "exclusive",
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
      automatic_tax: { enabled: true },
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
