"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

const TABS = [
  "Mô tả chi tiết",
  "Tính năng",
  "Công nghệ",
  "Tài liệu đi kèm",
  "Hướng dẫn cài đặt",
  "Đánh giá (120)",
];

const FEATURES = [
  "Quản lý sản phẩm (Thêm, sửa, xóa)",
  "Quản lý danh mục sản phẩm",
  "Quản lý khách hàng",
  "Quản lý đơn hàng",
  "Quản lý nhân viên và phân quyền",
  "Thống kê doanh thu theo ngày, tháng, năm",
  "Tìm kiếm và lọc sản phẩm",
  "Quản lý kho hàng",
  "Xuất báo cáo Excel, PDF",
  "Biểu đồ thống kê trực quan",
  "Đăng nhập, đăng ký, quên mật khẩu",
  "Giao diện responsive (PC, Mobile, Tablet)",
  "Giỏ hàng và thanh toán",
  "Thông báo đơn hàng mới",
  "Quản lý khuyến mãi, giảm giá",
  "Phân quyền Admin - Nhân viên",
  "Bảo mật với JWT, Bcrypt",
  "Tối ưu SEO, tốc độ nhanh",
];

export const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("Tính năng");

  return (
    <div className="flex flex-col gap-10">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border/50">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-4 text-sm font-bold whitespace-nowrap transition-all relative",
              activeTab === tab 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "Tính năng" && (
          <div className="flex flex-col gap-8">
            <h3 className="text-xl font-bold text-foreground">Tính năng nổi bật</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab !== "Tính năng" && (
          <div className="flex items-center justify-center h-64 text-muted-foreground italic border-2 border-dashed border-border rounded-[32px]">
            Nội dung đang được cập nhật...
          </div>
        )}
      </div>
    </div>
  );
};
