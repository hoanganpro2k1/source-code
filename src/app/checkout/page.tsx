"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Copy,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"waiting" | "success">(
    "waiting",
  );

  const bankInfo = {
    bankName: "Vietinbank",
    accountName: "BUI HOANG AN",
    accountNumber: "100876668851",
    amount: "2,000",
    description: "SEVQR CODE789", // Mandatory prefix for VietinBank
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Poll for payment success
  useEffect(() => {
    if (paymentStatus === "success") return;

    const checkPayment = async () => {
      try {
        const res = await fetch(
          `/api/payments/check?orderId=${bankInfo.description}`,
        );
        const data = await res.json();

        if (data.paid) {
          setPaymentStatus("success");
        }
      } catch (error) {
        console.error("Error checking payment:", error);
      }
    };

    const interval = setInterval(checkPayment, 3000); // Check every 3 seconds
    return () => clearInterval(interval);
  }, [paymentStatus, bankInfo.description]);

  const qrUrl = `https://qr.sepay.vn/img?acc=${bankInfo.accountNumber}&bank=${bankInfo.bankName.replace(" ", "")}&amount=2000&des=${bankInfo.description}`;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/cart"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-black text-foreground">
            Thanh toán đơn hàng
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6 p-8 rounded-[40px] border border-border bg-card shadow-2xl items-center text-center relative overflow-hidden"
          >
            {paymentStatus === "success" && (
              <div className="absolute inset-0 z-20 bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-primary mb-6"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                <h2 className="text-3xl font-black mb-2">
                  Thanh toán thành công!
                </h2>
                <p className="text-white/80 text-sm mb-8 text-center leading-relaxed">
                  Cảm ơn bạn đã tin tưởng CodeDoan. Đơn hàng của bạn đã được xác
                  nhận tự động.
                </p>
                <Link href="/source" className="w-full">
                  <Button className="w-full h-14 bg-white text-primary hover:bg-white/90 font-bold rounded-2xl gap-2">
                    Truy cập kho sản phẩm <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-2 mb-2">
              <h3 className="text-lg font-bold text-foreground">
                Quét mã VietQR để thanh toán
              </h3>
              <p className="text-xs text-muted-foreground">
                Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét
              </p>
            </div>

            <div className="relative aspect-square w-full max-w-[280px] p-4 bg-white rounded-3xl shadow-inner">
              <Image
                src={qrUrl}
                alt="Payment QR"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex items-center gap-3 py-3 px-6 rounded-2xl bg-primary/5 border border-primary/10 text-primary animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Đang chờ thanh toán...
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground italic">
              <Clock className="h-3 w-3" />
              <span>Mã QR sẽ hết hạn sau 15:00</span>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="p-8 rounded-[40px] border border-border bg-card shadow-xl flex flex-col gap-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Thông tin chuyển khoản
              </h3>

              <div className="flex flex-col gap-5">
                {[
                  { label: "Ngân hàng", value: bankInfo.bankName },
                  { label: "Chủ tài khoản", value: bankInfo.accountName },
                  {
                    label: "Số tài khoản",
                    value: bankInfo.accountNumber,
                    copyable: true,
                  },
                  {
                    label: "Số tiền",
                    value: bankInfo.amount + "đ",
                    highlight: true,
                  },
                  {
                    label: "Nội dung",
                    value: bankInfo.description,
                    copyable: true,
                    highlight: true,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1.5 group">
                    <span className="text-xs text-muted-foreground font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-base font-bold ${item.highlight ? "text-primary text-xl" : "text-foreground"}`}
                      >
                        {item.value}
                      </span>
                      {item.copyable && (
                        <button
                          onClick={() => handleCopy(item.value, item.label)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all relative"
                        >
                          <Copy className="h-4 w-4" />
                          {copied === item.label && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-[10px] text-white rounded shadow-lg whitespace-nowrap">
                              Đã copy
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-primary">
                  Lưu ý quan trọng
                </h4>
                <p className="text-xs text-primary/70 leading-relaxed">
                  Vui lòng nhập <strong>đúng nội dung chuyển khoản</strong> để
                  hệ thống tự động xác nhận đơn hàng của bạn trong 1-2 phút.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-medium">
              <ShieldCheck className="h-3 w-3 text-orange-400" />
              <span>Thanh toán bảo mật qua cổng SePay</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
