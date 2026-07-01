'use client';

import { Badge } from '@/components/ui/badge';
import { Facebook, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Source Code Logo"
                width={80}
                height={80}
                className="rounded-lg object-contain"
                style={{ width: '80px', height: '80px' }}
                priority
              />
              <span className="text-3xl font-black tracking-tight text-foreground">
                <span className="text-[#04315B]">ĐỒ ÁN</span> <span className="text-[#FF6A00]">24h</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Chúng tôi cung cấp các dịch vụ phát triển web và các giải pháp công nghệ. Luôn sẵn sàng hỗ trợ bạn 24/7.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'Next.js'].map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Sản phẩm</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Source Code Web
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Source Code Mobile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Đồ án AI / ML
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Template & UI Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Liên hệ</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">098.343.9381</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Đồ Án 24h.contact@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <Send className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground leading-snug">
                  Đường An Dương Vương - Phường Trường Vinh - Nghệ An
                </span>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Mạng xã hội</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <Facebook className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Hoàng Ân
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold">
                    SC
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    SC Official
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Zalo: 0983439381
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2026 Source Code. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Điều khoản
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Bảo mật
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button className="h-12 w-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <MessageCircle className="h-6 w-6" />
        </button>
        <button className="h-12 w-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <Send className="h-6 w-6" />
        </button>
      </div>
    </footer>
  );
};
