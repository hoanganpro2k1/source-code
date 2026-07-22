// Map các mã lỗi "Error.Xxx" (key i18n từ backend, chưa có bản dịch) sang
// tiếng Việt dễ hiểu cho người dùng cuối. Chỉ cần thêm dần khi gặp lỗi mới.
const ERROR_CODE_MESSAGES: Record<string, string> = {
  "Error.NotAdminAccount":
    "Tài khoản này không có quyền quản trị. Vui lòng đăng nhập tại trang dành cho khách hàng.",
  "Error.AdminMustUseAdminLogin":
    "Tài khoản quản trị viên vui lòng đăng nhập tại trang quản trị.",
};

/**
 * Chuẩn hóa error message từ NestJS API về string.
 * NestJS có thể trả: string | string[] | { message: string; path: string[] }[]
 */
export const parseApiError = (err: unknown, fallback: string): string => {
  const msg = (err as any)?.response?.data?.message;

  if (!msg) return fallback;
  if (typeof msg === "string") return ERROR_CODE_MESSAGES[msg] ?? msg;

  if (Array.isArray(msg)) {
    const first = msg[0];
    const rawMessage = typeof first === "string" ? first : first?.message;
    if (!rawMessage) return fallback;
    return ERROR_CODE_MESSAGES[rawMessage] ?? rawMessage;
  }

  return fallback;
};
