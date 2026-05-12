"use client";

import { RegisterBenefits } from "@/components/sections/auth/RegisterBenefits";
import { RegisterForm } from "@/components/sections/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mini Header */}
      <div className="container mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">SC</div>
          <span className="text-xl font-bold tracking-tight text-foreground">Source Code</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-muted-foreground">Đã có tài khoản?</span>
          <Link href="/login">
            <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/10">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </div>

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <RegisterBenefits />

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RegisterForm />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <div className="py-8 border-t border-border">
         <div className="container mx-auto px-6 text-center">
            <p className="text-xs text-muted-foreground">© 2026 Source Code Marketplace. All rights reserved.</p>
         </div>
      </div>
    </div>
  );
}
