"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Source Code", href: "/source" },
    { name: "Danh mục", href: "#" },
    { name: "Blog", href: "/blog" },
    { name: "Dịch vụ", href: "#" },
    { name: "Hỗ trợ", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-white">SC</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Source Code
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative py-1",
                    isActive
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden w-[240px] xl:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Tìm kiếm source code..."
              className="h-10 w-full rounded-full border border-border bg-muted pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 hover:border-white/20 hover:bg-muted/80 focus:border-primary focus:bg-muted/80 focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <Link href="/login">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-foreground/70 hover:text-foreground"
            >
              Đăng nhập
            </Button>
          </Link>
          <Button>Liên hệ</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
