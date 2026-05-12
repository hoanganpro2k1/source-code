"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto p-8 lg:p-12 rounded-[40px] border border-border bg-card shadow-2xl purple-glow">
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-3xl font-black text-foreground">Đăng ký tài khoản</h2>
        <p className="text-muted-foreground">
          Chào mừng bạn đến với <span className="text-primary font-bold">Source Code</span>
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground">Họ và tên</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground">Tên đăng nhập</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground">Số điện thoại (tùy chọn)</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">Mật khẩu</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Tạo mật khẩu (ít nhất 8 ký tự)"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">Xác nhận mật khẩu</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 px-1">
          <Checkbox id="terms" className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
          <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
            Tôi đồng ý với <Link href="#" className="text-primary font-bold hover:underline">Điều khoản sử dụng</Link> — <Link href="#" className="text-primary font-bold hover:underline">Chính sách bảo mật</Link>
          </label>
        </div>

        <Button size="lg" className="h-14 rounded-2xl text-base font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Đăng ký <ArrowRight className="h-5 w-5 ml-2" />
        </Button>

        {/* Social Register */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground font-bold">hoặc đăng ký với</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="flex h-12 items-center justify-center rounded-2xl border border-border bg-background hover:bg-muted transition-all">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
            </button>
            <button className="flex h-12 items-center justify-center rounded-2xl border border-border bg-background hover:bg-muted transition-all">
               <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5" alt="Facebook" />
            </button>
            <button className="flex h-12 items-center justify-center rounded-2xl border border-border bg-background hover:bg-muted transition-all">
               <div className="h-5 w-5 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center font-black">Zalo</div>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Bằng cách đăng ký, bạn đồng ý nhận thông báo từ chúng tôi. <br />
          Thông tin của bạn được bảo mật tuyệt đối.
        </p>
      </form>
    </div>
  );
};
