import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';
import { RegisterForm } from '@/components/auth/register-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký tài khoản | Đồ Án 24h',
  description:
    'Tạo tài khoản miễn phí trên Đồ Án 24h — nền tảng mua bán source code và đồ án tốt nghiệp uy tín nhất Việt Nam.',
};

export default function RegisterPage() {
  return (
    <AuthFormWrapper title="Đăng ký" subtitle="Tạo tài khoản miễn phí trên Đồ Án 24h">
      <RegisterForm />
    </AuthFormWrapper>
  );
}
