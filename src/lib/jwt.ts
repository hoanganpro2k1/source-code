import { decodeJwt as joseDecodeJwt } from "jose";

/**
 * Decode JWT payload sử dụng thư viện jose.
 * Chỉ dùng để đọc thông tin từ token — KHÔNG xác thực chữ ký.
 */
export function decodeJwt<T = Record<string, unknown>>(token: string): T | null {
  try {
    return joseDecodeJwt(token) as T;
  } catch {
    return null;
  }
}
