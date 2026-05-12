import { NextResponse } from "next/server";
import { payments } from "@/lib/payment-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ success: false, message: "Missing orderId" }, { status: 400 });
  }

  const isPaid = !!payments[orderId];

  return NextResponse.json({ 
    success: true, 
    paid: isPaid 
  });
}
