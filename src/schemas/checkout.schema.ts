import { z } from "zod";

export const ReceiverInfoSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(20, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Vui lòng nhập địa chỉ đầy đủ"),
});

export type ReceiverInfoType = z.infer<typeof ReceiverInfoSchema>;
