"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import Preloader from "@/components/Preloader";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";


export default function Home() {
  const [loading, setLoading] = useState(true);

  // Lock scroll when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <main className="relative w-full">
      <Preloader loading={loading} />

      <HeroSection onLoad={setLoading} />

      <div className="relative z-20 -mt-[100vh] bg-[#020202] min-h-screen">
        <About />
        <BentoGrid />
        <Testimonials />
        <CTA />

      </div>
    </main>
  );
}
