"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Source Code Logo"
            width={36}
            height={36}
            className="rounded-lg object-contain"
            style={{ width: "36px", height: "36px" }}
            priority
          />
          <span className="text-xl font-black tracking-tight text-foreground">
            <span className="text-[#04315B]">ĐỒ ÁN</span>{" "}
            <span className="text-[#FF6A00]">24h</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Thanh toán bảo mật
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
