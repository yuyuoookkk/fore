import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

import { z } from "zod";

const orderSchema = z.object({
    customerName: z.string().min(1, "Name is required"),
    customerEmail: z.string().email("Invalid email address"),
    items: z.array(z.any()).min(1, "Order must contain items"),
});

// Create a new order
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request body
        const result = orderSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { customerName, customerEmail, items } = result.data;

        // Calculate total and verify products exist
        let total = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                return NextResponse.json(
                    { error: `Product with ID ${item.productId} not found` },
                    { status: 400 }
                );
            }

            total += product.price * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price, // Store price a
            });
        }

        // Create order with items in a transaction
        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                total,
                status: "pending",
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}

// Get all orders (Admin view)
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
