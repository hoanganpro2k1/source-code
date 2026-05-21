import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeJwt } from "@/lib/jwt";
import { useEffect } from "react";
import { toast } from "sonner";

export const useGoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const errorMessage = searchParams.get("errorMessage");

  const query = useQuery({
    queryKey: ["google-callback", accessToken, refreshToken, errorMessage],
    queryFn: async () => {
      if (errorMessage) {
        throw new Error(decodeURIComponent(errorMessage));
      }
      if (!accessToken || !refreshToken) {
        throw new Error("Không tìm thấy thông tin đăng nhập Google.");
      }
      return authService.googleLoginCallback(accessToken, refreshToken);
    },
    enabled: (!!accessToken && !!refreshToken) || !!errorMessage,
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.isSuccess && accessToken) {
      try {
        const decoded = decodeJwt<{ userId: number; email: string; roleName: string }>(accessToken);
        const user = decoded
          ? {
              id: String(decoded.userId),
              username: decoded.email || "",
              role: decoded.roleName,
            }
          : undefined;

        setAuth(accessToken, user);
        toast.success("Đăng nhập bằng Google thành công!");

        if (user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/source");
        }
        router.refresh();
      } catch (error) {
        console.error("Error setting Google auth session:", error);
        toast.error("Đã xảy ra lỗi khi cấu hình phiên đăng nhập.");
        router.push("/login");
      }
    }
  }, [query.isSuccess, accessToken, setAuth, router]);

  useEffect(() => {
    if (query.isError) {
      const errorMsg = query.error instanceof Error ? query.error.message : "Đăng nhập Google thất bại.";
      toast.error(errorMsg);
      router.push("/login");
    }
  }, [query.isError, query.error, router]);

  useEffect(() => {
    if (!accessToken && !refreshToken && !errorMessage) {
      router.push("/login");
    }
  }, [accessToken, refreshToken, errorMessage, router]);

  return {
    isLoading: query.isLoading && (!!accessToken || !!errorMessage),
    error: query.error ? (query.error instanceof Error ? query.error.message : "Lỗi đăng nhập Google") : null,
  };
};
