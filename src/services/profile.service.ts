import { apiClient } from "@/lib/axios";
import type { Profile } from "@/types/profile";

export const profileService = {
  getProfile: async () => {
    const res = await apiClient.get<Profile>("/profile");
    return res.data;
  },
};
