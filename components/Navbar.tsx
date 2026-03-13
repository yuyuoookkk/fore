"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoArrowUpRight } from "react-icons/go";
import { IoBagHandle } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

const links = [
    { label: "Our Beans", href: "/beans" },
    { label: "The Roastery", href: "/roastery" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Journal", href: "/journal" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { openCart, count } = useCart();

    // Toggle body scroll
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white">
                <a href="/" className="text-2xl font-bold tracking-tighter uppercase z-50 relative">
                    Fore
                </a>

                <div className="flex items-center gap-6 z-50 relative">
                    <a href="/menu" className="hidden md:block uppercase tracking-wide text-sm font-medium hover:underline">
                        Order Online
                    </a>

                    <button
                        onClick={openCart}
                        className="relative group flex items-center gap-2 uppercase tracking-wide text-sm font-medium"
                    >
                        <IoBagHandle size={20} />
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {count}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="group flex items-center gap-2 uppercase tracking-wide text-sm font-medium"
                    >
                        <span className="relative overflow-hidden h-5 inline-block">
                            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                                {isOpen ? "Close" : "Menu"}
                            </span>
                            <span className="absolute top-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                {isOpen ? "Close" : "Menu"}
                            </span>
                        </span>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-white text-black z-40 flex flex-col justify-between p-6 md:p-12 pb-24"
                    >
                        <div className="flex-1 flex flex-col justify-center items-center gap-4">
                            {links.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 100, opacity: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                                    className="text-5xl md:text-8xl font-bold tracking-tighter hover:italic hover:text-neutral-500 transition-colors cursor-pointer group flex items-center gap-4"
                                >
                                    <span>{link.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl md:text-4xl"><GoArrowUpRight /></span>
                                </motion.a>
                            ))}

                            <motion.a
                                href="/admin"
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                                className="text-2xl md:text-4xl font-bold tracking-tighter hover:italic text-white/50 hover:text-white transition-colors cursor-pointer group flex items-center gap-4 mt-4"
                            >
                                <span>Admin</span>
                            </motion.a>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="flex justify-between items-end border-t border-black/10 pt-8"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="uppercase text-xs opacity-50">Contact</p>
                                <a href="mailto:hello@fore.coffee" className="hover:underline">hello@fore.coffee</a>
                                <a href="tel:+1234567890" className="hover:underline">+1 (234) 567 890</a>
                            </div>
                            <div className="flex gap-4">
                                <a href="#" className="uppercase text-xs hover:underline">Instagram</a>
                                <a href="#" className="uppercase text-xs hover:underline">Twitter</a>
                                <a href="#" className="uppercase text-xs hover:underline">LinkedIn</a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
