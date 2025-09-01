// app/api/stripe-webhook/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text(); // raw body required for webhook verification
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const items = JSON.parse(session.metadata.items || "[]");
    const shipping = session.metadata.shippingMethod;

    console.log(
      JSON.stringify({
        external_id: session.id,
        line_items: items.map((item) => ({
          variant_id: item.variantId,
          quantity: item.quantity,
          print_provider_id: item.printProviderId || 1,
          print_areas: [
            {
              placement: "front",
              images: [{ src: item.image }],
            },
          ],
        })),
        shipping_method: shipping,
        address: session.shipping,
      })
    );

    // Example: call Printify API (uncomment when ready)
    // await fetch("https://api.printify.com/v1/orders.json", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${process.env.PRINTIFY_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     external_id: session.id,
    //     line_items: items.map((item) => ({
    //       variant_id: item.variantId,
    //       quantity: item.quantity,
    //       print_provider_id: item.printProviderId || 1,
    //       print_areas: [
    //         {
    //           placement: "front",
    //           images: [{ src: item.image }],
    //         },
    //       ],
    //     })),
    //     shipping_method: shipping,
    //     address: session.shipping,
    //   }),
    // });
  }

  return NextResponse.json({ received: true });
}
