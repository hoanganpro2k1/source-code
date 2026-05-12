"use client";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Đồ Án Website Bán Ô TÔ | ReactJS - NodeJS - MongoDB - Chatbot AI",
    price: "299.000đ",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
    isPaid: true,
  },
  {
    id: 2,
    title: "Đồ Án Website Bán Kính | ReactJS - NodeJS - MongoDB - Chatbot AI",
    price: "299.000đ",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
    isPaid: true,
  },
  {
    id: 3,
    title:
      "Đồ Án Website Quản Lý Sân Bóng | ReactJS - NodeJS - MongoDB - Chatbot AI",
    price: "299.000đ",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
    isPaid: true,
  },
  {
    id: 4,
    title: "Đồ Án Website Quản Lý Sinh Viên | ReactJS - NodeJS - MongoDB",
    price: "299.000đ",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
    isPaid: true,
  },
  {
    id: 5,
    title: "Website Bán Máy Tính | ReactJS - NodeJS - MySQL",
    price: "299.000đ",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    tags: ["ReactJS", "NodeJS", "MySQL"],
    isPaid: true,
  },
  {
    id: 6,
    title: "Website Tìm Kiếm Việc Làm | ReactJS, NodeJS, MongoDB",
    price: "299.000đ",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
    isPaid: true,
  },
];

export const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Mới cập nhật
          </div>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Sản phẩm <span className="text-primary">nổi bật</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Source code chất lượng cao, đầy đủ database và hỗ trợ cài đặt
          </p>

          {/* Tabs */}
          <div className="mt-8 flex items-center gap-2 p-1 rounded-full bg-muted/50 border border-border">
            {["all", "paid", "free"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "all"
                  ? "Tất cả"
                  : tab === "paid"
                    ? "Trả Phí"
                    : "Miễn Phí"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-muted-foreground px-8 gap-2  border-primary/30 hover:border-primary"
          >
            Xem thêm sản phẩm <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
