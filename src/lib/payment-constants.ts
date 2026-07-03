// Tài khoản ngân hàng nhận thanh toán qua cổng SePay
export const BANK_INFO = {
  bankName: "Vietinbank",
  accountName: "BUI HOANG AN",
  accountNumber: "100876668851",
};

// Phải khớp với PREFIX_PAYMENT_CODE ở Backend (src/shared/constants/other.constant.ts)
// để webhook SePay nhận diện đúng paymentId từ nội dung chuyển khoản.
export const PAYMENT_CODE_PREFIX = "DOAN";
