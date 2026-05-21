'use client';

import { ProductList } from '@/components/sections/source/ProductList';
import { SidebarFilter } from '@/components/sections/source/SidebarFilter';
import { TopFilter } from '@/components/sections/source/TopFilter';

export default function SourcePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - Sticky on Desktop */}
          <div className="lg:block">
            <div className="sticky top-28">
              <SidebarFilter />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <TopFilter />
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
