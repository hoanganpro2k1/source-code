"use client";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useLogout(redirectTo: string = "/") {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    } finally {
      clearAuth();
      router.push(redirectTo);
      router.refresh();
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, clearAuth, router, redirectTo]);

  return { logout, isLoggingOut };
}
