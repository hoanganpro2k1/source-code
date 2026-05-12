"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  views: string;
  author: string;
  className?: string;
}

export const BlogCard = ({
  id,
  title,
  excerpt,
  category,
  image,
  date,
  views,
  author,
  className,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className={cn(
          "group flex flex-col h-full overflow-hidden rounded-[24px] border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5",
          className
        )}
      >
        {/* Image Section */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-lg bg-primary/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="line-clamp-2 text-xl font-bold text-foreground leading-tight transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {excerpt}
          </p>

          <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span>{views}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
              <User className="h-3.5 w-3.5" />
              <span>{author}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
