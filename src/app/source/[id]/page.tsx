"use client";

import { ProductMedia } from "@/components/sections/product/ProductMedia";
import { ProductInfo } from "@/components/sections/product/ProductInfo";
import { ProductSidebar } from "@/components/sections/product/ProductSidebar";
import { ProductTabs } from "@/components/sections/product/ProductTabs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SourceDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/source" className="hover:text-primary transition-colors">Source Code</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Web Quản Lý Bán Hàng</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Media Section */}
              <div className="md:sticky md:top-28 h-fit">
                <ProductMedia />
              </div>
              
              {/* Info Section */}
              <div>
                <ProductInfo />
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="border-t border-border pt-16">
              <ProductTabs />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-8">
              <ProductSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
