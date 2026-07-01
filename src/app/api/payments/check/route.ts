import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isOrderPaid } from "@/lib/payment-store";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }

  const paid = await isOrderPaid(orderId);

  return NextResponse.json({ paid });
}
