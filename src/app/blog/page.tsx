"use client";

import { BlogHeader } from "@/components/sections/blog/BlogHeader";
import { BlogFilters } from "@/components/sections/blog/BlogFilters";
import { BlogList } from "@/components/sections/blog/BlogList";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <BlogHeader />
        <BlogFilters />
        <BlogList />
      </div>
    </div>
  );
}
