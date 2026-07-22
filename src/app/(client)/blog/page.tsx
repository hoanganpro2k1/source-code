"use client";

import { BlogHeader } from "@/components/sections/blog/BlogHeader";
import { BlogFilters } from "@/components/sections/blog/BlogFilters";
import { BlogList } from "@/components/sections/blog/BlogList";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <BlogHeader />
        <BlogFilters />
        <BlogList />
      </div>
    </div>
  );
}
