import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api-error";
import { RegisterBodyType, RegisterSchema, SendOTPBodyType } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useOtpCountdown } from "./use-otp-countdown";

export const useRegisterForm = () => {
  const router = useRouter();
  const { countdown, startCountdown } = useOtpCountdown();

  const [otpSent, setOtpSent] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

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

  const registerMutation = useMutation({
    mutationFn: (data: Omit<RegisterBodyType, "terms">) => authService.register(data),
    onSuccess: () => {
      setRegisterSuccess(true);
      toast.success("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 1500);
    },
    onError: (err) => {
      toast.error(parseApiError(err, "Đăng ký thất bại. Vui lòng thử lại."));
    },
  });

  const handleSendOTP = () => {
    const email = form.getValues("email");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Vui lòng nhập email hợp lệ trước khi gửi mã OTP");
      return;
    }

    sendOtpMutation.mutate({ email, type: "REGISTER" });
  };

  const onSubmit = (data: RegisterBodyType) => {
    const { terms, ...payload } = data;
    if (!payload.phoneNumber) {
      delete (payload as any).phoneNumber;
    }
    registerMutation.mutate(payload);
  };

  return {
    form,
    onSubmit,
    handleSendOTP,
    otpState: {
      otpSent,
      otpLoading: sendOtpMutation.isPending,
      countdown,
    },
    registerSuccess,
    isSubmitting: registerMutation.isPending,
  };
};
