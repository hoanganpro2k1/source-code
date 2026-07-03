import { apiClient } from "@/lib/axios";
import type {
  CreateOrderItem,
  CreateOrderResponse,
  OrderDetail,
} from "@/types/order";

export const orderService = {
  createOrder: async (body: CreateOrderItem[]) => {
    const res = await apiClient.post<CreateOrderResponse>("/orders", body);
    return res.data;
  },

  getOrderDetail: async (orderId: number) => {
    const res = await apiClient.get<OrderDetail>(`/orders/${orderId}`);
    return res.data;
  },
};
