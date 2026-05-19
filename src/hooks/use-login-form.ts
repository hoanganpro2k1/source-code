import { LoginSchema, type LoginBodyType } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Giải mã JWT Token không cần thư viện ngoài
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

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
      const decoded = decodeToken(accessToken);
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
    onError: (error: any) => {
      // Phân tích chi tiết cấu trúc phản hồi lỗi từ NestJS validation
      const responseData = error.response?.data;
      let message = "Sai thông tin đăng nhập hoặc lỗi kết nối hệ thống.";

      if (responseData) {
        if (typeof responseData.message === "string") {
          message = responseData.message;
        } else if (Array.isArray(responseData.message)) {
          message = responseData.message.map((err: any) => err.message || err).join(", ");
        } else if (Array.isArray(responseData)) {
          message = responseData.map((err: any) => err.message || err.error).join(", ");
        }
      }

      toast.error(message);
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  };
};
