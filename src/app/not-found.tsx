'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-160px)] flex items-center justify-center overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-8">
        {/* 404 số lớn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative select-none"
        >
          <span
            className="text-[160px] sm:text-[200px] font-black leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(135deg, #7C4DFF 0%, #8B5CFF 50%, rgba(124,77,255,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </span>
          {/* Glow behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-24 bg-primary/20 blur-[60px] rounded-full" />
          </div>
        </motion.div>

        {/* Icon & tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Icon vòng tròn */}
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Search className="h-7 w-7 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Trang không tồn tại</h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
              Trang bạn đang tìm kiếm có thể đã bị xoá, đổi địa chỉ, hoặc chưa từng tồn tại. Hãy quay về trang chủ để
              tiếp tục khám phá.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
        >
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-[14px] text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #6D4AFF 0%, #8B5CFF 100%)',
              boxShadow: '0 8px 24px rgba(124, 77, 255, 0.3)',
            }}
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>

          <button
            onClick={() => router.back()}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-[14px] text-sm font-semibold text-foreground/80 border border-border bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4"
        >
          <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground/60">
            Khám phá nhanh:
          </span>
          {[
            { label: 'Source Code', href: '/source' },
            { label: 'Blog', href: '/blog' },
            { label: 'Đăng nhập', href: '/login' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-primary/80 hover:text-primary hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
