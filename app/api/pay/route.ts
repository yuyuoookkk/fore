import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, paymentMethod } = body;

        if (!orderId) {
            return NextResponse.json(
                { error: "Missing order ID" },
                { status: 400 }
            );
        }

        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Update order status
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "completed",
                paymentMethod: paymentMethod || "unknown"
            },
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Payment error:", error);
        return NextResponse.json(
            { error: `Payment failed: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}
