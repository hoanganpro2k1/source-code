"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Eye, 
  Database, 
  FileText, 
  Headphones, 
  Calendar, 
  HardDrive, 
  ShoppingCart,
  PlayCircle,
  MessageSquare,
  Facebook,
  Send,
  Link2
} from "lucide-react";

export const ProductInfo = () => {
  const specs = [
    { icon: <Database className="h-4 w-4" />, label: "Mã nguồn", value: "Đầy đủ" },
    { icon: <Database className="h-4 w-4" />, label: "Database", value: "Đầy đủ (MySQL)" },
    { icon: <FileText className="h-4 w-4" />, label: "Tài liệu", value: "Đầy đủ (Word, Slide)" },
    { icon: <Headphones className="h-4 w-4" />, label: "Hỗ trợ", value: "Hỗ trợ cài đặt 24/7" },
    { icon: <Calendar className="h-4 w-4" />, label: "Cập nhật", value: "20/04/2024" },
    { icon: <HardDrive className="h-4 w-4" />, label: "Dung lượng", value: "~120MB" },
    { icon: <ShoppingCart className="h-4 w-4" />, label: "Lượt mua", value: "1.2k+" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight lg:text-4xl">
          Web Quản Lý Bán Hàng
        </h1>
        
        <div className="flex flex-wrap items-center gap-3">
          {["Web App", "React", "Node.js", "MySQL"].map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6 py-2 border-y border-border/50 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-yellow-500">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
            </div>
            <span className="text-sm font-bold">4.9</span>
            <span className="text-sm text-muted-foreground">(120 đánh giá)</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">1.2k lượt xem</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-4xl font-black text-primary">800,000đ</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-[24px] bg-muted/50 border border-border/50">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                {spec.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{spec.label}</span>
                <span className="text-sm font-semibold text-foreground">{spec.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button size="lg" className="flex-1 h-14 rounded-2xl gap-2 text-base font-bold bg-primary shadow-lg shadow-primary/20">
            <PlayCircle className="h-5 w-5" /> Dùng thử demo
          </Button>
          <Button size="lg" variant="outline" className="flex-1 h-14 rounded-2xl gap-2 text-base font-bold border-border text-foreground hover:bg-muted">
            <MessageSquare className="h-5 w-5" /> Liên hệ mua ngay
          </Button>
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm font-bold text-muted-foreground">Chia sẻ:</span>
          <div className="flex items-center gap-2">
            {[
              { icon: <Facebook className="h-4 w-4" />, color: "bg-blue-600" },
              { icon: <Send className="h-4 w-4" />, color: "bg-blue-400" },
              { icon: <Send className="h-4 w-4" />, color: "bg-sky-500" },
              { icon: <Link2 className="h-4 w-4" />, color: "bg-gray-500" },
            ].map((social, i) => (
              <button key={i} className={`h-8 w-8 rounded-full ${social.color} text-white flex items-center justify-center hover:scale-110 transition-transform`}>
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
