"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
];

export const ProductMedia = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Slider */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] border border-border bg-muted">
      <Image
        src={IMAGES[activeIndex]}
        alt="Product Preview"
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-all duration-500"
        priority
      />
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : IMAGES.length - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={() => setActiveIndex((prev) => (prev < IMAGES.length - 1 ? prev + 1 : 0))}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Counter Tag */}
      <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-medium">
        {activeIndex + 1} / {IMAGES.length}
      </div>
    </div>

    {/* Thumbnails */}
    <div className="grid grid-cols-6 gap-3">
      {IMAGES.map((img, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={cn(
            "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
            activeIndex === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
          )}
        >
          <Image
            src={img}
            alt="Thumbnail"
            fill
            sizes="(max-width: 768px) 20vw, 10vw"
            className="object-cover"
          />
        </button>
      ))}
        {/* Video Thumbnail */}
        <button className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent bg-muted flex items-center justify-center group">
          <Play className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="absolute inset-0 bg-black/10" />
        </button>
      </div>
    </div>
  );
};
