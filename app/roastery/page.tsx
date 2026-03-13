"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function RoasteryPage() {
    return (
        <main className="min-h-screen bg-white text-neutral-900 pt-48 pb-32 px-6 md:px-12 relative z-0">
            <section className="mb-32">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 text-neutral-900"
                >
                    The Roastery
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-neutral-900">Precision & Passion</h2>
                        <p className="text-xl leading-relaxed text-neutral-600">
                            Located in the heart of the city, our roastery is where science meets art. We believe that every bean has a story to tell, and our job is to bring that story to life through careful, precise roasting.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-neutral-900">Small Batch</h2>
                        <p className="text-xl leading-relaxed text-neutral-600">
                            We roast in small batches on a vintage Probat roaster, allowing us to monitor every second of the development process. This hands-on approach ensures consistency and quality in every cup.
                        </p>
                    </motion.div>
                </div>
            </section>

            <motion.section
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="w-full h-[60vh] bg-neutral-100 relative overflow-hidden"
            >
                <Image
                    src="/roastery.png"
                    alt="Coffee drying process"
                    fill
                    className="object-cover opacity-80"
                />
            </motion.section>
        </main>
    );
}
