"use client";

import { useAuthStore } from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";

export function AuthProvider({
  children,
  initialAccessToken,
}: {
  children: React.ReactNode;
  initialAccessToken?: string;
}) {
  // Dùng useState lazy init để chạy logic khởi tạo 1 lần duy nhất một cách đồng bộ (synchronous) trong lần render đầu tiên
  useState(() => {
    if (!useAuthStore.getState().isInitialized) {
      if (initialAccessToken) {
        try {
          const base64Url = initialAccessToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join(""),
          );
          const decoded = JSON.parse(jsonPayload);

          const user = {
            id: String(decoded.userId),
            username: decoded.email || "",
            role: decoded.roleName,
          };

          // Cập nhật state ngay trong lúc render để các Component con có dữ liệu ngay lập tức (tránh nháy UI)
          useAuthStore.setState({
            accessToken: initialAccessToken,
            user,
            isInitialized: true,
          });
        } catch (error) {
          useAuthStore.setState({ isInitialized: true });
        }
      } else {
        useAuthStore.setState({ isInitialized: true });
      }
    }
    return true;
  });

  // Khởi chạy ngầm việc kiểm tra hạn sử dụng của token
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const currentToken = useAuthStore.getState().accessToken;
      if (!currentToken) return;

      try {
        const base64Url = currentToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        );
        const decoded = JSON.parse(jsonPayload);

        // Nếu token còn sống dưới 1 giờ (3600000 ms), thì tự động gọi API lấy token mới
        if (decoded.exp * 1000 <= Date.now() + 3600000) {
          const res = await axios.post("/api/auth/refresh");
          const newAccessToken = res.data.accessToken;

          if (newAccessToken) {
            const newBase64Url = newAccessToken.split(".")[1];
            const newBase64 = newBase64Url
              .replace(/-/g, "+")
              .replace(/_/g, "/");
            const newJsonPayload = decodeURIComponent(
              atob(newBase64)
                .split("")
                .map(
                  (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2),
                )
                .join(""),
            );
            const newDecoded = JSON.parse(newJsonPayload);

            useAuthStore.getState().setAuth(newAccessToken, {
              id: String(newDecoded.userId),
              username: newDecoded.email || "",
              role: newDecoded.roleName,
            });
          }
        }
      } catch (error) {
        // Nếu refresh lỗi (có thể do refreshToken hết hạn), xóa sạch auth
        useAuthStore.getState().clearAuth();
      }
    };

    checkTokenExpiration();
  }, []);

  // Bỏ chặn isMounting vì chúng ta đã có token từ Server gửi qua prop
  return <>{children}</>;
}
