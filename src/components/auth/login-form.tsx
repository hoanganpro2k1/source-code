'use client';

import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/ui/icons';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLoginForm } from '@/hooks/use-login-form';

interface LoginFormProps {
  loginContext?: "client" | "admin";
}

export const LoginForm = ({ loginContext = "client" }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { form, isLoading, onSubmit, handleGoogleLogin, isGoogleLoading } = useLoginForm(loginContext);

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={onSubmit} className="space-y-1">
        {/* Email */}
        <InputGroup className="h-12 rounded-sm bg-white/5">
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput id="email" type="email" placeholder="Email" {...register('email')} />
        </InputGroup>
        <div className="min-h-[18px]">
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Mật khẩu */}
        <InputGroup className="h-12 rounded-sm bg-white/5">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu"
            {...register('password')}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-md" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="min-h-[18px]">
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex justify-between items-center">
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Quên mật khẩu?
          </Link>

          {/* Ghi nhớ */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="remember"
              className="rounded-sm border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal cursor-pointer">
              Ghi nhớ đăng nhập
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-4 h-12 text-base font-bold transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Đang xử lý...
            </div>
          ) : (
            'Đăng nhập'
          )}
        </Button>
      </form>

      <div className="relative my-3">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 font-semibold text-muted-foreground">Hoặc đăng nhập với</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="h-12 gap-2 text-foreground/80 hover:bg-foreground/5 relative overflow-hidden border border-input hover:border-input"
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        ) : (
          <GoogleIcon width={20} height={20} style={{ display: 'block' }} />
        )}
        <span className="text-base">Google</span>
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-1">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};
