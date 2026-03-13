"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { IoClose, IoAdd, IoRemove } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, total } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        closeCart();
        router.push("/checkout");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#111] border-l border-white/10 z-[70] p-6 flex flex-col shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                            <h2 className="text-2xl font-bold uppercase tracking-wide">Your Order</h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col justify-center items-center text-white/50 gap-4">
                                <p>Your cart is empty.</p>
                                <button
                                    onClick={closeCart}
                                    className="text-white underline hover:no-underline"
                                >
                                    Browse Menu
                                </button>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="w-20 h-20 bg-neutral-800 rounded-xl overflow-hidden flex-shrink-0">
                                            {/* Using generic coffee image if real one fails or placeholders */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-red-400 transition-colors"
                                                    >
                                                        <IoRemove size={14} />
                                                    </button>
                                                    <span className="text-sm w-4 text-center font-mono">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-green-400 transition-colors"
                                                    >
                                                        <IoAdd size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {items.length > 0 && (
                            <div className="border-t border-white/10 pt-6 mt-6">
                                <div className="flex justify-between items-center mb-6 text-xl">
                                    <span>Total</span>
                                    <span className="font-mono font-bold">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
