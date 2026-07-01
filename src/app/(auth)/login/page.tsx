import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';
import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập | Đồ Án 24h - Premium Marketplace',
  description: 'Đăng nhập vào tài khoản Đồ Án 24h để khám phá thế giới mã nguồn chất lượng cao.',
};

export default function LoginPage() {
  return (
    <AuthFormWrapper title="Đăng nhập" subtitle="Chào mừng bạn quay trở lại với Đồ Án 24h">
      <LoginForm />
    </AuthFormWrapper>
  );
}
