"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const CATEGORIES = [
  { name: "Tất cả danh mục", count: null },
  { name: "Web App", count: "1200+" },
  { name: "Mobile App", count: "320+" },
  { name: "AI - Machine Learning", count: "150+" },
  { name: "Desktop App", count: "200+" },
  { name: "Game", count: "80+" },
  { name: "Khác", count: "100+" },
];

const TECHNOLOGIES = [
  "React", "Next.js", "Node.js", "React Native", "Laravel", 
  "PHP", "Python", "Django", "MongoDB", "MySQL"
];

const PRICE_RANGES = [
  "Dưới 300,000đ",
  "300,000đ - 500,000đ",
  "500,000đ - 1,000,000đ",
  "1,000,000đ - 2,000,000đ",
  "Trên 2,000,000đ"
];

export const SidebarFilter = () => {
  return (
    <aside className="w-full lg:w-[280px] flex flex-col gap-8">
      {/* Categories */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Danh mục</h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-sm text-sm transition-all",
                i === 0 
                  ? "bg-primary/10 text-primary font-bold" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{cat.name}</span>
              {cat.count && <span className="text-[10px] opacity-60">({cat.count})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Công nghệ</h3>
        <div className="flex flex-col gap-3 px-3">
          {TECHNOLOGIES.map((tech) => (
            <div key={tech} className="flex items-center gap-3">
              <Checkbox id={`tech-${tech}`} className="rounded-sm border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <label 
                htmlFor={`tech-${tech}`} 
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {tech} (200+)
              </label>
            </div>
          ))}
          <button className="text-xs text-primary font-bold flex items-center gap-1 mt-1 hover:underline">
            Xem thêm <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Khoảng giá</h3>
        <div className="flex flex-col gap-3 px-3">
          {PRICE_RANGES.map((range) => (
            <div key={range} className="flex items-center gap-3">
              <Checkbox id={`price-${range}`} className="rounded-sm border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <label 
                htmlFor={`price-${range}`} 
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {range}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
