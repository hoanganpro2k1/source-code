"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export const AuthFormWrapper = ({
  children,
  title,
  subtitle,
  className,
}: AuthFormWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "w-full max-w-[450px] overflow-hidden rounded-[24px] border border-border bg-card/60 p-8 backdrop-blur-xl md:p-10",
        "purple-glow shadow-2xl",
        className,
      )}
      data-agent="SourceCode"
    >
      <div className="mb-8 flex flex-col items-center text-center">
        {/* Logo Placeholder - C cho SourceCode */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
          C
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </motion.div>
  );
};
