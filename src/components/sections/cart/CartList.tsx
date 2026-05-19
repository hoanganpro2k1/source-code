"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CART_ITEMS = [
  {
    id: 1,
    title: "Web Quản Lý Bán Hàng | ReactJS - NodeJS - MySQL",
    price: 800000,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    category: "Web App",
  },
  {
    id: 2,
    title: "Ứng Dụng Đặt Phòng Khách Sạn | React Native",
    price: 600000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    category: "Mobile App",
  },
];

export const CartList = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {CART_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-4 p-6 rounded-3xl border border-border bg-card group hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Image */}
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-1 pr-10 relative">
                <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors text-sm md:text-base">
                  {item.title}
                </h3>
                {/* Remove Icon */}
                <button className="absolute right-0 top-0 h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Service Rows */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-primary">
                    Source Code
                  </span>
                </div>
                <span className="text-sm font-black text-primary">
                  299.000đ
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <Minus className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">
                    Hỗ trợ cài đặt
                  </span>
                </div>
                <span className="text-sm font-black text-muted-foreground">
                  +0đ
                </span>
              </div>
            </div>

            {/* Item Total */}
            <div className="flex justify-end mt-2">
              <span className="text-lg font-black text-primary">299.000đ</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
