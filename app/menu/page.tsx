"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
};

export default function MenuPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts =
        filter === "all"
            ? products
            : products.filter((p) => p.category === filter);

    const categories = ["all", "espresso", "cold", "specialty"];

    return (
        <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                        Our Menu
                    </h1>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Experience our carefully curated selection of coffee, from classic
                        espresso to signature cold brews.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-16 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border transition-all uppercase text-sm tracking-wide ${filter === cat
                                ? "bg-black text-white border-black"
                                : "bg-transparent text-neutral-600 border-neutral-200 hover:border-neutral-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="aspect-[3/4] bg-neutral-900 animate-pulse rounded-2xl"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

        </main>
    );
}
