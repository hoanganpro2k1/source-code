import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ success: false, message: "Missing orderId" }, { status: 400 });
  }

  const transaction = await prisma.transaction.findUnique({
    where: { order_id: orderId }
  });

  return NextResponse.json({ 
    success: true, 
    paid: transaction?.status === "PAID" 
  });
}
