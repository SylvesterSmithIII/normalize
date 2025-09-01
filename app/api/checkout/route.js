import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Example object mapping product name → image URL
const productImages = {


        "My Own Muse Cheetah Tee": "https://images-api.printify.com/mockup/689641b6da39ea6b4a025c44/11986/92570/my-own-muse-cheetah-tee.jpg?camera_label=front",



        "More of Me Poodle Tee": "https://images-api.printify.com/mockup/6896531d07d2b55d81039730/12100/92570/more-of-me-poodle-tee.jpg?camera_label=front",



        "Choose To Be Kind Teddy Tee": "https://images-api.printify.com/mockup/689633143465ef8d7103a608/12034/92570/choose-to-be-kind-teddy-tee.jpg?camera_label=front",



        "A Better World Teddy Tee": "https://images-api.printify.com/mockup/6896294b3465ef8d7103a3b3/11974/92570/a-better-world-teddy-tee.jpg?camera_label=front",


        "Red Bra Tee": "https://images-api.printify.com/mockup/6894f93110430a23e7100ef4/12100/92570/red-bra-tee.jpg?camera_label=front",

        "New York Flower Tee": "https://images-api.printify.com/mockup/68951c08494f5a8a9a0dda74/12100/92570/new-york-flower-tee.jpg?camera_label=front",


        "I Love Who I Am Tee": "https://images-api.printify.com/mockup/68952214a545d9b6950a4022/12124/92570/i-love-who-i-am-tee.jpg?camera_label=front",

        "Choose To Be Kind Butterfly Tee": "https://images-api.printify.com/mockup/6894f9fb8a6d7e74790c1fb8/11980/92570/choose-to-be-kind-butterfly-tee.jpg?camera_label=front",


        "Always Day Dreamin’ Tee": "https://images-api.printify.com/mockup/68952cdfc346375a490ce9a2/11986/92570/always-day-dreamin-tee.jpg?camera_label=front",

        "Red Corset Tee": "https://images-api.printify.com/mockup/6895188da4c8e9cc5e0cfd00/12100/92570/red-corset-tee.jpg?camera_label=front",

      }
     

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

    // Map items for Stripe
    const line_items = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [productImages[item.title] || ""], // pull image from object
        },
        unit_amount: item.price, // cents
      },
      quantity: item.quantity,
    }));

    // Shipping options (Stripe will display them for selection)
    const shipping_options = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 475 + (totalQuantity - 1) * 240, // first item + additional items
            currency: "usd",
          },
          display_name: "Standard",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 399 + (totalQuantity - 1) * 209, // first item + additional items
            currency: "usd",
          },
          display_name: "Economy",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 4 },
            maximum: { unit: "business_day", value: 8 },
          },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cart`,
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
