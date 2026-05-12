import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .or(z.string().min(3, "Tên đăng nhập quá ngắn")),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginBodyType = z.infer<typeof LoginSchema>;
