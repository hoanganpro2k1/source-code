'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface SwitcherItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** Optional trailing indicator, e.g. an active-status dot */
  indicator?: React.ReactNode;
}

export interface SwitcherAction {
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  variant?: 'default' | 'destructive';
}

export interface SwitcherPopoverProps {
  /** Content rendered inside the trigger button (icon + current item label, etc.) */
  trigger: React.ReactNode;
  /** Heading shown above the item list, e.g. "Teams" */
  title: string;
  items?: SwitcherItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  actions?: SwitcherAction[];
  className?: string;
  contentClassName?: string;
  /** Render the popover already open — useful for previews/demos */
  defaultOpen?: boolean;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function SwitcherPopover({
  trigger,
  title,
  items,
  value,
  onValueChange,
  actions,
  className,
  contentClassName,
  defaultOpen = false,
  children,
  side = 'bottom',
  align = 'start',
}: SwitcherPopoverProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('justify-between group', className)}>
          {trigger}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        side={side}
        className={cn(
          'w-72 rounded-2xl p-0 shadow-[0px_12px_24px_rgba(0,0,0,0.08),0px_4px_8px_rgba(0,0,0,0.04)] ring-0 gap-1',
          contentClassName,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-3 pt-3 pb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        {children ? (
          children
        ) : (
          <>
            <div className="flex flex-col gap-0.5 px-1 py-1">
              {items?.map((item) => {
                const isActive = item.value === value;
                return (
                  <Button
                    key={item.value}
                    type="button"
                    variant={isActive ? 'active' : 'ghost'}
                    size="item"
                    onClick={() => {
                      onValueChange?.(item.value);
                      setOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.indicator}
                  </Button>
                );
              })}
            </div>

            {actions && actions.length > 0 && (
              <div className="flex flex-col gap-0.5 border-t border-border px-1 py-1">
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    type="button"
                    variant={action.variant === 'destructive' ? 'destructive' : 'ghost'}
                    size="item"
                    className={cn(action.variant !== 'destructive' && 'text-foreground')}
                    onClick={() => {
                      action.onSelect();
                      setOpen(false);
                    }}
                  >
                    {action.icon}
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
