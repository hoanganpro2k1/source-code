"use client";

import { Button } from "@/components/ui/button";
import { 
  Grid2X2, 
  List, 
  Search, 
  ChevronDown 
} from "lucide-react";

export const TopFilter = () => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/80 dark:text-muted-foreground">
          <span className="hover:text-primary cursor-pointer transition-colors">Trang chủ</span>
          <span>/</span>
          <span className="text-foreground font-semibold tracking-tight">Source Code</span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight lg:text-4xl">Tất cả Source Code</h1>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm source code, công nghệ, tính năng..."
            className="w-full h-12 bg-card border border-border rounded-sm pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Selects */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-sm gap-3 border-border hover:bg-muted font-bold text-foreground/80 dark:text-foreground">
            Danh mục <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-sm gap-3 border-border hover:bg-muted font-bold text-foreground/80 dark:text-foreground">
            Công nghệ <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-sm gap-3 border-border hover:bg-muted font-bold text-foreground/80 dark:text-foreground">
            Giá tiền <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-sm gap-3 border-border hover:bg-muted font-bold text-foreground/80 dark:text-foreground">
            Sắp xếp <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-sm">
          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-sm bg-primary text-white shadow-lg hover:bg-primary/90">
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-sm text-muted-foreground hover:text-foreground hover:bg-background/50">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
