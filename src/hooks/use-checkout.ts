"use client";

import { CART_QUERY_KEY } from "@/hooks/use-cart";
import { parseApiError } from "@/lib/api-error";
import { ReceiverInfoSchema, type ReceiverInfoType } from "@/schemas/checkout.schema";
import { orderService } from "@/services/order.service";
import type { CartGroup } from "@/types/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCheckout = (cartGroups: CartGroup[]) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ReceiverInfoType>({
    resolver: zodResolver(ReceiverInfoSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  const mutation = useMutation({
    mutationFn: (receiver: ReceiverInfoType) =>
      orderService.createOrder(
        cartGroups.map((group) => ({
          shopId: group.shop.id,
          receiver,
          cartItemIds: group.cartItems.map((item) => item.id),
        })),
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      const orderId = data.orders[0]?.id;
      router.push(`/checkout?orderId=${orderId}&paymentId=${data.paymentId}`);
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Không thể tạo đơn hàng. Vui lòng thử lại."));
    },
  });

  return {
    form,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  };
};
