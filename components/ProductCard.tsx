"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "motion/react";
import { IoAdd } from "react-icons/io5";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-neutral-50 rounded-2xl overflow-hidden hover:bg-neutral-100 transition-colors"
        >
            <div className="aspect-square overflow-hidden bg-neutral-800 relative">
                {/* Placeholder or actual image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Add Button */}
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-200"
                >
                    <IoAdd size={24} />
                </button>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium text-neutral-900">{product.name}</h3>
                    <span className="font-mono text-neutral-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                </p>
            </div>
        </motion.div>
    );
}
