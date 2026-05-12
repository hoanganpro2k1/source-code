"use client";

import { motion } from "framer-motion";

export const BlogHeader = () => {
  return (
    <div className="flex flex-col items-center text-center gap-6 mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Blog & Tin tức
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl lg:text-5xl font-black text-foreground tracking-tight"
      >
        Bài viết mới nhất
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground max-w-2xl text-lg leading-relaxed"
      >
        Chia sẻ kiến thức lập trình, hướng dẫn sử dụng, mẹo hay và tin tức công nghệ từ <span className="text-primary font-bold">Source Code</span>
      </motion.p>
    </div>
  );
};
