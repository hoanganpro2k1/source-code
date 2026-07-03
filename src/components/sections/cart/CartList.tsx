"use client";

import { useCart, useRemoveCartItems, useUpdateCartItem } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import { motion } from "framer-motion";
import { Loader2, Minus, Plus, Store, Trash2 } from "lucide-react";
import Image from "next/image";

const CartItemRow = ({ item, delay }: { item: CartItem; delay: number }) => {
  const updateCartItem = useUpdateCartItem();
  const removeCartItems = useRemoveCartItems();

  const isMutating = updateCartItem.isPending || removeCartItems.isPending;

  const handleChangeQuantity = (nextQuantity: number) => {
    if (isMutating) return;
    if (nextQuantity < 1) {
      removeCartItems.mutate([item.id]);
      return;
    }
    updateCartItem.mutate({
      cartItemId: item.id,
      skuId: item.skuId,
      quantity: nextQuantity,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col gap-4 p-6 rounded-sm border border-border bg-card group hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border border-border">
          <Image
            src={item.sku.image || item.sku.product.images?.[0] || "/placeholder.png"}
            alt={item.sku.product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1 pr-10 relative">
          <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors text-sm md:text-base line-clamp-2">
            {item.sku.product.name}
          </h3>
          {item.sku.value && (
            <span className="text-xs text-muted-foreground">{item.sku.value}</span>
          )}
          <button
            onClick={() => removeCartItems.mutate([item.id])}
            disabled={isMutating}
            className="absolute right-0 top-0 h-8 w-8 flex items-center justify-center rounded-sm bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-1 rounded-sm bg-muted/30 border border-border/50">
          <button
            onClick={() => handleChangeQuantity(item.quantity - 1)}
            disabled={isMutating}
            className="h-7 w-7 flex items-center justify-center rounded-sm bg-background text-muted-foreground hover:text-primary transition-all disabled:opacity-50"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-bold text-foreground">
            {item.quantity}
          </span>
          <button
            onClick={() => handleChangeQuantity(item.quantity + 1)}
            disabled={isMutating || item.quantity >= item.sku.stock}
            className="h-7 w-7 flex items-center justify-center rounded-sm bg-background text-muted-foreground hover:text-primary transition-all disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <span className="text-lg font-black text-primary">
          {formatCurrency(item.sku.price * item.quantity)}
        </span>
      </div>
    </motion.div>
  );
};

export const CartList = () => {
  const { data, isLoading, isError } = useCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải giỏ hàng...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-24 text-red-500 text-sm font-medium">
        Không thể tải giỏ hàng. Vui lòng thử lại.
      </div>
    );
  }

  const groups = data?.data ?? [];

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-2 border border-dashed border-border rounded-sm">
        <p className="text-foreground font-bold">Giỏ hàng của bạn đang trống</p>
        <p className="text-sm text-muted-foreground">
          Hãy khám phá kho source code chất lượng của chúng tôi.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.shop.id} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Store className="h-3.5 w-3.5" /> {group.shop.name}
          </div>
          {group.cartItems.map((item, i) => (
            <CartItemRow key={item.id} item={item} delay={i * 0.05} />
          ))}
        </div>
      ))}
    </div>
  );
};
