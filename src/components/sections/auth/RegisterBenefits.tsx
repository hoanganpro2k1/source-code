"use client";

import { motion } from "framer-motion";
import { Code2, Download, Headphones, Star, Zap } from "lucide-react";

export const RegisterBenefits = () => {
  const benefits = [
    {
      icon: <Code2 className="h-6 w-6 text-purple-500" />,
      title: "Kho source code chất lượng",
      desc: "Hơn 2,500+ source code đa dạng lĩnh vực, được chọn lọc kỹ lưỡng.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-blue-500" />,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ hỗ trợ nhiệt tình, giải đáp mọi thắc mắc nhanh chóng.",
    },
    {
      icon: <Download className="h-6 w-6 text-green-500" />,
      title: "Tải về dễ dàng",
      desc: "Tải mã nguồn, tài liệu và database chỉ với một cú nhấp chuột.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Ưu đãi độc quyền",
      desc: "Nhận thông báo về các chương trình khuyến mãi và giảm giá đặc biệt.",
    },
  ];

  return (
    <div className="flex flex-col gap-12 lg:pr-12">
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit"
        >
          <Star className="h-3 w-3 fill-current" /> Tham gia cùng hơn 8,000+
          thành viên
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-black text-foreground leading-tight"
        >
          Tạo tài khoản miễn phí <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Bắt đầu khám phá ngay hôm nay!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-md"
        >
          Đăng ký tài khoản CodeDoan để lưu dự án yêu thích, tải mã nguồn, nhận
          hỗ trợ và nhiều ưu đãi hấp dẫn.
        </motion.p>
      </div>

      <div className="flex flex-col gap-8">
        {benefits.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-start gap-4 group"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
              {item.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
