import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ"
}

// Chỉ chấp nhận đường dẫn nội bộ (bắt đầu bằng "/" và không phải "//host")
// để tránh open-redirect khi dùng callbackUrl từ query param do người dùng kiểm soát.
export function getSafeCallbackUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith("/\\")) return null
  return url
}
