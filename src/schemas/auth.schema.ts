import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .or(z.string().min(3, "Tên đăng nhập quá ngắn")),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginBodyType = z.infer<typeof LoginSchema>;

export const SendOTPSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  type: z.literal("REGISTER"),
});

export type SendOTPBodyType = z.infer<typeof SendOTPSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    phoneNumber: z
      .union([
        z.string().regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
        z.literal(""),
      ])
      .optional(),
    email: z.string().email("Email không hợp lệ"),
    code: z
      .string()
      .min(6, "Mã OTP phải có đúng 6 ký tự")
      .max(6, "Mã OTP phải có đúng 6 ký tự"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    terms: z
      .boolean()
      .refine((val) => val === true, { message: "Bạn phải đồng ý điều khoản" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.infer<typeof RegisterSchema>;
