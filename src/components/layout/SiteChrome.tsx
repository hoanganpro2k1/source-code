"use client";

import { CheckoutHeader } from "@/components/layout/CheckoutHeader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { usePathname } from "next/navigation";

export function SiteChrome({
  children,
  initialAccessToken,
}: {
  children: React.ReactNode;
  initialAccessToken?: string;
}) {
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith("/checkout");

  if (isCheckout) {
    return (
      <>
        <CheckoutHeader />
        <main className="flex-1">{children}</main>
      </>
    );
  }

  return (
    <>
      <Header initialAccessToken={initialAccessToken} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
