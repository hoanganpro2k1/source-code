"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const CATEGORIES = [
  "Tất cả",
  "Tin tức",
  "Hướng dẫn",
  "Mẹo lập trình",
  "Review",
  "Khác",
];

export const BlogFilters = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveTab(cat)}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
            activeTab === cat
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
              : "bg-muted text-muted-foreground border-transparent hover:border-primary/30 hover:text-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
