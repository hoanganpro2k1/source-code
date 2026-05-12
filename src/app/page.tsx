"use client";

import { Affiliate } from "@/components/sections/Affiliate";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProducts />
      <Affiliate />
      <Testimonials />
    </div>
  );
}
