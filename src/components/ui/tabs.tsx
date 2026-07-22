'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function Tabs({ className, orientation = 'horizontal', ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit min-h-9.5 items-center justify-center rounded-md p-[3px] text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=grouped]:h-auto data-[variant=grouped]:min-h-0 data-[variant=grouped]:gap-6 data-[variant=grouped]:rounded-none data-[variant=grouped]:p-0',
  {
    variants: {
      variant: {
        default: 'bg-overlay-muted',
        line: 'gap-1 bg-transparent',
        grouped: 'bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * Optional label + separated group of triggers for the "grouped" TabsList
 * variant — e.g. "DISCOVER" above Search, "EXTRACT" above Scrape|Parse|Map,
 * each group divided by a vertical rule from the next.
 */
function TabsGroup({
  className,
  label,
  trackClassName,
  children,
}: {
  className?: string;
  label?: string;
  trackClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="tabs-group"
      className={cn('flex flex-col gap-1.5 border-l border-border pl-6 first:border-l-0 first:pl-0', className)}
    >
      {label && <span className="px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>}
      <div data-slot="tabs-group-track" className={cn('flex items-center gap-1', trackClassName)}>
        {children}
      </div>
    </div>
  );
}

function TabsTrigger({
  className,
  count,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { count?: number }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-8.5 flex-1 items-center justify-center gap-1.5 rounded-sm border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none group-data-[variant=grouped]/tabs-list:min-h-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent',
        'group-data-[variant=grouped]/tabs-list:h-8.5 group-data-[variant=grouped]/tabs-list:flex-none group-data-[variant=grouped]/tabs-list:rounded-sm group-data-[variant=grouped]/tabs-list:px-2 group-data-[variant=grouped]/tabs-list:py-0 group-data-[variant=grouped]/tabs-list:data-[state=active]:bg-card group-data-[variant=grouped]/tabs-list:data-[state=active]:text-foreground group-data-[variant=grouped]/tabs-list:data-[state=active]:shadow-sm',
        'group-data-[variant=default]/tabs-list:data-[state=active]:bg-white group-data-[variant=default]/tabs-list:data-[state=active]:text-foreground dark:group-data-[variant=default]/tabs-list:data-[state=active]:border-input dark:group-data-[variant=default]/tabs-list:data-[state=active]:bg-white dark:group-data-[variant=default]/tabs-list:data-[state=active]:text-neutral-900',
        'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100 group-data-[variant=grouped]/tabs-list:after:content-none',
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <Badge variant="secondary" className="rounded-md px-1.5 py-0 text-[11px] font-semibold">
          {count}
        </Badge>
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsGroup, TabsTrigger, TabsContent, tabsListVariants };
