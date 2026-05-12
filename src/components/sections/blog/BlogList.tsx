"use client";

import { BlogCard } from "@/components/ui/blog-card";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Kiếm tiền cùng Source Code — Chương trình Affiliate hoa hồng 15%",
    excerpt: "Tham gia chương trình Affiliate Source Code — chỉ cần chia sẻ link sản phẩm, nhận ngay 15% hoa hồng...",
    category: "Tin tức",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop",
    date: "24/3/2026",
    views: "202",
    author: "Hoàng Ân"
  },
  {
    id: 2,
    title: "Kinh nghiệm làm đồ án tốt nghiệp CNTT — Từ ý tưởng đến bảo vệ",
    excerpt: "10 kinh nghiệm vàng giúp sinh viên CNTT làm đồ án tốt nghiệp thành công: chọn đề tài, phân tích...",
    category: "Mẹo lập trình",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "418",
    author: "Hoàng Ân"
  },
  {
    id: 3,
    title: "AI trong lập trình — ChatGPT, Gemini và tương lai của developer",
    excerpt: "AI đang thay đổi cách developer làm việc. Tìm hiểu cách sử dụng AI tools hiệu quả và tương lai của...",
    category: "Tin tức",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "489",
    author: "Hoàng Ân"
  },
  {
    id: 4,
    title: "TypeScript — Tại sao developer hiện đại nên dùng?",
    excerpt: "Phân tích lý do TypeScript đang trở thành tiêu chuẩn trong phát triển web: type safety, develop...",
    category: "Tin tức",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "413",
    author: "Hoàng Ân"
  },
  {
    id: 5,
    title: "SEO cho website — Tối ưu từ A đến Z để lên top Google",
    excerpt: "Hướng dẫn tối ưu SEO toàn diện: On-page, Technical SEO, Schema markup, và những kỹ thuật...",
    category: "Mẹo lập trình",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "200",
    author: "Hoàng Ân"
  },
  {
    id: 6,
    title: "Deploy website lên VPS với Docker — Hướng dẫn từ A đến Z",
    excerpt: "Hướng dẫn chi tiết cách deploy ứng dụng web lên VPS sử dụng Docker và Docker Compose, bao...",
    category: "Hướng dẫn",
    image: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "518",
    author: "Hoàng Ân"
  },
  {
    id: 7,
    title: "Git & GitHub — Quản lý source code hiệu quả cho developer",
    excerpt: "Hướng dẫn sử dụng Git và GitHub từ cơ bản đến nâng cao: branching, merging, pull request, và qu...",
    category: "Hướng dẫn",
    image: "https://images.unsplash.com/photo-1556075798-4825dfabb163?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "332",
    author: "Hoàng Ân"
  },
  {
    id: 8,
    title: "CSS Modern — Xu hướng Glassmorphism & Dark Mode",
    excerpt: "Tìm hiểu về xu hướng thiết kế web hiện đại: Glassmorphism, Dark Mode, và cách áp dụng CS...",
    category: "Hướng dẫn",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "441",
    author: "Hoàng Ân"
  },
  {
    id: 9,
    title: "10 lỗi bảo mật website thường gặp và cách khắc phục",
    excerpt: "Tổng hợp 10 lỗi bảo mật phổ biến mà developer hay mắc phải: XSS, SQL Injection, CSRF... và cách...",
    category: "Mẹo lập trình",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    date: "23/3/2026",
    views: "267",
    author: "Hoàng Ân"
  }
];

export const BlogList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {BLOG_POSTS.map((post) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </div>
  );
};
