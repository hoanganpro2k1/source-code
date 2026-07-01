'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { useForgotPasswordForm } from '@/hooks/use-forgot-password-form';

export const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    handleSendOTP,
    otpState: { otpSent, otpLoading, countdown },
    resetSuccess,
    isSubmitting,
  } = useForgotPasswordForm();

  // Màn hình thành công
  if (resetSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 text-center py-8"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-foreground">Đổi mật khẩu thành công!</h2>
          <p className="text-muted-foreground text-sm">Đang chuyển hướng về trang đăng nhập…</p>
        </div>
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </motion.div>
    );
  }

  return (
    <form className="flex flex-col gap-1" onSubmit={onSubmit}>
      {/* Email */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput id="email" type="email" placeholder="Email đã đăng ký" {...register('email')} />
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>{errors.email && <FieldError message={errors.email.message!} />}</AnimatePresence>
        </div>
      </div>

      {/* Mã OTP */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <InputGroup className="h-12 rounded-xl bg-white/5 flex-1">
            <InputGroupAddon>
              <ShieldCheck />
            </InputGroupAddon>
            <InputGroupInput
              id="code"
              type="text"
              maxLength={6}
              placeholder="Mã xác thực OTP"
              className="tracking-wide font-mono"
              {...register('code')}
            />
          </InputGroup>
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={otpLoading || countdown > 0}
            className="h-12 px-4 rounded-xl border border-primary/40 bg-primary/10 text-primary text-sm font-semibold whitespace-nowrap hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[120px] justify-center"
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
                Gửi OTP
              </>
            )}
          </button>
        </div>
        <div className="min-h-[18px]">
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
          <AnimatePresence>{errors.code && <FieldError message={errors.code.message!} />}</AnimatePresence>
        </div>
      </div>

      {/* Mật khẩu mới */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
            {...register('newPassword')}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-md" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>
            {errors.newPassword && <FieldError message={errors.newPassword.message!} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Xác nhận mật khẩu mới */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="confirmNewPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu mới"
            {...register('confirmNewPassword')}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-md" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>
            {errors.confirmNewPassword && <FieldError message={errors.confirmNewPassword.message!} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-12 rounded-xl text-base font-bold bg-primary shadow-lg shadow-primary/20 transition-all disabled:opacity-70 mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Đang xử lý…
          </>
        ) : (
          'Đặt lại mật khẩu'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-3 flex items-center justify-center gap-1">
        <ArrowLeft className="h-3.5 w-3.5" />
        Quay lại{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
};

// Component hiển thị lỗi validation
const FieldError = ({ message }: { message: string }) => (
  <motion.p
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.2 }}
    className="text-xs text-red-500 flex items-center gap-1 px-1"
  >
    {message}
  </motion.p>
);
