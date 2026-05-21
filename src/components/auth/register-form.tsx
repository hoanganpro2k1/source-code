'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { useRegisterForm } from '@/hooks/use-register-form';

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
        className="flex flex-col items-center gap-6 text-center py-8"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-black text-foreground">Đăng ký thành công!</h2>
        <p className="text-muted-foreground text-sm">Đang chuyển hướng về trang đăng nhập…</p>
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </motion.div>
    );
  }

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      {/* Họ và tên */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <User />
          </InputGroupAddon>
          <InputGroupInput id="name" type="text" placeholder="Họ và tên" {...register('name')} />
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>{errors.name && <FieldError message={errors.name.message!} />}</AnimatePresence>
        </div>
      </div>

      {/* Số điện thoại */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Phone />
          </InputGroupAddon>
          <InputGroupInput
            id="phoneNumber"
            type="text"
            placeholder="Số điện thoại (tùy chọn)"
            {...register('phoneNumber')}
          />
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>
            {errors.phoneNumber && <FieldError message={errors.phoneNumber.message!} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput id="email" type="email" placeholder="Email" {...register('email')} />
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

      {/* Mật khẩu */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
            {...register('password')}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>{errors.password && <FieldError message={errors.password.message!} />}</AnimatePresence>
        </div>
      </div>

      {/* Xác nhận mật khẩu */}
      <div className="flex flex-col gap-1">
        <InputGroup className="h-12 rounded-xl bg-white/5">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            {...register('confirmPassword')}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="min-h-[18px]">
          <AnimatePresence>
            {errors.confirmPassword && <FieldError message={errors.confirmPassword.message!} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Điều khoản */}
      <div className="flex items-center gap-3 px-1 mt-2 mb-1">
        <Checkbox
          id="terms"
          checked={watch('terms')}
          onCheckedChange={(checked) => setValue('terms', Boolean(checked), { shouldValidate: true })}
          className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer select-none">
          Tôi đồng ý với{' '}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Điều khoản sử dụng
          </Link>{' '}
          —{' '}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Chính sách bảo mật
          </Link>
        </label>
      </div>
      <div className="min-h-[18px] -mt-2">
        <AnimatePresence>{errors.terms && <FieldError message={errors.terms.message!} />}</AnimatePresence>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-12 rounded-xl text-base font-bold bg-primary shadow-lg shadow-primary/20 transition-all disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Đang xử lý…
          </>
        ) : (
          <>
            Tạo tài khoản <ArrowRight className="h-5 w-5 ml-2" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Đã có tài khoản?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Đăng nhập ngay
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
