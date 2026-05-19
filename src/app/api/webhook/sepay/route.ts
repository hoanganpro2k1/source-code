import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
    const referenceNumber = body.reference_number;

    // Save to Database
    await prisma.transaction.upsert({
      where: { order_id: orderId },
      update: {
        amount,
        reference_number: referenceNumber,
        status: "PAID",
      },
      create: {
        order_id: orderId,
        amount,
        reference_number: referenceNumber,
        status: "PAID",
      },
    });

    console.log(`Order '${orderId}' saved to Database via Webhook.`);

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
