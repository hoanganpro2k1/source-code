"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DollarSign, Share2, TrendingUp } from "lucide-react";

export const Affiliate = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[40px] bg-primary/5 border border-primary/10 p-8 lg:p-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-primary/20 blur-[100px] rounded-full" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <DollarSign className="h-4 w-4" />
                Kiếm tiền cùng Source Code
              </div>
              <h2 className="text-3xl font-extrabold text-foreground sm:text-5xl leading-tight">
                Chia sẻ link, <span className="text-orange-500">nhận 15%</span>{" "}
                hoa hồng
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bấm chia sẻ sản phẩm → gửi link cho bạn bè → có người mua = bạn
                nhận tiền. Đơn giản vậy thôi!
              </p>

              <div className="flex items-center gap-4 mt-2">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-10 py-7 text-lg font-bold"
                >
                  Tìm hiểu ngay
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Stats Card Mockup */}
              <div className="relative rounded-[32px] border border-border bg-card p-8 shadow-xl purple-glow">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Hoa hồng tháng này
                    </p>
                    <h3 className="text-3xl font-extrabold text-foreground">
                      1.250.000đ
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>

                {/* Simplified Chart Bar Visual */}
                <div className="flex items-end gap-2 h-32 mb-6">
                  {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex-1 rounded-t-lg bg-orange-500/20 hover:bg-orange-500/40 transition-colors"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">
                      Tổng đơn
                    </p>
                    <p className="text-lg font-bold">48 đơn</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-500 font-bold text-sm bg-green-500/10 px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3" /> 32%
                  </div>
                </div>

                {/* Floating Notification */}
                <div className="absolute -top-6 -right-6 animate-float">
                  <div className="bg-background/80 backdrop-blur-md border border-border p-3 rounded-2xl shadow-lg flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Share2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold">Vừa nhận</p>
                      <p className="text-xs font-bold text-green-500">
                        +75.000đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
