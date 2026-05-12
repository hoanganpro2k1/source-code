"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  Clock,
  MessageCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";

export const ProductSidebar = () => {
  const [selectedPlan, setSelectedPlan] = useState("full");

  return (
    <div className="flex flex-col gap-8">
      {/* Pricing Plans */}
      <div className="flex flex-col gap-4 p-6 rounded-[32px] border border-border bg-card shadow-xl purple-glow">
        <h3 className="text-lg font-bold text-foreground">Gói sản phẩm</h3>

        <div className="flex flex-col gap-3">
          {/* Plan 1 */}
          <button
            onClick={() => setSelectedPlan("full")}
            className={cn(
              "flex flex-col gap-4 p-4 rounded-2xl border-2 transition-all text-left",
              selectedPlan === "full"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Gói đầy đủ</span>
              <span className="text-lg font-black text-primary">800,000đ</span>
            </div>
            <ul className="flex flex-col gap-2">
              {[
                "Full Source Code",
                "Database (MySQL)",
                "Tài liệu báo cáo (Word)",
                "Slide thuyết trình (PPT)",
                "Video hướng dẫn",
                "Hỗ trợ cài đặt 24/7",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </button>

          {/* Plan 2 */}
          <button
            onClick={() => setSelectedPlan("premium")}
            className={cn(
              "flex flex-col gap-3 p-4 rounded-2xl border-2 transition-all text-left",
              selectedPlan === "premium"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">
                Gói hỗ trợ nâng cao
              </span>
              <span className="text-lg font-black text-primary">
                1,200,000đ
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bao gồm gói đầy đủ + hỗ trợ Google Meet giải thích source code chi
              tiết.
            </p>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3 mt-2">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-primary/80 leading-relaxed font-medium">
            Bạn sẽ được dùng thử demo trước khi quyết định mua hàng để đảm bảo
            sản phẩm đúng yêu cầu.
          </p>
        </div>

        <Button
          size="lg"
          className="h-14 rounded-2xl gap-2 text-base font-bold w-full bg-primary mt-2"
        >
          <MessageCircle className="h-5 w-5" /> Liên hệ mua ngay
        </Button>

        {/* Support channels */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              icon: (
                <div className="h-5 w-5 rounded-full bg-blue-500 text-[8px] text-white flex items-center justify-center font-black">
                  Zalo
                </div>
              ),
              label: "Zalo",
            },
            {
              icon: <MessageCircle className="h-5 w-5 text-blue-400" />,
              label: "Messenger",
            },
            {
              icon: <Send className="h-5 w-5 text-sky-400" />,
              label: "Telegram",
            },
          ].map((ch, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:bg-muted transition-colors"
            >
              {ch.icon}
              <span className="text-[10px] font-bold text-muted-foreground">
                {ch.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Commitments */}
      <div className="flex flex-col gap-4 p-6 rounded-[32px] border border-border bg-card">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Cam kết từ CodeDoan
        </h3>
        <div className="flex flex-col gap-5">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
              title: "Source code chất lượng, dễ chỉnh sửa",
            },
            {
              icon: <Clock className="h-5 w-5 text-blue-500" />,
              title: "Hỗ trợ cài đặt và fix lỗi 24/7",
            },
            {
              icon: <Zap className="h-5 w-5 text-yellow-500" />,
              title: "Bảo hành và cập nhật miễn phí",
            },
            {
              icon: <RotateCcw className="h-5 w-5 text-red-500" />,
              title: "Hoàn tiền 100% nếu không hài lòng",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-foreground/80 leading-snug">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Table */}
      <div className="flex flex-col gap-4 p-6 rounded-[32px] border border-border bg-card">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Thông tin dự án
        </h3>
        <div className="flex flex-col gap-4">
          {[
            { label: "Danh mục:", value: "Web App" },
            { label: "Công nghệ:", value: "React, Node.js" },
            { label: "Database:", value: "MySQL" },
            { label: "Ngày tạo:", value: "10/04/2024" },
            { label: "Cập nhật:", value: "20/04/2024" },
            { label: "Kích thước:", value: "120MB" },
            { label: "Lượt xem:", value: "1.2k" },
            { label: "Lượt mua:", value: "890" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-bold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
