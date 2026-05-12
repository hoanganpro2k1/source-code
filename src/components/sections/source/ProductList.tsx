"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  {
    id: 1,
    title: "Web Quản Lý Bán Hàng",
    price: "800,000đ",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Node.js", "MySQL"],
    views: "1.2k",
    rating: "4.9"
  },
  {
    id: 2,
    title: "Ứng Dụng Đặt Phòng Khách Sạn",
    price: "600,000đ",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    tags: ["React Native", "Node.js", "MongoDB"],
    views: "980",
    rating: "4.8"
  },
  {
    id: 3,
    title: "Web Quản Lý Thư Viện",
    price: "700,000đ",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "Node.js", "MySQL"],
    views: "1.5k",
    rating: "4.9"
  },
  {
    id: 4,
    title: "Chat App Realtime",
    price: "450,000đ",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "Socket.io", "Node.js"],
    views: "810",
    rating: "4.7"
  },
  {
    id: 5,
    title: "Web Quản Lý Sinh Viên",
    price: "500,000đ",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Node.js", "MySQL"],
    views: "1.1k",
    rating: "4.8"
  },
  {
    id: 6,
    title: "Website Thương Mại Điện Tử",
    price: "900,000đ",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
    views: "2.1k",
    rating: "5.0"
  },
  {
    id: 7,
    title: "AI Chatbot Web",
    price: "300,000đ",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Python", "TensorFlow"],
    views: "700",
    rating: "4.9"
  },
  {
    id: 8,
    title: "Web Blog Cá Nhân",
    price: "450,000đ",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "TailwindCSS", "MDX"],
    views: "560",
    rating: "4.7"
  }
];

export const ProductList = () => {
  return (
    <div className="flex flex-col gap-12">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <ProjectCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl border-border hover:bg-muted">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button className="h-10 w-10 rounded-xl bg-primary text-white shadow-lg">1</Button>
          <Button variant="ghost" className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground">2</Button>
          <Button variant="ghost" className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground">3</Button>
          <div className="flex h-10 w-10 items-center justify-center text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </div>
          <Button variant="ghost" className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground">20</Button>
        </div>

        <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl border-border hover:bg-muted">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
