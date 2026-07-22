import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';
import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập quản trị | Đồ Án 24h',
  description: 'Đăng nhập vào khu vực quản trị Đồ Án 24h.',
};

export default function AdminLoginPage() {
  return (
    <AuthFormWrapper title="Đăng nhập quản trị" subtitle="Khu vực dành riêng cho quản trị viên Đồ Án 24h">
      <LoginForm loginContext="admin" />
    </AuthFormWrapper>
  );
}
