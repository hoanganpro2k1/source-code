"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, ShoppingCart, Ticket } from "lucide-react";
import Link from "next/link";

export const CartSummary = () => {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">
      {/* Coupon */}
      <div className="flex flex-col gap-4 p-6 rounded-[24px] border border-border bg-card shadow-sm">
        <h3 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
          <Ticket className="h-3 w-3" /> MÃ GIẢM GIÁ
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã..."
            className="flex-1 h-10 bg-muted border border-border rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
          />
          <button className="px-6 h-10 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary/90 transition-colors">
            Áp dụng
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-6 p-8 rounded-[32px] border border-border bg-card shadow-xl">
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            TỔNG ĐƠN HÀNG
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground line-clamp-1 flex-1">
                Đồ Án Website Bán Ô TÔ | Reac...
              </span>
              <span className="font-bold text-foreground">299.000đ</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground line-clamp-1 flex-1">
                Đồ Án Website Bán Kính | React...
              </span>
              <span className="font-bold text-foreground">299.000đ</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-lg pt-6 border-t border-border/50">
          <span className="font-bold text-foreground">Tổng thanh toán</span>
          <span className="font-black text-primary">2.000đ</span>
        </div>

        <Link href="/checkout" className="w-full">
          <Button
            size="lg"
            className="h-14 rounded-2xl text-base font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3 w-full"
          >
            <ShoppingCart className="h-5 w-5" /> Thanh toán tất cả • 2.000đ
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-medium">
          <ShieldCheck className="h-3 w-3 text-orange-400" />
          <span>Thanh toán bảo mật qua SePay</span>
        </div>
      </div>
    </div>
  );
};
