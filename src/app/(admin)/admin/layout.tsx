'use client';

import * as React from 'react';
import {
  LayoutDashboardIcon,
  Code2Icon,
  LayersIcon,
  ReceiptTextIcon,
  CreditCardIcon,
  UsersIcon,
  MessageSquareIcon,
  MessageCircleIcon,
  Settings2Icon,
  ChevronLeft,
  Bell,
  User,
  LogOut,
  HelpCircle,
  ExternalLink,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

import { AppShell, type NavGroup } from '@/components/layout/app-shell';
import { SwitcherPopover } from '@/components/switcher-popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SidebarSeparator, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLogout } from '@/hooks/use-logout';
import { useProfile } from '@/hooks/use-profile';
import { cn } from '@/lib/utils';

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboardIcon, exact: true },
    ],
  },
  {
    label: 'Cửa hàng',
    items: [
      { label: 'Quản lý Đồ án', href: '/admin/products', icon: Code2Icon },
      { label: 'Quản lý Danh mục', href: '/admin/categories', icon: LayersIcon },
      { label: 'Quản lý Đơn hàng', href: '/admin/orders', icon: ReceiptTextIcon },
      { label: 'Giao dịch thanh toán', href: '/admin/transactions', icon: CreditCardIcon },
    ],
  },
  {
    label: 'Khách hàng',
    items: [
      { label: 'Quản lý Thành viên', href: '/admin/users', icon: UsersIcon },
      { label: 'Đánh giá & Phản hồi', href: '/admin/reviews', icon: MessageSquareIcon },
      { label: 'Hỗ trợ trực tuyến', href: '/admin/messages', icon: MessageCircleIcon },
    ],
  },
  {
    label: 'Hệ thống',
    items: [
      { label: 'Cấu hình hệ thống', href: '/admin/settings', icon: Settings2Icon },
    ],
  },
];

function Logo() {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === 'collapsed' && !isMobile;

  return (
    <div className={cn('flex items-center gap-2 overflow-hidden', isCollapsed && 'justify-center')}>
      <Image
        src="/logo.jpg"
        alt="Đồ Án 24h Logo"
        width={28}
        height={28}
        className="shrink-0 rounded-sm object-contain"
        style={{ width: '28px', height: '28px' }}
        priority
      />
      {!isCollapsed && (
        <span className="truncate text-lg font-black tracking-tight">
          <span className="text-[#04315B] dark:text-white">ĐỒ ÁN</span> <span className="text-[#FF6A00]">24h</span>
        </span>
      )}
    </div>
  );
}

const AccountPopoverContent = ({
  onLogout,
  isLoggingOut,
}: {
  onLogout: () => void;
  isLoggingOut: boolean;
}) => (
  <div className="space-y-1.5 p-1.5">
    <div className="flex flex-col gap-0.5">
      <Button variant="ghost" size="item" asChild>
        <a href="https://doan24h.vn" target="_blank" rel="noreferrer">
          <ExternalLink className="size-4 text-muted-foreground" />
          <span>Website chính</span>
        </a>
      </Button>
      <Button variant="ghost" size="item" asChild>
        <a href="https://doan24h.vn/docs" target="_blank" rel="noreferrer">
          <HelpCircle className="size-4 text-muted-foreground" />
          <span>Tài liệu hướng dẫn</span>
        </a>
      </Button>
    </div>

    <div className="mx-1 h-px bg-border" />

    <div className="flex flex-col gap-0.5">
      <Button variant="ghost" size="item" asChild>
        <a href="/admin/settings">
          <User className="size-4 text-muted-foreground" />
          <span>Cài đặt tài khoản</span>
        </a>
      </Button>
    </div>

    <div className="mx-1 h-px bg-border" />

    <div className="flex flex-col gap-0.5">
      <Button variant="ghost" size="item" asChild>
        <a href="/admin/settings/security">
          <KeyRound className="size-4 text-muted-foreground" />
          <span>Bảo mật & Mật khẩu</span>
        </a>
      </Button>
      <Button variant="ghost" size="item" asChild>
        <a href="/admin/settings">
          <ShieldCheck className="size-4 text-muted-foreground" />
          <span>Cài đặt hệ thống</span>
        </a>
      </Button>
    </div>

    <div className="mx-1 h-px bg-border" />

    <div className="flex flex-col gap-0.5">
      <Button
        variant="ghost"
        size="item"
        className="text-destructive hover:text-destructive"
        onClick={onLogout}
        disabled={isLoggingOut}
      >
        <LogOut className="size-4" />
        <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
      </Button>
    </div>
  </div>
);

function SidebarBottomFooter() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const { data: profile, isLoading } = useProfile();
  const { logout, isLoggingOut } = useLogout('/admin/login');

  const displayName = profile?.name || profile?.email || 'Người dùng';
  const initials = (profile?.name || profile?.email || '??').slice(0, 2).toUpperCase();

  return (
    <>
      <div className="p-2">
        {isLoading ? (
          <div className={cn('flex w-full items-center gap-2 px-2 py-2', isCollapsed && 'justify-center')}>
            <Skeleton className="size-8 shrink-0 rounded-full" />
            {!isCollapsed && <Skeleton className="h-4 w-24" />}
          </div>
        ) : (
          <SwitcherPopover
            title="Tài khoản"
            side={isCollapsed ? 'right' : 'top'}
            align="start"
            trigger={
              <div className={cn('flex w-full items-center gap-2', isCollapsed && 'justify-center')}>
                <Avatar size="sm">
                  {profile?.avatar && <AvatarImage src={profile.avatar} alt={displayName} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {!isCollapsed && <span className="truncate text-sm font-medium">{displayName}</span>}
              </div>
            }
            className={cn(
              'border-none bg-transparent shadow-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
              isCollapsed ? 'size-9 justify-center p-0' : 'h-11 w-full justify-start px-2',
            )}
            contentClassName="w-64"
          >
            <AccountPopoverContent onLogout={logout} isLoggingOut={isLoggingOut} />
          </SwitcherPopover>
        )}
      </div>
      <SidebarSeparator className="my-0" />
      <div className="p-2">
        <Button
          variant="ghost"
          size={isCollapsed ? 'icon-sm' : 'sm'}
          className={cn(
            'gap-2 bg-overlay-muted text-foreground',
            isCollapsed ? 'justify-center' : 'h-10 w-full justify-start',
          )}
          onClick={toggleSidebar}
        >
          <ChevronLeft className={cn('size-4', isCollapsed && 'rotate-180')} />
          {!isCollapsed && 'Collapse'}
        </Button>
      </div>
    </>
  );
}

const HeaderRight = (
  <>
    <SwitcherPopover
      title="Thông báo"
      side="bottom"
      align="end"
      trigger={
        <>
          <Bell className="size-4" />
          <span className="sr-only">Notifications</span>
        </>
      }
      className="size-9 justify-center p-0"
      contentClassName="w-80"
    >
      <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
        <Bell className="size-8 text-muted-foreground/50" />
        <span className="text-sm font-medium text-muted-foreground">Không có thông báo mới</span>
      </div>
    </SwitcherPopover>
    <ThemeToggle />
  </>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="light bg-background text-foreground min-h-screen" style={{ colorScheme: 'light' }}>
      <AppShell
        logo={<Logo />}
        navGroups={NAV_GROUPS}
        sidebarBottomFooter={<SidebarBottomFooter />}
        headerRight={HeaderRight}
      >
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </AppShell>
    </div>
  );
}
