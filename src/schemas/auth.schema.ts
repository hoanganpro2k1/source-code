import { z } from "zod";

// Bước 1: chỉ email + password
export const LoginStep1Schema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(1, "Email không được để trống"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginStep1Type = z.infer<typeof LoginStep1Schema>;

// Bước 2: chỉ mã xác thực (TOTP hoặc OTP email, không được cả 2)
export const LoginVerifySchema = z
  .object({
    totpCode: z.string().length(6, "Mã TOTP phải có đúng 6 ký tự").optional().or(z.literal("")),
    code: z.string().length(6, "Mã OTP phải có đúng 6 ký tự").optional().or(z.literal("")),
  })
  .superRefine(({ totpCode, code }, ctx) => {
    const hasTotpCode = totpCode !== undefined && totpCode !== "";
    const hasCode = code !== undefined && code !== "";
    if (hasTotpCode && hasCode) {
      const message = "Chỉ nên nhập mã TOTP hoặc mã OTP, không được nhập cả hai";
      ctx.addIssue({ path: ["totpCode"], message, code: "custom" });
      ctx.addIssue({ path: ["code"], message, code: "custom" });
    }
  });

export type LoginVerifyType = z.infer<typeof LoginVerifySchema>;

// Type gộp để gọi API login (bước 2 gửi đầy đủ email+password+code)
// loginContext báo cho backend biết form nào đang gọi (client/admin) để
// chặn đăng nhập sai khu vực (Admin không được vào form client và ngược lại).
export type LoginBodyType = LoginStep1Type &
  LoginVerifyType & { loginContext?: "client" | "admin" };

export const SendOTPSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  type: z.enum(["REGISTER", "FORGOT_PASSWORD", "LOGIN", "DISABLE_2FA"]),
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

export const ForgotPasswordSchema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    code: z
      .string()
      .min(6, "Mã OTP phải có đúng 6 ký tự")
      .max(6, "Mã OTP phải có đúng 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmNewPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmNewPassword"],
      });
    }
  });

export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordSchema>;
