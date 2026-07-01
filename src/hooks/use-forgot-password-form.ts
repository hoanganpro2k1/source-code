import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api-error";
import {
  ForgotPasswordBodyType,
  ForgotPasswordSchema,
  SendOTPBodyType,
} from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useOtpCountdown } from "./use-otp-countdown";

export const useForgotPasswordForm = () => {
  const router = useRouter();
  const { countdown, startCountdown } = useOtpCountdown();

  const [otpSent, setOtpSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Gửi OTP với type FORGOT_PASSWORD
  const sendOtpMutation = useMutation({
    mutationFn: (data: SendOTPBodyType) => authService.sendOTP(data),
    onSuccess: () => {
      setOtpSent(true);
      startCountdown();
      toast.success("Mã OTP đã được gửi đến email của bạn!");
    },
    onError: (err) => {
      toast.error(parseApiError(err, "Gửi mã OTP thất bại. Thử lại sau."));
    },
  });

  // Đổi mật khẩu
  const resetMutation = useMutation({
    mutationFn: (data: ForgotPasswordBodyType) => authService.forgotPassword(data),
    onSuccess: () => {
      setResetSuccess(true);
      toast.success("Đổi mật khẩu thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 1800);
    },
    onError: (err) => {
      toast.error(parseApiError(err, "Đổi mật khẩu thất bại. Vui lòng thử lại."));
    },
  });

  const handleSendOTP = () => {
    const email = form.getValues("email");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Vui lòng nhập email hợp lệ trước khi gửi mã OTP");
      return;
    }

    sendOtpMutation.mutate({ email, type: "FORGOT_PASSWORD" });
  };

  const onSubmit = (data: ForgotPasswordBodyType) => {
    resetMutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleSendOTP,
    otpState: {
      otpSent,
      otpLoading: sendOtpMutation.isPending,
      countdown,
    },
    resetSuccess,
    isSubmitting: resetMutation.isPending,
  };
};
