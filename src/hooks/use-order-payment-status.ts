"use client";

import { orderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useOrderPaymentStatus = (orderId: number) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderService.getOrderDetail(orderId),
    enabled: Number.isFinite(orderId) && orderId > 0,
    // Poll BE cho tới khi webhook SePay cập nhật trạng thái đơn (không còn PENDING_PAYMENT)
    refetchInterval: (query) =>
      query.state.data?.status === "PENDING_PAYMENT" ? 3000 : false,
  });
};
