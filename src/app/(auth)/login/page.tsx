import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | SourceCode - Premium Marketplace",
  description:
    "Đăng nhập vào tài khoản SourceCode để khám phá thế giới mã nguồn chất lượng cao.",
};

export default function LoginPage() {
  return (
    <AuthFormWrapper
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay trở lại với SourceCode"
    >
      <LoginForm />
    </AuthFormWrapper>
  );
}
