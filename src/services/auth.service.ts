import { apiClient } from "@/lib/axios";
import axios from "axios";
import {
  LoginBodyType,
  RegisterBodyType,
  SendOTPBodyType,
} from "@/schemas/auth.schema";

export const authService = {
  login: async (values: LoginBodyType) => {
    const res = await axios.post("/api/auth/login", values);
    return res.data;
  },

  sendOTP: async (values: SendOTPBodyType) => {
    const res = await apiClient.post("/auth/otp", values);
    return res.data;
  },

  register: async (values: Omit<RegisterBodyType, "terms">) => {
    const res = await apiClient.post("/auth/register", values);
    return res.data;
  },

  setup: async (values: any) => {
    const res = await apiClient.post("/auth/setup", values);
    return res.data;
  },

  logout: async () => {
    const res = await axios.post("/api/auth/logout");
    return res.data;
  },

  getGoogleLink: async () => {
    const res = await apiClient.get<{ url: string }>("/auth/google-link");
    return res.data;
  },

  googleLoginCallback: async (accessToken: string, refreshToken: string) => {
    const res = await axios.post("/api/auth/google", { accessToken, refreshToken });
    return res.data;
  },
};

