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
  CommandIcon,
  ChevronLeft,
  Bell,
  User,
  LogOut,
  HelpCircle,
  ExternalLink,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

import { AppShell, type NavGroup } from '@/components/layout/app-shell';
import { SwitcherPopover } from '@/components/switcher-popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarSeparator, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
      <CommandIcon className="size-6 shrink-0 text-primary fill-primary/10" />
      {!isCollapsed && <span className="truncate font-semibold text-foreground">CodeDoan Inc</span>}
    </div>
  );
}

const USER_EMAIL = 'admin@doan24h.vn';

const AccountPopoverContent = () => (
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
      <Button variant="ghost" size="item" className="text-destructive hover:text-destructive">
        <LogOut className="size-4" />
        <span>Đăng xuất</span>
      </Button>
    </div>
  </div>
);

function SidebarBottomFooter() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <>
      <div className="p-2">
        <SwitcherPopover
          title="Tài khoản"
          side={isCollapsed ? 'right' : 'top'}
          align="start"
          trigger={
            <div className={cn('flex w-full items-center gap-2', isCollapsed && 'justify-center')}>
              <Avatar size="sm">
                <AvatarFallback>{USER_EMAIL.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {!isCollapsed && <span className="truncate text-sm font-medium">{USER_EMAIL}</span>}
            </div>
          }
          className={cn(
            'border-none bg-transparent shadow-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
            isCollapsed ? 'size-9 justify-center p-0' : 'h-11 w-full justify-start px-2',
          )}
          contentClassName="w-64"
        >
          <AccountPopoverContent />
        </SwitcherPopover>
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
