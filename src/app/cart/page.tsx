"use client";

import { CartList } from "@/components/sections/cart/CartList";
import { CartSummary } from "@/components/sections/cart/CartSummary";
import { ChevronLeft, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <Link
              href="/source"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-foreground tracking-tight leading-none">
                  Giỏ hàng
                </h1>
                <span className="text-xs text-muted-foreground font-medium mt-1">
                  2 sản phẩm
                </span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-bold border border-red-100 hover:bg-red-500 hover:text-white transition-all">
            <Trash2 className="h-4 w-4" /> Xóa tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List Section */}
          <div className="lg:col-span-8">
            <CartList />

            {/* Continue Shopping */}
            <div className="mt-12 flex items-center justify-between p-8 rounded-[32px] border border-dashed border-border">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-foreground">
                  Tiếp tục tìm kiếm?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Còn rất nhiều source code chất lượng đang chờ bạn.
                </p>
              </div>
              <Link href="/source">
                <button className="px-6 py-3 rounded-2xl bg-muted text-sm font-bold text-foreground hover:bg-primary hover:text-white transition-all">
                  Xem thêm sản phẩm
                </button>
              </Link>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
