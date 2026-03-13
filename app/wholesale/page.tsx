"use client";

import { motion } from "motion/react";

export default function WholesalePage() {
    return (
        <main className="min-h-screen pt-48 pb-24 px-6 md:px-12 bg-white text-black relative z-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[60vh]">
                <div className="flex flex-col justify-center">
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase"
                    >
                        Partner<br />With Us
                    </motion.h1>
                    <motion.p
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-neutral-600 font-medium max-w-lg mb-8"
                    >
                        Bring Fore coffee to your cafe, restaurant, or office. We offer comprehensive wholesale programs including equipment, training, and support.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="mailto:wholesale@fore.coffee" className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors">
                            Get in Touch
                        </a>
                    </motion.div>

                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="bg-neutral-100 rounded-3xl overflow-hidden relative"
                >
                    {/* Abstract graphic or image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-9xl text-neutral-200 font-black opacity-50 rotate-[-15deg]">WHOLE<br />SALE</div>
                    </div>
                </motion.div>
            </div>

            <section className="mt-32">
                <h2 className="text-4xl font-bold mb-12 border-b-2 border-black pb-4">Why Partner With Fore?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Training & Education</h3>
                        <p className="text-neutral-600">We provide extensive barista training to ensure your team serves the perfect cup every time.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Equipment Sourcing</h3>
                        <p className="text-neutral-600">We help you select and source the best machinery for your specific needs and budget.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Dedicated Support</h3>
                        <p className="text-neutral-600">Our team is always available to assist with technical issues, ordering, and consulting.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
