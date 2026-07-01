import { type LoginBodyType } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { decodeJwt } from "@/lib/jwt";
import { parseApiError } from "@/lib/api-error";
import { LOGIN_SESSION_KEY } from "@/hooks/use-login-form";

export type TwoFactorType = "totp" | "otp";

export const useVerifyForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  // Loại xác thực đang dùng
  const [twoFactorType, setTwoFactorType] = useState<TwoFactorType>("totp");
  // Trạng thái resend OTP
  const [resendCountdown, setResendCountdown] = useState(0);

  // Đọc sessionStorage 1 lần khi khởi tạo (lazy initializer — không gây cascading render)
  const [pendingSession] = useState<{ email: string; password: string } | null>(() => {
    if (typeof window === "undefined") return null; // SSR safety
    try {
      const raw = sessionStorage.getItem(LOGIN_SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { email: string; password: string };
      return parsed.email && parsed.password ? parsed : null;
    } catch {
      return null;
    }
  });

  const pendingEmail = pendingSession?.email ?? "";
  const pendingPassword = pendingSession?.password ?? "";

  // Effect chỉ dùng để redirect (không setState) — đúng theo React guidelines
  useEffect(() => {
    if (!pendingEmail || !pendingPassword) {
      router.replace("/login");
    }
  }, [pendingEmail, pendingPassword, router]);

  // Che email: h***@gmail.com
  const maskedEmail = pendingEmail
    ? pendingEmail.replace(/^(.{1,2})(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(Math.min(b.length, 6)) + c)
    : "";

  // Gửi OTP email (type LOGIN)
  const resendMutation = useMutation({
    mutationFn: () =>
      authService.sendOTP({ email: pendingEmail, type: "LOGIN" }),
    onSuccess: () => {
      toast.success("Đã gửi mã OTP đến email của bạn!");
      // Bắt đầu countdown 60s
      setResendCountdown(60);
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Không thể gửi mã OTP, vui lòng thử lại."));
    },
  });

  // Countdown timer cho nút resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Submit mã xác thực
  const verifyMutation = useMutation({
    mutationFn: (code: string) => {
      const payload: LoginBodyType = {
        email: pendingEmail,
        password: pendingPassword,
        ...(twoFactorType === "totp" ? { totpCode: code } : { code }),
      };
      return authService.login(payload);
    },
    onSuccess: (data: any) => {
      const { accessToken } = data;

      if (!accessToken) {
        toast.error("Xác thực thất bại: Không nhận được mã truy cập.");
        return;
      }

      // Xóa session sau khi xác thực thành công
      sessionStorage.removeItem(LOGIN_SESSION_KEY);

      // Giải mã token để lấy role
      const decoded = decodeJwt<{ userId: number; email: string; roleName: string }>(accessToken);
      const user = decoded
        ? {
            id: String(decoded.userId),
            username: decoded.email || "",
            role: decoded.roleName,
          }
        : undefined;

      setAuth(accessToken, user);
      toast.success("Đăng nhập thành công!");

      if (user?.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/source");
      }
      router.refresh();
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Mã xác thực không hợp lệ, vui lòng thử lại."));
    },
  });

  const handleBack = () => {
    sessionStorage.removeItem(LOGIN_SESSION_KEY);
    router.push("/login");
  };

  const handleResendOTP = () => {
    if (resendCountdown > 0 || resendMutation.isPending) return;
    resendMutation.mutate();
  };

  return {
    maskedEmail,
    twoFactorType,
    setTwoFactorType,
    resendCountdown,
    isResending: resendMutation.isPending,
    isVerifying: verifyMutation.isPending,
    submitCode: (code: string) => verifyMutation.mutate(code),
    handleBack,
    handleResendOTP,
    // Chỉ cho submit khi email đã được load từ session
    isReady: !!pendingEmail,
  };
};
