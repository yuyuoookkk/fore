"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        confirmEmail: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Security: Email Validation
        if (formData.email !== formData.confirmEmail) {
            alert("Emails do not match!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerEmail: formData.email,
                    items: items.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                }),
            });

            if (res.ok) {
                const order = await res.json();
                clearCart();
                router.push(`/payment/${order.id}`);
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20 px-6">
                <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <Link href="/menu" className="text-neutral-600 hover:text-black underline">
                        Return to Menu
                    </Link>
                </div>
            </main>
        );

    }

    return (
        <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
                >
                    <IoChevronBack />
                    Back to Menu
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Order Summary</h2>
                        <div className="bg-neutral-50 rounded-2xl p-6 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="border-t border-neutral-200 pt-4 mt-4 flex justify-between items-center text-xl font-bold">
                                <span>Total</span>
                                <span className="font-mono">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Customer Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm uppercase tracking-wider text-neutral-500 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm uppercase tracking-wider text-neutral-500 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm uppercase tracking-wider text-neutral-500 mb-2">
                                    Confirm Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.confirmEmail}
                                    onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </main>
    );
}
