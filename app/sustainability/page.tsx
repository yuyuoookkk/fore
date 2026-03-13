"use client";

import { motion } from "motion/react";

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen pt-48 pb-24 px-6 md:px-12 bg-[#F4F4F0] text-[#2D2D2D] relative z-0">
            <div className="max-w-6xl mx-auto">
                <section className="mb-24 flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="uppercase tracking-widest text-sm font-semibold mb-4 text-[#4A6741]"
                    >
                        Conscious Coffee
                    </motion.span>
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-bold tracking-tight mb-8"
                    >
                        Sustainability
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="text-xl md:text-3xl max-w-4xl leading-tight font-light"
                    >
                        We are committed to minimizing our environmental impact while maximizing our positive contribution to coffee communities.
                    </motion.p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-2xl"
                    >
                        <h3 className="text-3xl font-bold mb-4">Direct Trade</h3>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            We work directly with farmers to ensure they receive fair compensation for their hard work. By cutting out middlemen, we build lasting relationships and support sustainable farming practices.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-12 rounded-2xl"
                    >
                        <h3 className="text-3xl font-bold mb-4">Eco-Friendly Packaging</h3>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Our bags are 100% compostable, and our takeaway cups are made from recycled materials. We constantly strive to reduce waste in every aspect of our business.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
