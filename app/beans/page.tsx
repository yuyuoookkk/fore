"use client";

import { motion } from "motion/react";
import Image from "next/image";

const beans = [
    {
        name: "Ethiopia Yirgacheffe",
        process: "Washed",
        notes: "Jasmine, Lemon, Peach",
        price: "$24.00",
        image: "/freshly-roasted-coffee-beans-bur.png"
    },
    {
        name: "Colombia Huila",
        process: "Natural",
        notes: "Caramel, Red Apple, Citrus",
        price: "$22.00",
        image: "/biji kopi.png"
    },
    {
        name: "Kenya AA",
        process: "Washed",
        notes: "Black Currant, Tomato, Grapefruit",
        price: "$26.00",
        image: "/roasted-coffee-beans-in-burlap-s.png"
    }
];

export default function BeansPage() {
    return (
        <main className="min-h-screen pt-48 pb-24 px-6 md:px-12 bg-neutral-50 text-neutral-900 relative z-0">
            <section className="mb-24">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-8"
                >
                    Our Beans
                </motion.h1>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="text-xl md:text-2xl leading-relaxed text-neutral-600"
                    >
                        Sourced from the world's most renowned coffee-growing regions. We meticulously select beans that offer unique flavor profiles and exceptional quality.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative h-[400px] w-full rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/biji kopi.png"
                            alt="Fresh coffee beans"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {beans.map((bean, i) => (
                    <motion.div
                        key={bean.name}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                        className="group cursor-pointer"
                    >
                        <div className="aspect-[4/5] bg-neutral-200 mb-6 overflow-hidden relative rounded-xl">
                            <Image
                                src={bean.image}
                                alt={bean.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:underline decoration-1 underline-offset-4">{bean.name}</h3>
                        <p className="text-neutral-500 mb-1">{bean.process}</p>
                        <p className="text-sm font-medium mb-4">{bean.notes}</p>
                        <p className="text-lg font-semibold">{bean.price}</p>
                    </motion.div>
                ))}
            </section>
        </main>
    );
}
