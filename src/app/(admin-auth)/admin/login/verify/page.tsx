import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';
import { VerifyForm } from '@/components/auth/verify-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xác thực 2 bước | Đồ Án 24h',
  description: 'Xác thực danh tính bằng mã TOTP hoặc OTP email để đăng nhập vào khu vực quản trị.',
  robots: { index: false, follow: false }, // Không index trang này
};

export default function AdminLoginVerifyPage() {
  return (
    <AuthFormWrapper
      title="Xác thực 2 bước"
      subtitle="Tài khoản quản trị của bạn được bảo vệ bằng xác thực 2 yếu tố"
    >
      <VerifyForm />
    </AuthFormWrapper>
  );
}
