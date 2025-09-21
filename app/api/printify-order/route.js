import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const external_id = searchParams.get("external_id");
  if (!external_id) {
    return NextResponse.json({ error: "Missing external_id" }, { status: 400 });
  }

  // Fetch Printify orders and filter by external_id
  const res = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`, {
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const data = await res.json();
  const order = data.orders.find(o => o.external_id === external_id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
