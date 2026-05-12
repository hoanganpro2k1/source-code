"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Download,
  Layers,
  Rocket,
  Star,
  TrendingUp,
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Custom Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e0e7ff] dark:from-background dark:via-background dark:to-background" />
        <div
          className="absolute inset-0 opacity-[0.6] dark:opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px] opacity-[0.6] dark:opacity-[0.3]"
          style={{
            width: "600px",
            height: "600px",
            top: "10%",
            right: "-5%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px] opacity-[0.6] dark:opacity-[0.2]"
          style={{
            width: "400px",
            height: "400px",
            bottom: "5%",
            left: "10%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent 70%)",
          }}
        />

        {/* Animated Dots */}
        {[
          { w: 3, h: 3, t: 15, l: 10, a: 0.2, y: -0.336663 },
          { w: 4.5, h: 4.5, t: 29, l: 25, a: 0.24, y: -1.61626 },
          { w: 6, h: 6, t: 43, l: 40, a: 0.28, y: -26.3139 },
          { w: 7.5, h: 7.5, t: 57, l: 55, a: 0.32, y: -29.2303 },
          { w: 9, h: 9, t: 71, l: 70, a: 0.36, y: -2.44946 },
          { w: 10.5, h: 10.5, t: 85, l: 85, a: 0.4, y: -9.94509 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/20 dark:bg-primary/20"
            style={{
              width: `${dot.w}px`,
              height: `${dot.h}px`,
              top: `${dot.t}%`,
              left: `${dot.l}%`,
              transform: `translateY(${dot.y}px)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="glass" className="gap-2 py-1.5 px-4 text-xs">
                  <Rocket className="h-3 w-3 text-yellow-500" />
                  Source Code | Giải Pháp Đồ Án
                </Badge>
              </motion.div>

              <h1 className="text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
                Kho{" "}
                <span className="text-primary bg-clip-text">Source Code</span>{" "}
                <br />
                & Đồ Án Lập Trình <br />
                Chất Lượng
              </h1>

              <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
                Full code – Full database – Hỗ trợ cài đặt. <br />
                Hàng ngàn đồ án React, NodeJS, Python, AI sẵn sàng cho bạn.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="btn-primary px-8 py-6 text-base font-semibold"
              >
                Xem Source Ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-semibold border-orange-500/50 hover:bg-orange-500/10 text-orange-500"
              >
                Kiếm tiền cùng Source Code
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">
                  2,500+
                </span>
                <span className="text-xs text-muted-foreground">
                  Source code
                </span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">
                  10,000+
                </span>
                <span className="text-xs text-muted-foreground">Lượt tải</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">
                  4.9/5
                </span>
                <span className="text-xs text-muted-foreground">Đánh giá</span>
              </div>
            </div>
          </motion.div>

          {/* Right Mockup */}
          {/* Right Mockup - Detailed Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            {/* Background Glows */}
            <div
              className="absolute blur-[100px] rounded-full z-0"
              style={{
                width: "500px",
                height: "500px",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.1), transparent 70%)",
              }}
            />
            <div
              className="absolute blur-[80px] rounded-full z-0"
              style={{
                width: "300px",
                height: "300px",
                top: "30%",
                right: "-10%",
                background:
                  "radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent 70%)",
              }}
            />

            {/* Main Window */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Browser Window */}
              <div
                className="rounded-t-2xl overflow-hidden"
                style={{
                  background: "#2d2d3f",
                  padding: "12px 12px 0px",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(99, 102, 241, 0.05)",
                }}
              >
                <div className="flex justify-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#374151]" />
                </div>

                <div className="rounded-t-lg overflow-hidden bg-[#0F172A]">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#1E293B]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    </div>
                    <div className="flex-1 h-5 rounded ml-2 flex items-center px-2 bg-white/5">
                      <span className="text-[9px] text-[#64748B]">
                        localhost:3000/admin/dashboard
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="flex" style={{ height: "280px" }}>
                    {/* Sidebar */}
                    <div className="flex flex-col gap-2 py-3 px-2 w-[52px] bg-[#1E293B] border-r border-white/5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#6366F1] mx-auto flex items-center justify-center">
                        <Code className="h-3 w-3 text-white" />
                      </div>
                      <div className="w-7 h-7 rounded-lg mx-auto bg-blue-500/15" />
                      <div className="w-7 h-7 rounded-lg mx-auto bg-white/5" />
                      <div className="w-7 h-7 rounded-lg mx-auto bg-white/5" />
                      <div className="w-7 h-7 rounded-lg mx-auto bg-white/5" />
                      <div className="w-7 h-7 rounded-lg mx-auto bg-white/5" />
                    </div>

                    {/* Main Feed */}
                    <div className="flex-1 p-3 overflow-hidden">
                      {/* Top Cards */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="rounded-lg p-2 bg-white/5 border border-white/10">
                          <p className="text-[8px] text-[#64748B]">Revenue</p>
                          <p className="text-[11px] font-bold text-[#F8FAFC] mt-0.5">
                            $12,450
                          </p>
                          <p className="text-[8px] mt-0.5 text-green-500">
                            +24%
                          </p>
                        </div>
                        <div className="rounded-lg p-2 bg-white/5 border border-white/10">
                          <p className="text-[8px] text-[#64748B]">Users</p>
                          <p className="text-[11px] font-bold text-[#F8FAFC] mt-0.5">
                            3,842
                          </p>
                          <p className="text-[8px] mt-0.5 text-green-500">
                            +18%
                          </p>
                        </div>
                        <div className="rounded-lg p-2 bg-white/5 border border-white/10">
                          <p className="text-[8px] text-[#64748B]">Orders</p>
                          <p className="text-[11px] font-bold text-[#F8FAFC] mt-0.5">
                            1,249
                          </p>
                          <p className="text-[8px] mt-0.5 text-green-500">
                            +32%
                          </p>
                        </div>
                      </div>

                      {/* Chart Area */}
                      <div className="rounded-lg p-2 mb-3 bg-white/[0.03] border border-white/10">
                        <p className="text-[8px] text-[#94A3B8] mb-2">
                          Monthly Revenue
                        </p>
                        <div className="flex items-end gap-1.5 h-14">
                          {[
                            35, 55, 40, 70, 50, 80, 65, 90, 75, 95, 85, 100,
                          ].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm transition-all duration-300"
                              style={{
                                height: `${h}%`,
                                background:
                                  h > 80
                                    ? "linear-gradient(to top, #3B82F6, #8B5CF6)"
                                    : "rgba(99, 102, 241, 0.2)",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Project Table */}
                      <div className="rounded-lg overflow-hidden bg-white/[0.03] border border-white/10">
                        <div className="flex gap-2 px-2 py-1.5 border-b border-white/10">
                          <span className="text-[7px] text-[#94A3B8] flex-1">
                            Project
                          </span>
                          <span className="text-[7px] text-[#94A3B8] w-12 text-right">
                            Price
                          </span>
                          <span className="text-[7px] text-[#94A3B8] w-12 text-right">
                            Sales
                          </span>
                        </div>
                        <div className="flex gap-2 px-2 py-1.5 border-b border-white/5">
                          <span className="text-[8px] text-[#E2E8F0] flex-1">
                            React E-Commerce
                          </span>
                          <span className="text-[8px] text-[#3B82F6] w-12 text-right font-medium">
                            $49
                          </span>
                          <span className="text-[8px] text-[#94A3B8] w-12 text-right">
                            342
                          </span>
                        </div>
                        <div className="flex gap-2 px-2 py-1.5 border-b border-white/5">
                          <span className="text-[8px] text-[#E2E8F0] flex-1">
                            Node.js REST API
                          </span>
                          <span className="text-[8px] text-[#3B82F6] w-12 text-right font-medium">
                            $29
                          </span>
                          <span className="text-[8px] text-[#94A3B8] w-12 text-right">
                            518
                          </span>
                        </div>
                        <div className="flex gap-2 px-2 py-1.5">
                          <span className="text-[8px] text-[#E2E8F0] flex-1">
                            AI Chatbot
                          </span>
                          <span className="text-[8px] text-[#3B82F6] w-12 text-right font-medium">
                            $79
                          </span>
                          <span className="text-[8px] text-[#94A3B8] w-12 text-right">
                            186
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Support */}
              <div
                className="mx-auto rounded-b-xl"
                style={{
                  height: "14px",
                  width: "110%",
                  marginLeft: "-5%",
                  background: "linear-gradient(#3d3d50, #2d2d3f)",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <div className="mx-auto rounded-b-sm w-[60px] h-1 bg-[#4B5563]" />
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-12 z-20 rounded-2xl p-4 bg-white/95 border border-indigo-500/10 shadow-2xl backdrop-blur-xl min-w-[160px]"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-500/15">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Doanh thu
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900">+127%</p>
              <p className="text-xs mt-1 text-green-500">↑ Tháng này</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -left-8 bottom-20 z-20 rounded-2xl p-4 bg-white/95 border border-indigo-500/10 shadow-2xl backdrop-blur-xl min-w-[185px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    React Dashboard
                  </p>
                  <p className="text-xs text-slate-500">1,234 lượt tải</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-500 text-yellow-500"
                  />
                ))}
                <span className="text-xs ml-1 text-slate-500">4.9</span>
              </div>
            </motion.div>

            <div className="absolute right-4 -bottom-2 z-20 rounded-2xl p-3 bg-white/95 border border-indigo-500/10 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                  <Code className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium text-slate-700">
                    React
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                  <Database className="h-3 w-3 text-purple-500" />
                  <span className="text-xs font-medium text-slate-700">
                    MongoDB
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                  <Layers className="h-3 w-3 text-indigo-500" />
                  <span className="text-xs font-medium text-slate-700">
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
