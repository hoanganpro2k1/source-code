'use client';

import type React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './sheet';

export { Sheet as Drawer, SheetTrigger as DrawerTrigger, SheetClose as DrawerClose };

export interface DrawerContentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DrawerContent({ title, description, children, footer, className }: DrawerContentProps) {
  return (
    <SheetContent
      side="right"
      showCloseButton={false}
      className={cn(
        'flex w-[600px] max-w-[90vw] data-[side=right]:w-[600px] data-[side=right]:sm:max-w-[600px] flex-col gap-0 p-0 rounded-l-xl',
        className,
      )}
    >
      <div className="relative shrink-0 border-b border-border px-6 pb-4 pt-6">
        <div className="pr-8">
          <p className="text-base font-semibold text-card-foreground">{title}</p>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        <SheetClose asChild>
          <Button variant="ghost" size="icon-sm" className="absolute right-4 top-4">
            <X />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

      {footer && <div className="shrink-0 border-t border-border px-6 py-4">{footer}</div>}
    </SheetContent>
  );
}
