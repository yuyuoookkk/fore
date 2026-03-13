"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoChevronBack, IoCard, IoWallet, IoCash } from "react-icons/io5";


export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

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
                } else {
                    console.error("Failed to fetch order");
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handlePayment = async () => {
        setProcessing(true);
        try {
            const res = await fetch("/api/pay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId, paymentMethod: selectedPaymentMethod }),
            });

            if (res.ok) {
                if (selectedPaymentMethod === "cash") {
                    router.push(`/cash-order-confirmation/${orderId}`);
                } else {
                    router.push(`/order-confirmation/${orderId}`);
                }
            } else {
                const data = await res.json();
                alert(data.error || "Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20 px-6 flex items-center justify-center">
                <div className="animate-pulse">Loading payment details...</div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20 px-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Order not found</h1>
                <Link href="/menu" className="underline hover:text-black">
                    Return to Menu
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-neutral-900 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link
                    href={`/checkout`} // Ideally back to checkout if possible, or menu
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
                >
                    <IoChevronBack />
                    Back to Menu
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Payment</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Order Summary</h2>
                        <div className="bg-neutral-50 rounded-2xl p-6 space-y-4 border border-neutral-200">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="border-t border-neutral-200 pt-4 mt-4 flex justify-between items-center text-xl font-bold">
                                <span>Total</span>
                                <span className="font-mono">${order.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-8 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                            <h3 className="font-bold mb-2">Customer Info</h3>
                            <p className="text-neutral-600">{order.customerName}</p>
                            <p className="text-neutral-600">{order.customerEmail}</p>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Select Payment Method</h2>

                        <div className="space-y-4 mb-8">
                            <button
                                onClick={() => setSelectedPaymentMethod("credit_card")}
                                className={`w-full bg-neutral-50 border ${selectedPaymentMethod === "credit_card" ? "border-black ring-1 ring-black" : "border-neutral-200"
                                    } hover:border-black rounded-xl p-4 flex items-center gap-4 transition-all text-left group`}
                            >
                                <div className="p-3 bg-white border border-neutral-200 rounded-lg group-hover:bg-neutral-100 transition-colors">
                                    <IoCard className="text-2xl" />
                                </div>
                                <div>
                                    <p className="font-bold">Credit Card</p>
                                    <p className="text-sm text-neutral-500">Visa, Mastercard, Amex</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setSelectedPaymentMethod("digital_wallet")}
                                className={`w-full bg-neutral-50 border ${selectedPaymentMethod === "digital_wallet" ? "border-black ring-1 ring-black" : "border-neutral-200"
                                    } hover:border-black rounded-xl p-4 flex items-center gap-4 transition-all text-left group`}
                            >
                                <div className="p-3 bg-white border border-neutral-200 rounded-lg group-hover:bg-neutral-100 transition-colors">
                                    <IoWallet className="text-2xl" />
                                </div>
                                <div>
                                    <p className="font-bold">Digital Wallet</p>
                                    <p className="text-sm text-neutral-500">Apple Pay, Google Pay</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setSelectedPaymentMethod("cash")}
                                className={`w-full bg-neutral-50 border ${selectedPaymentMethod === "cash" ? "border-black ring-1 ring-black" : "border-neutral-200"
                                    } hover:border-black rounded-xl p-4 flex items-center gap-4 transition-all text-left group`}
                            >
                                <div className="p-3 bg-white border border-neutral-200 rounded-lg group-hover:bg-neutral-100 transition-colors">
                                    <IoCash className="text-2xl" />
                                </div>
                                <div>
                                    <p className="font-bold">Cash</p>
                                    <p className="text-sm text-neutral-500">Pay at counter</p>
                                </div>
                            </button>


                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={processing || !selectedPaymentMethod}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>Processing...</>
                            ) : (
                                <>Pay ${order.total.toFixed(2)}</>
                            )}
                        </button>

                        <p className="text-center text-neutral-400 text-xs mt-4">
                            This is a secure 256-bit SSL encrypted payment.
                        </p>
                    </div>
                </div>
            </div>


        </main>
    );
}
