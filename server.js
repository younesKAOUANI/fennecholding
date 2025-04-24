const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Delete all records from non-NextAuth models
    await prisma.category.deleteMany({});
    await prisma.categoryTranslation.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.productTranslation.deleteMany({});

    console.log("Successfully cleared Category, CategoryTranslation, Product, and ProductTranslation collections.");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();