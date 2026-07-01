import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  isTransactionProcessed,
  markOrderPaid,
} from "@/lib/payment-store";

// Payload SePay gửi khi có giao dịch, xem:
// https://docs.sepay.vn/tich-hop-webhooks.html
type SePayWebhookPayload = {
  id: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  subAccount: string | null;
  code: string | null;
  content: string;
  transferType: "in" | "out";
  description: string;
  transferAmount: number;
  accumulated: number;
  referenceCode: string;
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const expectedAuth = `Apikey ${process.env.SEPAY_API_KEY}`;

  if (!process.env.SEPAY_API_KEY || authHeader !== expectedAuth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  let payload: SePayWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Chỉ xử lý tiền vào, bỏ qua tiền ra
  if (payload.transferType !== "in") {
    return NextResponse.json({ success: true });
  }

  // Chống xử lý trùng khi SePay gửi lại (retry) cùng một giao dịch
  if (await isTransactionProcessed(payload.id)) {
    return NextResponse.json({ success: true });
  }

  // Nội dung chuyển khoản có thể bị ngân hàng thêm khoảng trắng/ký tự lạ,
  // nên so khớp orderId dạng "chứa" thay vì so khớp tuyệt đối.
  const orderId = extractOrderId(payload.content ?? payload.code ?? "");

  if (orderId) {
    await markOrderPaid(orderId, {
      transactionId: payload.id,
      amount: payload.transferAmount,
      content: payload.content,
      paidAt: payload.transactionDate,
    });
  }

  return NextResponse.json({ success: true });
}

function extractOrderId(content: string): string | null {
  const normalized = content.toUpperCase().replace(/\s+/g, " ").trim();
  const match = normalized.match(/CODE\d+/);
  return match ? `SEVQR ${match[0]}` : null;
}
