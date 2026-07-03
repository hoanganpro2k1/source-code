// Tài khoản ngân hàng nhận thanh toán qua cổng SePay
export const BANK_INFO = {
  bankName: "Vietinbank",
  accountName: "BUI HOANG AN",
  accountNumber: "100876668851",
};

// Phải khớp với PREFIX_PAYMENT_CODE ở Backend (src/shared/constants/other.constant.ts)
// để webhook SePay nhận diện đúng paymentId từ nội dung chuyển khoản.
export const PAYMENT_CODE_PREFIX = "DOAN";

// VietinBank chỉ báo biến động số dư cho SePay khi nội dung chuyển khoản
// bắt đầu bằng từ khóa này (yêu cầu bắt buộc từ SePay), nếu thiếu thì
// webhook sẽ không được gửi về BE dù giao dịch thành công.
export const SEVQR_KEYWORD = "SEVQR";

export function buildPaymentContent(paymentId: string | number) {
  return `${SEVQR_KEYWORD} ${PAYMENT_CODE_PREFIX}${paymentId}`;
}
