"use client";

import { motion } from "motion/react";
import Image from "next/image";

const posts = [
    {
        title: "Brewing Guide: V60",
        excerpt: "Master the pour-over technique for a clean, aromatic cup.",
        date: "Oct 12, 2023",
        category: "Guides",
        image: "/biji kopi.png"
    },
    {
        title: "Origin Trip: Ethiopia",
        excerpt: "A look into our recent visit to the Yirgacheffe region.",
        date: "Sep 28, 2023",
        category: "Travel",
        image: "/roastery.png"
    },
    {
        title: "The Art of Espresso",
        excerpt: "Understanding variable pressure and temperature profiling.",
        date: "Sep 15, 2023",
        category: "Knowledge",
        image: "/freshly-roasted-coffee-beans-bur.png"
    },
    {
        title: "Summer Drink Recipes",
        excerpt: "Refreshing cold brew cocktails for the warmer months.",
        date: "Aug 30, 2023",
        category: "Recipes",
        image: "/roasted-coffee-beans-in-burlap-s.png"
    }
];

export default function JournalPage() {
    return (
        <main className="min-h-screen pt-48 pb-32 px-6 md:px-12 bg-white text-black relative z-0">
            <section className="mb-24 flex md:flex-row flex-col justify-between md:items-end border-b border-black pb-8">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-[10rem] leading-[0.85] font-bold tracking-tighter"
                >
                    The <br /> Journal
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl max-w-xs mt-8 md:mt-0 font-medium"
                >
                    Stories, guides, and updates from the world of Fore Coffee.
                </motion.p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {posts.map((post, i) => (
                    <motion.article
                        key={post.title}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                        className="group cursor-pointer flex flex-col h-full"
                    >
                        <div className="aspect-square bg-neutral-200 mb-6 w-full overflow-hidden relative">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-widest font-bold text-neutral-500">
                            <span>{post.category}</span>
                            <span>{post.date}</span>
                        </div>

                        <h3 className="text-3xl font-bold mb-3 group-hover:underline decoration-2 underline-offset-4 leading-tight">{post.title}</h3>
                        <p className="text-neutral-600 text-lg leading-relaxed">{post.excerpt}</p>
                    </motion.article>
                ))}
            </section>
        </main>
    );
}
