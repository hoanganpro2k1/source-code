"use client";

import { useGoogleCallback } from "@/hooks/use-google-callback";

const GoogleOAuthCallbackPage = () => {
  useGoogleCallback();
  return null;
};

export default GoogleOAuthCallbackPage;