import { apiClient } from "@/lib/axios";
import axios from "axios";
import { LoginBodyType } from "@/schemas/auth.schema";

export const authService = {
  login: async (values: LoginBodyType) => {
    const res = await axios.post("/api/auth/login", values);
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
};
