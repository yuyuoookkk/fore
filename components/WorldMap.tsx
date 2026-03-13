"use client";

import { motion } from "motion/react";

export default function WorldMap({ className }: { className?: string }) {
    return (
        <div className={`absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none ${className}`}>
            <svg
                viewBox="0 0 800 400"
                className="w-full h-full text-white"
                fill="currentColor"
            >
                {/* Abstract World Map Dots */}
                {/* North America */}
                <circle cx="150" cy="100" r="2" />
                <circle cx="160" cy="110" r="2" />
                <circle cx="140" cy="120" r="2" />
                <circle cx="180" cy="90" r="2" />
                <circle cx="200" cy="100" r="2" />
                <circle cx="120" cy="80" r="2" />
                <circle cx="100" cy="90" r="2" />
                <circle cx="170" cy="140" r="2" />
                <circle cx="190" cy="130" r="2" />
                <circle cx="130" cy="150" r="2" />

                {/* South America */}
                <circle cx="220" cy="250" r="2" />
                <circle cx="240" cy="270" r="2" />
                <circle cx="210" cy="230" r="2" />
                <circle cx="230" cy="290" r="2" />
                <circle cx="250" cy="260" r="2" />
                <circle cx="225" cy="310" r="2" />

                {/* Europe */}
                <circle cx="400" cy="90" r="2" />
                <circle cx="420" cy="80" r="2" />
                <circle cx="380" cy="100" r="2" />
                <circle cx="410" cy="110" r="2" />
                <circle cx="430" cy="95" r="2" />
                <circle cx="390" cy="85" r="2" />

                {/* Africa */}
                <circle cx="400" cy="200" r="2" />
                <circle cx="420" cy="220" r="2" />
                <circle cx="380" cy="180" r="2" />
                <circle cx="440" cy="240" r="2" />
                <circle cx="410" cy="260" r="2" />
                <circle cx="430" cy="190" r="2" />
                <circle cx="390" cy="210" r="2" />
                <circle cx="450" cy="280" r="2" />

                {/* Asia */}
                <circle cx="550" cy="100" r="2" />
                <circle cx="580" cy="120" r="2" />
                <circle cx="600" cy="90" r="2" />
                <circle cx="530" cy="130" r="2" />
                <circle cx="570" cy="150" r="2" />
                <circle cx="620" cy="110" r="2" />
                <circle cx="500" cy="110" r="2" />
                <circle cx="650" cy="130" r="2" />
                <circle cx="590" cy="170" r="2" />

                {/* Australia */}
                <circle cx="650" cy="300" r="2" />
                <circle cx="670" cy="310" r="2" />
                <circle cx="630" cy="290" r="2" />
                <circle cx="660" cy="280" r="2" />
                <circle cx="680" cy="320" r="2" />

                {/* Connecting Lines for "Network" feel */}
                <motion.path
                    d="M150 100 L400 90 L550 100"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    className="opacity-20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M400 200 L220 250"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    className="opacity-20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.path
                    d="M590 170 L650 300"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    className="opacity-20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}
