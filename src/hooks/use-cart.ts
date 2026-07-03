"use client";

import { parseApiError } from "@/lib/api-error";
import { cartService } from "@/services/cart.service";
import { useAuthStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const CART_QUERY_KEY = ["cart"];

export const useCart = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => cartService.getCart(),
    enabled: !!accessToken,
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      skuId,
      quantity,
    }: {
      cartItemId: number;
      skuId: number;
      quantity: number;
    }) => cartService.updateCartItem(cartItemId, { skuId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Không thể cập nhật giỏ hàng."));
    },
  });
};

export const useRemoveCartItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemIds: number[]) =>
      cartService.deleteCartItems(cartItemIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Không thể xóa sản phẩm."));
    },
  });
};
