import { LoginSchema, type LoginBodyType } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { decodeJwt } from "@/lib/jwt";
import { parseApiError } from "@/lib/api-error";

export const useLoginForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginBodyType) => authService.login(values),
    onSuccess: (data) => {
      const { accessToken } = data;

      if (!accessToken) {
        toast.error("Đăng nhập thất bại: Không nhận được mã truy cập.");
        return;
      }

      // Giải mã token để lấy vai trò (role) và ID
      const decoded = decodeJwt<{ userId: number; email: string; roleName: string }>(accessToken);
      const user = decoded
        ? {
            id: String(decoded.userId),
            username: decoded.email || "",
            role: decoded.roleName,
          }
        : undefined;

      // Lưu trữ thông tin đăng nhập vào Zustand Store (được lưu trên RAM/Cookie)
      setAuth(accessToken, user);

      toast.success("Đăng nhập thành công!");

      // Chuyển hướng người dùng: Admin vào trang quản trị, User về trang Marketplace hoặc trang chủ
      if (user?.role === "ADMIN") {
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

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  };
};
