// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete existing products (so you can re‑run seed safely)
  await prisma.product.deleteMany();

  // Create some sample products
  const items = [
    {
      name: "Cool T‑Shirt",
      description: "Comfortable 100% cotton tee",
      price: 19.99,
      imageUrl: "/images/tshirt.jpg"
    },
    {
      name: "Stylish Hat",
      description: "One‑size‑fits‑all baseball cap",
      price: 14.99,
      imageUrl: "/images/hat.jpg"
    },
    {
      name: "Comfy Hoodie",
      description: "Cozy fleece‑lined hoodie",
      price: 39.99,
      imageUrl: "/images/hoodie.jpg"
    }
  ];

  for (const item of items) {
    await prisma.product.create({ data: item });
    console.log(`Created product: ${item.name}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
