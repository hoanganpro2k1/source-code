"use client";

import { profileService } from "@/services/profile.service";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const PROFILE_QUERY_KEY = ["profile"];

export const useProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profileService.getProfile(),
    enabled: !!accessToken,
  });
};
