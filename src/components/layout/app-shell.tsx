import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppHeader } from './app-header';
import { AppSidebar, type NavGroup } from './app-sidebar';
import { ChatWidget } from './chat-widget';

interface AppShellProps {
  logo: React.ReactNode;
  navGroups: NavGroup[];
  sidebarFooter?: React.ReactNode;
  sidebarBottomFooter?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({
  logo,
  navGroups,
  sidebarFooter,
  sidebarBottomFooter,
  headerLeft,
  headerRight,
  children,
}: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar logo={logo} navGroups={navGroups} footer={sidebarFooter} bottomFooter={sidebarBottomFooter} />
      <SidebarInset>
        <AppHeader left={headerLeft} right={headerRight} />
        <div className="mx-auto w-full max-w-7xl px-6">{children}</div>
      </SidebarInset>
      <ChatWidget />
    </SidebarProvider>
  );
}
export type { NavGroup };
