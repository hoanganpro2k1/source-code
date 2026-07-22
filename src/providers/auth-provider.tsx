"use client";

import { useAuthStore } from "@/store";
import { useState } from "react";

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

  // Không chủ động refresh token khi mount — việc refresh đã được xử lý
  // bởi response interceptor của axios (src/lib/axios.ts) ngay khi 1 request
  // thực sự nhận 401, tránh round-trip refresh thừa ở mọi lần load trang.

  // Bỏ chặn isMounting vì chúng ta đã có token từ Server gửi qua prop
  return <>{children}</>;
}
