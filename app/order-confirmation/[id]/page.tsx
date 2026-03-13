"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoCheckmarkCircle, IoCash, IoTime } from "react-icons/io5";

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        params.then((resolvedParams) => {
            setOrderId(resolvedParams.id);
        });
    }, [params]);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20 px-6 flex items-center justify-center">
                <div className="animate-pulse">Loading order details...</div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20 px-6 flex items-center justify-center">
                <p>Order not found</p>
            </main>
        );
    }

    const isCash = order.paymentMethod === "cash";

    return (
        <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20">
            <div className="max-w-xl mx-auto px-6 text-center">
                <div className="flex justify-center mb-8">
                    {isCash ? (
                        <div className="bg-yellow-100 p-6 rounded-full">
                            <IoCash className="text-yellow-600 text-6xl" />
                        </div>
                    ) : (
                        <IoCheckmarkCircle className="text-green-500 text-8xl" />
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                    {isCash ? "Order Placed!" : "Order Confirmed!"}
                </h1>

                <p className="text-neutral-600 text-lg mb-8">
                    {isCash
                        ? "Please proceed to the counter to complete your payment."
                        : "Thank you for your order. We are preparing your coffee with care."}
                </p>

                <div className="bg-neutral-50 rounded-2xl p-8 mb-12 border border-neutral-200 text-left">
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-neutral-200 pb-4">
                            <span className="text-neutral-500 uppercase text-sm tracking-wider">Order ID</span>
                            <span className="font-mono font-medium">{order.id}</span>
                        </div>

                        <div className="flex justify-between border-b border-neutral-200 pb-4">
                            <span className="text-neutral-500 uppercase text-sm tracking-wider">Customer</span>
                            <span className="font-medium">{order.customerName}</span>
                        </div>

                        <div className="flex justify-between border-b border-neutral-200 pb-4">
                            <span className="text-neutral-500 uppercase text-sm tracking-wider">Date</span>
                            <span className="font-medium">
                                {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <div className="flex justify-between pt-2">
                            <span className="text-neutral-500 uppercase text-sm tracking-wider">Total Amount</span>
                            <span className="font-mono font-bold text-xl">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <Link
                    href="/menu"
                    className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </main>
    );
}
