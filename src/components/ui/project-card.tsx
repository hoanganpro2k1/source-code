"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id: string | number;
  title: string;
  price: string;
  image: string;
  tags: string[];
  isPaid?: boolean;
  views?: string;
  rating?: string;
  className?: string;
}

export const ProjectCard = ({
  id,
  title,
  price,
  image,
  tags,
  isPaid = true,
  views = "1.2k",
  rating = "4.9",
  className,
}: ProjectCardProps) => {
  return (
    <Link href={`/source/${id}`} className="block">
      <motion.div
        data-agent="SourceCode"
        whileHover={{ y: -8, scale: 1.01 }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-card p-3 transition-all duration-300 hover:border-primary/50 hover:purple-glow",
          className,
        )}
      >
        {/* Status Tag */}
        <div className="absolute left-6 top-6 z-10">
          <span
            className={cn(
              "rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white",
              isPaid ? "bg-red-500" : "bg-green-500",
            )}
          >
            {isPaid ? "TRẢ PHÍ" : "MIỄN PHÍ"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-6 top-6 z-10 flex flex-col gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-colors hover:bg-black/40 text-white">
            <Heart className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md transition-all hover:bg-primary text-white border border-primary/20">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        {/* Image Wrapper */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 py-4 px-2">
          <h3 className="line-clamp-2 text-base font-bold text-foreground leading-snug transition-colors group-hover:text-primary">
            {title}
          </h3>

          <div className="flex items-center justify-between mt-1">
            <p className="text-lg font-extrabold text-primary">{price}</p>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
              Source Code
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="h-3.5 w-3.5" />
              <span className="text-[11px]">{views}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span className="text-[11px]">{rating}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
