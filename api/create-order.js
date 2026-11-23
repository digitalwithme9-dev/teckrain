// api/create-order.js
import { YcpFactory } from "ycp-sdk-ts";
import { priceOrder } from "./_catalog.js";

const ycp = YcpFactory.ycp({
  privateKey: process.env.YOUCAN_PRIVATE_KEY,
  isSandboxMode: process.env.YOUCAN_SANDBOX === "true",
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { customer, items, method } = req.body;
    if (!customer?.name || !customer?.email || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ error: "Invalid order" });
    }

    const totals = priceOrder(items);
    const orderId = `TR-${Date.now().toString().slice(-8)}`;
    const order = { id: orderId, customer, items, ...totals, payment: method };

    if (method === "cod") {
      await notify(order, "New COD order");
      return res.json({ order });
    }

    const token = await ycp.tokenizePayment({
      order_id: orderId,
      amount: Math.round(totals.total * 100), // smallest unit; confirm in sandbox
      currency: "MAD",
      customer_ip: (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "127.0.0.1",
      success_url: `${process.env.SITE_URL}/success?order=${orderId}`,
      error_url: `${process.env.SITE_URL}/checkout?payment=failed`,
      customer: {
        name: customer.name,
        address: customer.address,
        zip_code: customer.postal,
        city: customer.city,
        state: customer.city,
        country_code: "MA",
        phone: customer.phone,
        email: customer.email,
      },
      // comes back in the webhook, so no database is needed to know what was ordered
      metadata: { items: JSON.stringify(items), total: String(totals.total) },
    });

    return res.json({ paymentUrl: token.paymentUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create order" });
  }
}

async function notify(order, subject) {
  // Send yourself an email (e.g. Resend free tier), WhatsApp, or Telegram message here.
  console.log(subject, JSON.stringify(order));
}