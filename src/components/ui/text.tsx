import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'font-medium tracking-tight text-foreground',
      h2: 'font-medium tracking-tight text-foreground',
      h3: 'font-medium text-foreground',
      body: 'text-foreground',
      muted: 'text-muted-foreground',
      caption: 'text-muted-foreground',
      error: 'text-destructive',
    },
    size: {
      12: 'text-xs',
      13: 'text-sm',
      14: 'text-base',
      16: 'text-lg',
      20: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'body',
    size: 14,
  },
});

const variantDefaultSize = {
  h1: 20,
  h2: 16,
  h3: 14,
  body: 14,
  muted: 13,
  caption: 12,
  error: 12,
} as const;

function Text({
  className,
  variant = 'body',
  size,
  as,
  asChild = false,
  ...props
}: React.ComponentProps<'p'> &
  VariantProps<typeof textVariants> & {
    as?: React.ElementType;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : (as ?? 'p');
  const resolvedSize = size ?? variantDefaultSize[variant ?? 'body'];

  return <Comp data-slot="text" className={cn(textVariants({ variant, size: resolvedSize }), className)} {...props} />;
}

export { Text, textVariants };
