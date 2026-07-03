'use client';

import { useVerifyForm, type TwoFactorType } from '@/hooks/use-verify-form';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, RefreshCw, Smartphone } from 'lucide-react';
import { useRef, useState, useCallback, KeyboardEvent, ClipboardEvent } from 'react';
import { Button } from '@/components/ui/button';

const OTP_LENGTH = 6;

// Component 6 ô OTP riêng biệt
function OtpInput({
  onComplete,
  isLoading,
}: {
  onComplete: (code: string) => void;
  isLoading: boolean;
}) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusNext = (index: number) => {
    if (index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const focusPrev = (index: number) => {
    if (index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Chỉ chấp nhận số
      const digit = value.replace(/\D/g, '').slice(-1);
      const newDigits = [...digits];
      newDigits[index] = digit;
      setDigits(newDigits);

      if (digit) {
        focusNext(index);
        // Auto-submit khi đủ 6 ký tự
        if (newDigits.every((d) => d !== '') && newDigits.join('').length === OTP_LENGTH) {
          onComplete(newDigits.join(''));
        }
      }
    },
    [digits, onComplete],
  );

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else {
        focusPrev(index);
      }
    } else if (e.key === 'ArrowLeft') {
      focusPrev(index);
    } else if (e.key === 'ArrowRight') {
      focusNext(index);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newDigits = [...digits];
    pasted.split('').forEach((char, i) => {
      if (i < OTP_LENGTH) newDigits[i] = char;
    });
    setDigits(newDigits);

    // Focus ô cuối hoặc ô tiếp theo sau paste
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();

    // Auto-submit nếu dán đủ 6 số
    if (pasted.length === OTP_LENGTH) {
      onComplete(newDigits.join(''));
    }
  };

  return (
    <div className="flex gap-2 justify-center" role="group" aria-label="Nhập mã xác thực 6 chữ số">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={isLoading}
          autoFocus={index === 0}
          aria-label={`Chữ số thứ ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            'w-11 h-14 rounded-sm border text-center text-xl font-bold transition-all duration-200',
            'bg-white/5 text-foreground outline-none',
            'border-border focus:border-primary focus:ring-2 focus:ring-primary/30',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            digit && 'border-primary/60 bg-primary/10',
          )}
        />
      ))}
    </div>
  );
}

// Tab switcher TOTP vs OTP
function TwoFactorTypeTabs({
  value,
  onChange,
}: {
  value: TwoFactorType;
  onChange: (v: TwoFactorType) => void;
}) {
  return (
    <div className="flex rounded-sm bg-white/5 border border-white/10 p-1">
      {(
        [
          { id: 'totp' as TwoFactorType, icon: Smartphone, label: 'Ứng dụng xác thực' },
          { id: 'otp' as TwoFactorType, icon: Mail, label: 'Email OTP' },
        ] as const
      ).map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-xs font-medium transition-all duration-200',
            value === id
              ? 'bg-primary text-white shadow-sm shadow-primary/30'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-3.5 shrink-0" />
          {label}
        </button>
      ))}
    </div>
  );
}

export const VerifyForm = () => {
  const {
    maskedEmail,
    twoFactorType,
    setTwoFactorType,
    resendCountdown,
    isResending,
    isVerifying,
    submitCode,
    handleBack,
    handleResendOTP,
    isReady,
  } = useVerifyForm();

  // Key để reset OTP input sau mỗi lần submit lỗi
  const [resetKey, setResetKey] = useState(0);

  const handleComplete = (code: string) => {
    submitCode(code);
    // Reset input sau submit (hook sẽ xử lý lỗi)
    setResetKey((k) => k + 1);
  };

  if (!isReady) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Email đã che */}
      {maskedEmail && (
        <p className="text-center text-sm text-muted-foreground">
          Đăng nhập với{' '}
          <span className="font-semibold text-foreground">{maskedEmail}</span>
        </p>
      )}

      {/* Tab chọn loại 2FA */}
      <TwoFactorTypeTabs value={twoFactorType} onChange={setTwoFactorType} />

      {/* Mô tả hướng dẫn theo tab */}
      <AnimatePresence mode="wait">
        <motion.p
          key={twoFactorType}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-center text-sm text-muted-foreground"
        >
          {twoFactorType === 'totp'
            ? 'Mở ứng dụng xác thực (Google Authenticator, Authy, v.v.) và nhập mã 6 chữ số.'
            : 'Nhập mã OTP đã được gửi đến email của bạn.'}
        </motion.p>
      </AnimatePresence>

      {/* 6-ô OTP */}
      <div className="flex flex-col items-center gap-4">
        <OtpInput
          key={`${twoFactorType}-${resetKey}`} // key đổi → React remount → state tự reset
          onComplete={handleComplete}
          isLoading={isVerifying}
        />

        {/* Loading indicator */}
        <AnimatePresence>
          {isVerifying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-primary"
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              Đang xác thực...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nút Gửi lại OTP (chỉ hiện với tab email) */}
      <AnimatePresence>
        {twoFactorType === 'otp' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={resendCountdown > 0 || isResending}
                onClick={handleResendOTP}
                className="text-sm text-muted-foreground hover:text-primary gap-2"
              >
                <RefreshCw className={cn('size-3.5', isResending && 'animate-spin')} />
                {resendCountdown > 0
                  ? `Gửi lại sau ${resendCountdown}s`
                  : isResending
                    ? 'Đang gửi...'
                    : 'Gửi lại mã OTP'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút quay lại */}
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Quay lại đăng nhập
      </button>
    </div>
  );
};
