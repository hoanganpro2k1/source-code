"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterForm } from "@/hooks/use-register-form";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    form: {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    },
    onSubmit,
    handleSendOTP,
    otpState: { otpSent, otpLoading, countdown },
    registerSuccess,
    isSubmitting,
  } = useRegisterForm();

  if (registerSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto p-12 rounded-[40px] border border-border bg-card shadow-2xl purple-glow flex flex-col items-center gap-6 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-black text-foreground">
          Đăng ký thành công!
        </h2>
        <p className="text-muted-foreground text-sm">
          Đang chuyển hướng về trang đăng nhập…
        </p>
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </motion.div>
    );
  }

  return (
    <div
      data-agent="SourceCode"
      className="w-full max-w-xl mx-auto p-8 lg:p-12 rounded-[40px] border border-border bg-card shadow-2xl purple-glow"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-3xl font-black text-foreground">
          Đăng ký tài khoản
        </h2>
        <p className="text-muted-foreground">
          Chào mừng bạn đến với{" "}
          <span className="text-primary font-bold">Source Code</span>
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Họ và tên */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">Họ và tên</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              {...register("name")}
              type="text"
              placeholder="Nhập họ và tên của bạn"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
          </div>
          <AnimatePresence>
            {errors.name && <FieldError message={errors.name.message!} />}
          </AnimatePresence>
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">
            Số điện thoại{" "}
            <span className="text-muted-foreground font-normal">
              (tùy chọn)
            </span>
          </label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              {...register("phoneNumber")}
              type="text"
              placeholder="Nhập số điện thoại"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
          </div>
          <AnimatePresence>
            {errors.phoneNumber && (
              <FieldError message={errors.phoneNumber.message!} />
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              {...register("email")}
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
          </div>
          <AnimatePresence>
            {errors.email && <FieldError message={errors.email.message!} />}
          </AnimatePresence>
        </div>

        {/* Mã OTP */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">
            Mã xác thực OTP
          </label>
          <div className="flex gap-3">
            {/* Input OTP */}
            <div className="relative group flex-1">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                {...register("code")}
                type="text"
                maxLength={6}
                placeholder="Nhập mã 6 chữ số"
                className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-4 text-sm tracking-[0.2em] font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
              />
            </div>

            {/* Nút gửi OTP */}
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={otpLoading || countdown > 0}
              className="h-14 px-4 rounded-2xl border border-primary/40 bg-primary/10 text-primary text-sm font-bold whitespace-nowrap hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[130px] justify-center"
            >
              {otpLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : countdown > 0 ? (
                <>
                  <KeyRound className="h-4 w-4" />
                  Gửi lại ({countdown}s)
                </>
              ) : otpSent ? (
                <>
                  <KeyRound className="h-4 w-4" />
                  Gửi lại
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  Gửi mã OTP
                </>
              )}
            </button>
          </div>

          {/* Ghi chú */}
          <AnimatePresence>
            {otpSent && !errors.code && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-primary/70 flex items-center gap-1"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Mã đã được gửi — kiểm tra hộp thư (kể cả spam)
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {errors.code && <FieldError message={errors.code.message!} />}
          </AnimatePresence>
        </div>

        {/* Mật khẩu */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">Mật khẩu</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <FieldError message={errors.password.message!} />
            )}
          </AnimatePresence>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-foreground">
            Xác nhận mật khẩu
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="w-full h-14 bg-muted border border-border rounded-2xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {errors.confirmPassword && (
              <FieldError message={errors.confirmPassword.message!} />
            )}
          </AnimatePresence>
        </div>

        {/* Điều khoản */}
        <div className="flex items-center gap-3 px-1">
          <Checkbox
            id="terms"
            checked={watch("terms")}
            onCheckedChange={(checked) =>
              setValue("terms", Boolean(checked), { shouldValidate: true })
            }
            className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label
            htmlFor="terms"
            className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none"
          >
            Tôi đồng ý với{" "}
            <Link href="#" className="text-primary font-bold hover:underline">
              Điều khoản sử dụng
            </Link>{" "}
            —{" "}
            <Link href="#" className="text-primary font-bold hover:underline">
              Chính sách bảo mật
            </Link>
          </label>
        </div>
        <AnimatePresence>
          {errors.terms && <FieldError message={errors.terms.message!} />}
        </AnimatePresence>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-14 rounded-2xl text-base font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Đang xử lý…
            </>
          ) : (
            <>
              Đăng ký <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>

        {/* Social Register */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground font-bold">
                hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              className="flex h-12 items-center justify-center rounded-2xl border border-border bg-background hover:bg-muted transition-all"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google"
              />
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center rounded-2xl border border-border bg-background hover:bg-muted transition-all"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                className="h-5 w-5"
                alt="Facebook"
              />
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center rounded-2xl border border-border bg-background hover:bg-muted transition-all"
            >
              <div className="h-5 w-5 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center font-black">
                Zalo
              </div>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

// Component hiển thị lỗi validation
const FieldError = ({ message }: { message: string }) => (
  <motion.p
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.2 }}
    className="text-xs text-red-400 flex items-center gap-1 px-1"
  >
    <span className="text-red-400">⚠</span> {message}
  </motion.p>
);
