import { apiClient } from "@/lib/axios";
import type { GetCartResponse } from "@/types/cart";

export const cartService = {
  getCart: async () => {
    const res = await apiClient.get<GetCartResponse>("/cart", {
      params: { page: 1, limit: 50 },
    });
    return res.data;
  },

  updateCartItem: async (
    cartItemId: number,
    body: { skuId: number; quantity: number },
  ) => {
    const res = await apiClient.put(`/cart/${cartItemId}`, body);
    return res.data;
  },

  deleteCartItems: async (cartItemIds: number[]) => {
    const res = await apiClient.post("/cart/delete", { cartItemIds });
    return res.data;
  },
};
