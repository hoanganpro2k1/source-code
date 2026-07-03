"use client";

import { ReceiverInfoDialog } from "@/components/sections/cart/ReceiverInfoDialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCheckout } from "@/hooks/use-checkout";
import { formatCurrency } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { LogIn, ShieldCheck, ShoppingCart, Ticket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const CartSummary = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);

  const groups = data?.data ?? [];
  const allItems = groups.flatMap((group) => group.cartItems);
  const totalAmount = allItems.reduce(
    (sum, item) => sum + item.sku.price * item.quantity,
    0,
  );

  const { form, isSubmitting, onSubmit } = useCheckout(groups);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">
      {/* Coupon */}
      <div className="flex flex-col gap-4 p-6 rounded-sm border border-border bg-card shadow-sm">
        <h3 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
          <Ticket className="h-3 w-3" /> MÃ GIẢM GIÁ
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã..."
            className="flex-1 h-10 bg-muted border border-border rounded-sm px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
          />
          <button className="px-6 h-10 rounded-sm bg-primary text-xs font-bold text-white hover:bg-primary/90 transition-colors">
            Áp dụng
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-6 p-8 rounded-sm border border-border bg-card shadow-xl">
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            TỔNG ĐƠN HÀNG
          </h3>

          <div className="flex flex-col gap-3">
            {allItems.length === 0 && (
              <span className="text-sm text-muted-foreground">
                Chưa có sản phẩm nào trong giỏ hàng.
              </span>
            )}
            {allItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground line-clamp-1 flex-1">
                  {item.sku.product.name}
                </span>
                <span className="font-bold text-foreground">
                  {formatCurrency(item.sku.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-lg pt-6 border-t border-border/50">
          <span className="font-bold text-foreground">Tổng thanh toán</span>
          <span className="font-black text-primary">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        {accessToken ? (
          <Button
            size="lg"
            disabled={allItems.length === 0}
            onClick={() => setDialogOpen(true)}
            className="h-14 rounded-sm text-base font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3 w-full disabled:opacity-50 disabled:hover:scale-100"
          >
            <ShoppingCart className="h-5 w-5" /> Thanh toán tất cả •{" "}
            {formatCurrency(totalAmount)}
          </Button>
        ) : (
          <Link href="/login" className="w-full">
            <Button
              size="lg"
              className="h-14 rounded-sm text-base font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3 w-full"
            >
              <LogIn className="h-5 w-5" /> Đăng nhập để thanh toán
            </Button>
          </Link>
        )}

        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-medium">
          <ShieldCheck className="h-3 w-3 text-orange-400" />
          <span>Thanh toán bảo mật qua SePay</span>
        </div>
      </div>

      <ReceiverInfoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        form={form}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
