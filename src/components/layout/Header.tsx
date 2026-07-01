'use client';

import { Bell, LogOut, Package, Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLogout } from '@/hooks/use-logout';
import { decodeJwt } from '@/lib/jwt';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';

// Shape của JWT payload từ backend
interface JwtPayload {
  userId: string | number;
  email?: string;
  name?: string;
  roleName?: string;
}

export function Header({ initialAccessToken }: { initialAccessToken?: string }) {
  const pathname = usePathname();
  const { accessToken: storeToken, user: storeUser } = useAuthStore();
  const { logout: handleLogout, isLoggingOut } = useLogout();

  // Ưu tiên dùng storeToken nếu đã có (sau khi login), còn không dùng initialAccessToken từ server
  const accessToken = storeToken || initialAccessToken;

  // Decode user info từ token nếu store chưa có user
  const user =
    storeUser ||
    (() => {
      if (!initialAccessToken) return null;
      const decoded = decodeJwt<JwtPayload>(initialAccessToken);
      if (!decoded) return null;
      return {
        id: String(decoded.userId),
        username: decoded.email ?? '',
        name: decoded.name,
        role: decoded.roleName,
        avatar: undefined as string | undefined,
      };
    })();

  // Trích xuất ký tự đầu tiên của tên để hiển thị Avatar mặc định
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.trim().charAt(0).toUpperCase();
  };

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/source' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-16">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Source Code Logo"
              width={36}
              height={36}
              className="rounded-lg object-contain"
              style={{ width: '36px', height: '36px' }}
              priority
            />
            <span className="text-xl font-black tracking-tight text-foreground">
              <span className="text-[#04315B]">ĐỒ ÁN</span> <span className="text-[#FF6A00]">24h</span>
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
                    'text-sm font-medium transition-all duration-300 relative py-1',
                    isActive
                      ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full'
                      : 'text-foreground/70 hover:text-foreground',
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

          <ThemeToggle />

          {accessToken && user ? (
            <>
              {/* Nút thông báo */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full border border-border bg-background hover:bg-muted overflow-visible"
              >
                <Bell className="h-5 w-5 text-foreground/70" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg shadow-red-500/30">
                  3
                </span>
              </Button>

              {/* Giỏ hàng */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative h-10 w-10 rounded-full border border-border bg-background hover:border-primary hover:bg-primary/5 group"
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-foreground/70 group-hover:text-primary" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/20">
                    2
                  </span>
                </Link>
              </Button>

              {/* Khối Avatar & Dropdown sử dụng Shadcn UI */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full p-0 hover:scale-105 active:scale-95 transition-all duration-300 hover:ring-2 hover:ring-primary/30"
                  >
                    <Avatar className="h-10 w-10 border border-border">
                      {user.avatar && <AvatarImage src={user.avatar} alt="Avatar" />}
                      <AvatarFallback
                        className="font-bold text-base"
                        style={{ backgroundColor: '#7C4DFF', color: '#fff' }}
                      >
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[280px] rounded-[24px] border border-border bg-card/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl z-[100]"
                  data-agent="Đồ Án 24h"
                >
                  {/* User Info Header */}
                  <div className="flex flex-col px-3 py-2 pb-3 border-b border-border">
                    <span className="text-[15px] font-bold text-foreground leading-tight">
                      {user.name || 'Người dùng'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate mt-1">
                      {user.username || 'user@example.com'}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-1 mt-3">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-[14px] text-sm font-medium text-foreground/80 hover:bg-muted dark:hover:bg-white/5 hover:text-foreground transition-all duration-200 cursor-pointer"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Hồ sơ</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/download-history"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-[14px] text-sm font-medium text-foreground/80 hover:bg-muted dark:hover:bg-white/5 hover:text-foreground transition-all duration-200 cursor-pointer"
                      >
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>Lịch sử tải code</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  {/* Divider & Logout */}
                  <DropdownMenuSeparator className="my-2 bg-border" />
                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full justify-start gap-3 px-3 py-2.5 h-auto rounded-[14px] text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200 disabled:opacity-60"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="hidden sm:inline-flex border border-input text-foreground/70 hover:text-foreground"
              >
                <Link href="/register">Đăng ký</Link>
              </Button>
              <Button
                asChild
                className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white rounded-[14px] px-5"
              >
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative h-10 w-10 rounded-full border border-border bg-background hover:border-primary hover:bg-primary/5 group"
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-foreground/70 group-hover:text-primary" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/20">
                    3
                  </span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
