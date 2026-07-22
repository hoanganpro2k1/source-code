'use client';

import { Fragment } from 'react';
import { ChevronRight, ChevronDown, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
  exact?: boolean;
  children?: NavItem[];
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

interface AppSidebarProps {
  logo: React.ReactNode;
  navGroups: NavGroup[];
  footer?: React.ReactNode;
  bottomFooter?: React.ReactNode;
}

export function AppSidebar({ logo, navGroups, footer, bottomFooter }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-4 group-data-[collapsible=icon]:px-2">
        {logo}
      </SidebarHeader>

      <SidebarContent className="group-data-[state=collapsed]:gap-0 gap-0">
        {navGroups.map((group, i) => (
          <SidebarGroup key={i} className="group-data-[state=collapsed]:px-2 group-data-[state=collapsed]:py-0.5">
            {group.label && (
              <SidebarGroupLabel className="group-data-[state=collapsed]:hidden">{group.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

                  if (item.children) {
                    const isChildActive = item.children.some((child) => pathname.startsWith(child.href));
                    return (
                      <Collapsible
                        key={item.href}
                        defaultOpen={isActive || isChildActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              isActive={isActive && !isChildActive}
                              tooltip={item.label}
                              className={cn(
                                'w-full flex items-center justify-between pr-2 cursor-pointer',
                                isChildActive &&
                                  'text-primary hover:text-primary hover:bg-transparent font-medium [&_svg]:text-primary',
                              )}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon && <item.icon />}
                                <span>{item.label}</span>
                              </span>
                              <ChevronDown
                                className={cn(
                                  'size-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 text-muted-foreground',
                                  (isActive || isChildActive) && 'text-primary',
                                )}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((child) => {
                                const isChildItemActive = child.exact
                                  ? pathname === child.href
                                  : pathname.startsWith(child.href);
                                return (
                                  <SidebarMenuSubItem key={child.href}>
                                    <SidebarMenuSubButton asChild isActive={isChildItemActive}>
                                      <Link href={child.href}>
                                        {child.icon && <child.icon />}
                                        <span>{child.label}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                        <Link href={item.href}>
                          {item.icon && <item.icon />}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {(footer || bottomFooter) && (
        <SidebarFooter className="gap-0 border-t border-sidebar-border p-0">
          {footer && <div className="p-2">{footer}</div>}
          {bottomFooter}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
