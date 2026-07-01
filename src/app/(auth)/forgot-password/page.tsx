import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quên mật khẩu | Đồ Án 24h - Premium Marketplace',
  description: 'Đặt lại mật khẩu tài khoản Đồ Án 24h nhanh chóng và bảo mật qua email xác thực OTP.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthFormWrapper
      title="Quên mật khẩu"
      subtitle="Nhập email để nhận mã OTP và đặt lại mật khẩu"
    >
      <ForgotPasswordForm />
    </AuthFormWrapper>
  );
}
