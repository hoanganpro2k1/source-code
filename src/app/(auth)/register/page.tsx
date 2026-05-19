import { RegisterBenefits } from "@/components/sections/auth/RegisterBenefits";
import { RegisterForm } from "@/components/sections/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | Source Code",
  description:
    "Tạo tài khoản miễn phí trên SourceCode — nền tảng mua bán source code và đồ án tốt nghiệp uy tín nhất Việt Nam.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — benefits */}
            <RegisterBenefits />

            {/* Right — form */}
            <div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
