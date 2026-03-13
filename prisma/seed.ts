import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
    {
        name: "Americano",
        description: "Bold and clean espresso diluted with hot water. The classic choice.",
        price: 3.75,
        image: "/products/american-no.png",
        category: "espresso",
    },
    {
        name: "Butterscotch Sea Salt Latte",
        description: "Rich espresso with savory-sweet butterscotch and a hint of sea salt.",
        price: 5.25,
        image: "/products/butterscotch.png",
        category: "specialty",
    },
    {
        name: "Classic Latte",
        description: "Smooth espresso with steamed milk and a thin layer of foam.",
        price: 4.50,
        image: "/products/latte.png",
        category: "espresso",
    },
    {
        name: "Fore Aren Latte",
        description: "Our signature blend with premium Gula Aren sugar. Sweet and creamy.",
        price: 4.75,
        image: "/products/aren-latte.png",
        category: "specialty",
    },
    {
        name: "Cappuccino",
        description: "Equal parts espresso, steamed milk, and thick foam.",
        price: 4.50,
        image: "/products/cappuccino.png",
        category: "espresso",
    },
    {
        name: "Pandan Latte",
        description: "Aromatic pandan meets rich espresso. A local favorite.",
        price: 5.00,
        image: "/products/pandan-latte.png",
        category: "specialty",
    },
    {
        name: "Hibiscus Berry",
        description: "Refreshing hibiscus tea with mixed berries. Caffeine-free and fruity.",
        price: 4.50,
        image: "/products/hibiscus-berry.png",
        category: "cold",
    },
    {
        name: "Matcha Chizu",
        description: "Premium matcha topped with savory cheese foam cream.",
        price: 5.75,
        image: "/products/matcha-cream.png",
        category: "specialty",
    },
    {
        name: "Grand Matcha Latte",
        description: "Ceremonial grade matcha with fresh milk. Vibrant and earthy.",
        price: 5.50,
        image: "/products/grand-matcha.png",
        category: "specialty",
    },
    {
        name: "Triple Peach Americano",
        description: "Chilled espresso with peach syrup and orange juice.",
        price: 4.75,
        image: "/products/triple-peach-americano.png",
        category: "cold",
    },
    {
        name: "Nutty Oat Latte",
        description: "Rich espresso blended with creamy oat milk and nutty flavors.",
        price: 5.50,
        image: "/products/nutty-oat-latte.png",
        category: "specialty",
    },
    {
        name: "Buttercream Tiramisu Latte",
        description: "Decadent latte inspired by tiramisu with a buttercream finish.",
        price: 6.00,
        image: "/products/buttercream-tiramisu-latte.png",
        category: "specialty",
    },
];

async function main() {
    console.log("Seeding products...");

    // Clear existing products first
    // Clear existing data in correct order
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log(`Seeded ${products.length} products.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
