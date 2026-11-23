// api/youcan-webhook.js
import { YcpFactory } from "ycp-sdk-ts";

const ycp = YcpFactory.ycp({
  privateKey: process.env.YOUCAN_PRIVATE_KEY,
  isSandboxMode: process.env.YOUCAN_SANDBOX === "true",
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const signature = req.headers["x-youcanpay-signature"];
  if (!signature || !ycp.validateWebhookSignature(req.body, signature)) {
    return res.status(401).end();
  }

  // Check the exact event name and fields in Dashboard > Developers > Webhook history
  const event = req.body;
  console.log("YouCan Pay webhook:", JSON.stringify(event));

  // TODO: if the event is a successful payment, mark the order paid / email yourself
  // the order id and metadata (items, total) from the payload.

  return res.status(200).json({ received: true });
}