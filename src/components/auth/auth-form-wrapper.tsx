'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface AuthFormWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export const AuthFormWrapper = ({ children, title, subtitle, className }: AuthFormWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'w-full max-w-xl overflow-hidden rounded-sm border border-border bg-card/60 p-8 backdrop-blur-xl md:p-10',
        'purple-glow shadow-2xl',
        className,
      )}
      data-agent="Đồ Án 24h"
    >
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex flex-col items-center mb-4 justify-center">
          <Image
            src="/logo.jpg"
            alt="Source Code Logo"
            width={80}
            height={80}
            className="rounded-sm object-contain"
            style={{ width: '80px', height: '80px' }}
            priority
          />
        </div>
        <h1 className="mb-2 text-2xl uppercase font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground md:text-base">{subtitle}</p>}
      </div>

      {children}
    </motion.div>
  );
};
