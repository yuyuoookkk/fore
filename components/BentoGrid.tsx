"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import WorldMap from "@/components/WorldMap";

const stats = [
    { label: "Partner Farms", value: 45, suffix: "+" },
    { label: "Countries", value: 12, suffix: "" },
    { label: "Cups Served", value: 1.2, suffix: "M+" },
    { label: "Years", value: 8, suffix: "" },
];

export default function BentoGrid() {
    return (
        <section className="bg-[#020202] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[800px]">
                {/* Main Large Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 md:row-span-2 bg-neutral-900 rounded-3xl overflow-hidden relative"
                >
                    <video
                        src="/bentogrid/slowmo-bentogrid.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                        <h3 className="text-3xl font-bold">The Process</h3>
                        <p className="text-white/60">From cherry to cup.</p>
                    </div>
                </motion.div>

                {/* Stats Block 1 */}
                <div className="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between border border-white/5">
                    <CountUp end={stats[0].value} suffix={stats[0].suffix} label={stats[0].label} />
                </div>

                {/* Stats Block 2 */}
                <div className="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between border border-white/5 md:col-start-4 relative overflow-hidden group">
                    <WorldMap className="group-hover:opacity-50 transition-opacity duration-500" />
                    <CountUp end={stats[1].value} suffix={stats[1].suffix} label={stats[1].label} />
                </div>

                {/* Wide Text Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 bg-[#111] rounded-3xl p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0">
                        <img
                            src="/bentogrid/roast-quality.jpg"
                            alt="Roasting Process"
                            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                    <p className="text-2xl font-light leading-relaxed text-white/90 relative z-10">
                        "Quality is not an act, it is a habit. We strive for perfection in every roast."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

const CountUp = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
    const [count, setCount] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
                // Simple ease-out counter
                let start = 0;
                const duration = 2000;
                const startTime = performance.now();

                const step = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3); // cubic out

                    setCount(start + (end - start) * ease);

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                };
                requestAnimationFrame(step);
            }}
        >
            <h4 className="text-5xl md:text-7xl font-bold mb-2 font-mono">
                {count % 1 !== 0 ? count.toFixed(1) : Math.round(count)}{suffix}
            </h4>
            <p className="text-sm uppercase tracking-widest opacity-50">{label}</p>
        </motion.div>
    )
}
