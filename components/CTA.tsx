"use client";

import { motion } from "motion/react";

export default function CTA() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#1a1a1a] to-[#020202]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 text-center px-6">
                <h2 className="text-6xl md:text-9xl font-bold mb-8 text-white">Start the<br />Journey</h2>
                <button onClick={() => window.location.href = "/menu"} className="bg-white text-black px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                    Shop Now
                </button>
            </div>
        </section>
    );
}
