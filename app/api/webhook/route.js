
import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
// 🔹 helper: send confirmation email
async function sendConfirmationEmail({ to, orderId, lineItems }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Build order summary table
  const itemsTable = `
    <table style="width:100%;border-collapse:collapse;margin-top:16px;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="border:1px solid #ddd;padding:8px;">Product ID</th>
          <th style="border:1px solid #ddd;padding:8px;">Variant ID</th>
          <th style="border:1px solid #ddd;padding:8px;">Quantity</th>
        </tr>
      </thead>
      <tbody>
        ${lineItems.map(item => `
          <tr>
            <td style="border:1px solid #ddd;padding:8px;">${item.product_id}</td>
            <td style="border:1px solid #ddd;padding:8px;">${item.variant_id}</td>
            <td style="border:1px solid #ddd;padding:8px;">${item.quantity}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your Order Confirmation",
    text: `Thank you for your order! Your order ID is ${orderId}. We are processing your order and will notify you when it ships.\n\nOrder Summary:\n${lineItems.map(item => `Product ID: ${item.product_id}, Variant ID: ${item.variant_id}, Quantity: ${item.quantity}`).join('\n')}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h1 style="color:#222;">Thank you for your order!</h1>
        <p>Your order ID is <b>${orderId}</b>. We are processing your order and will notify you when it ships.</p>
        <h2 style="margin-top:32px;">Order Summary</h2>
        ${itemsTable}
        <p style="margin-top:32px;">If you have any questions, reply to this email or contact support.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

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
  // Printify order created successfully
      // Send confirmation email
      if (customer?.email) {
        try {
          await sendConfirmationEmail({
            to: customer.email,
            orderId: session.id,
            lineItems,
          });
          // Confirmation email sent successfully
        } catch (emailErr) {
          console.error("❌ Email error:", emailErr.message);
        }
      }
    } catch (err) {
  console.error("❌ Printify order error:", err.message);
    }
  }

  return NextResponse.json({ received: true });
}
