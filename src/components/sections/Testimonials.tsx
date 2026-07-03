"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "mai trong hieu",
    initial: "MT",
    rating: 5,
    date: "10/4/2026",
    content: "tuyệt vời",
    project: "Đồ Án Website Tìm Kiếm Việc Làm",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Khoa Trần",
    initial: "KT",
    rating: 5,
    date: "13/2/2026",
    content: "Chức năng đầy đủ, hoạt động mượt mà.",
    project: "Đồ Án Website Bán Ô Tô | Rea...",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Pham Ngoc Hung",
    initial: "PN",
    rating: 5,
    date: "13/2/2026",
    content: "Đã mua nhiều lần và chưa bao giờ thất vọng.",
    project: "Đồ Án Website Bán Ô Tô | Rea...",
    color: "bg-indigo-500",
  },
  {
    id: 4,
    name: "Trong Hiếu",
    initial: "TH",
    rating: 5,
    date: "13/2/2026",
    content: "Giá hợp lý so với chất lượng source code.",
    project: "Đồ Án Website Bán Ô Tô | Rea...",
    color: "bg-pink-500",
  },
  {
    id: 5,
    name: "admin",
    initial: "A",
    rating: 5,
    date: "13/2/2026",
    content: "Tuyệt vời, đúng cái mình đang cần.",
    project: "Đồ Án Website Bán Ô Tô | Rea...",
    color: "bg-cyan-500",
  },
  {
    id: 6,
    name: "Binh Nguyen",
    initial: "BN",
    rating: 5,
    date: "13/2/2026",
    content: "Đáng đồng tiền bát gạo, full source code xịn.",
    project: "Đồ Án Website Bán Ô Tô | Rea...",
    color: "bg-violet-500",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="h-4 w-4" />
            Đánh giá thực tế
          </div>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Khách hàng <span className="text-primary">nói gì</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Phản hồi chân thực từ những khách hàng đã sử dụng sản phẩm
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col gap-4 rounded-sm border border-border bg-card p-6 transition-all hover:border-primary/30 hover:purple-glow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {t.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < t.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                        />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {t.date}
                      </span>
                    </div>
                  </div>
                </div>
                <MessageSquareQuote className="h-6 w-6 text-primary/10 group-hover:text-primary/20 transition-colors" />
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed italic">
                {`"${t.content}"`}
              </p>

              <div className="mt-auto pt-4 border-t border-border flex items-center gap-2 overflow-hidden">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] font-medium text-primary truncate">
                  {t.project}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
