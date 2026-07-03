import { LoginStep1Schema, type LoginStep1Type } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { decodeJwt } from "@/lib/jwt";
import { parseApiError } from "@/lib/api-error";
import { getSafeCallbackUrl } from "@/lib/utils";

// Key lưu thông tin tạm trong sessionStorage để truyền qua trang verify
export const LOGIN_SESSION_KEY = "login_pending_2fa";

export const useLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  const form = useForm<LoginStep1Type>({
    resolver: zodResolver(LoginStep1Schema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginStep1Type) => authService.login(values),
    onSuccess: (data: any) => {
      // Backend yêu cầu xác thực 2FA → redirect sang trang verify
      if (data?.requiresTwoFactor) {
        sessionStorage.setItem(
          LOGIN_SESSION_KEY,
          JSON.stringify({
            email: form.getValues("email"),
            password: form.getValues("password"),
            callbackUrl,
          }),
        );
        router.push("/login/verify");
        return;
      }

      // Login thành công (không 2FA) → setAuth và redirect
      const { accessToken } = data;
      if (!accessToken) {
        toast.error("Đăng nhập thất bại: Không nhận được mã truy cập.");
        return;
      }

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

      if (callbackUrl) {
        router.push(callbackUrl);
      } else if (user?.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/source");
      }
      router.refresh();
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Sai thông tin đăng nhập hoặc lỗi kết nối hệ thống."));
    },
  });

  const googleMutation = useMutation({
    mutationFn: () => authService.getGoogleLink(),
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Không tìm thấy liên kết đăng nhập bằng Google.");
      }
    },
    onError: (error: unknown) => {
      toast.error(parseApiError(error, "Không thể khởi động đăng nhập bằng Google."));
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    isGoogleLoading: googleMutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
    handleGoogleLogin: () => googleMutation.mutate(),
  };
};
