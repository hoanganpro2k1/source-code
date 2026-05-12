import { NextResponse } from "next/server";
import { payments } from "@/lib/payment-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Log the transaction
    console.log("SePay Webhook Received:", body);

    // 2. Security: Verify SePay API Key
    const authHeader = req.headers.get("Authorization");
    const expectedKey = `Apikey ${process.env.SEPAY_API_KEY}`;

    if (process.env.SEPAY_API_KEY && authHeader !== expectedKey) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 3. Process the payment logic
    const orderId = body.description;
    const amount = body.amount_in;

    console.log(`Processing Webhook: orderId='${orderId}', amount=${amount}`);

    // Mark as paid in the store
    payments[orderId] = true;
    console.log(`Order '${orderId}' marked as PAID in store. Current store:`, payments);

    // 4. Return 200 to SePay
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SePay Webhook Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
