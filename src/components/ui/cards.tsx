"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export const StatsCard = ({ icon, value, label, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-sm border border-border bg-card/50 p-6 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-muted text-primary">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  className?: string;
}

export const CategoryCard = ({ icon, title, count, className }: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-sm border border-border bg-card p-5 transition-all hover:border-primary/30 hover:bg-[#161C33]",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground/80">{count}</span>
      </div>
    </motion.div>
  );
};
