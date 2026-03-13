"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { IoTrash, IoCheckmarkCircle, IoTime } from "react-icons/io5";

type OrderItem = {
    id: string;
    quantity: number;
    price: number;
    product: {
        name: string;
    };
};

type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
};

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setOrders(orders.filter((order) => order.id !== id));
            } else {
                alert("Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Error deleting order");
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders(
                    orders.map((order) =>
                        order.id === id ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating status");
        }
    };

    return (
        <main className="min-h-screen bg-[#020202] text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Order Dashboard
                    </h1>
                    <Link
                        href="/menu"
                        className="text-white/60 hover:text-white underline"
                    >
                        Back to Shop
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-neutral-900 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/10">
                        <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
                        <p className="text-white/50">Orders will appear here once placed.</p>
                    </div>
                ) : (
                    <div className="bg-[#111] rounded-3xl overflow-hidden border border-white/10">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Order ID</th>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Customer</th>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Date</th>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Status</th>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Total</th>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Items</th>
                                        <th className="p-6 font-bold uppercase text-sm tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6 font-mono text-sm text-white/70">
                                                {order.id.slice(0, 8)}...
                                            </td>
                                            <td className="p-6">
                                                <div className="font-medium">{order.customerName}</div>
                                                <div className="text-xs text-white/50">{order.customerEmail}</div>
                                            </td>
                                            <td className="p-6 text-sm text-white/70">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-6">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={`bg-transparent outline-none cursor-pointer text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 px-2 py-1 ${order.status === "completed"
                                                            ? "text-green-400 border-green-500/30 bg-green-500/10"
                                                            : order.status === "pending"
                                                                ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                                                                : "text-red-400 border-red-500/30 bg-red-500/10"
                                                        }`}
                                                >
                                                    <option value="pending" className="bg-[#111] text-yellow-400">Pending</option>
                                                    <option value="completed" className="bg-[#111] text-green-400">Completed</option>
                                                    <option value="cancelled" className="bg-[#111] text-red-400">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="p-6 font-mono font-bold">
                                                ${order.total.toFixed(2)}
                                            </td>
                                            <td className="p-6 text-sm text-white/70 max-w-xs">
                                                <ul className="list-disc list-inside">
                                                    {order.items.map((item) => (
                                                        <li key={item.id}>
                                                            {item.quantity}x {item.product.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="p-6">
                                                <button
                                                    onClick={() => handleDelete(order.id)}
                                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                                    title="Delete Order"
                                                >
                                                    <IoTrash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </main>
    );
}
