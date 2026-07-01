/**
 * Chuẩn hóa error message từ NestJS API về string.
 * NestJS có thể trả: string | string[] | { message: string; path: string[] }[]
 */
export const parseApiError = (err: unknown, fallback: string): string => {
  const msg = (err as any)?.response?.data?.message;

  if (!msg) return fallback;
  if (typeof msg === "string") return msg;

  if (Array.isArray(msg)) {
    const first = msg[0];
    return typeof first === "string" ? first : (first?.message ?? fallback);
  }

  return fallback;
};
