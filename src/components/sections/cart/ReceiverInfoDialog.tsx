"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ReceiverInfoType } from "@/schemas/checkout.schema";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface ReceiverInfoDialogProps {
  open: boolean;
  onClose: () => void;
  form: UseFormReturn<ReceiverInfoType>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ReceiverInfoDialog = ({
  open,
  onClose,
  form,
  onSubmit,
  isSubmitting,
}: ReceiverInfoDialogProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[32px] border border-border bg-card p-8 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-foreground">
                Thông tin nhận hàng
              </h3>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" placeholder="Nguyễn Văn A" {...register("name")} />
                {errors.name && (
                  <span className="text-xs text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" placeholder="0901234567" {...register("phone")} />
                {errors.phone && (
                  <span className="text-xs text-red-500">{errors.phone.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
                  {...register("address")}
                />
                {errors.address && (
                  <span className="text-xs text-red-500">{errors.address.message}</span>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 rounded-2xl font-bold gap-2 mt-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Tạo đơn hàng &amp; Thanh toán
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
