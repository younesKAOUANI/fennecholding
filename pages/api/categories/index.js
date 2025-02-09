// pages/api/categories/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
   try {
    // Fetch all categories
    const categories = await prisma.category.findMany();

    // Fetch all products and group them by categoryId
    const products = await prisma.product.findMany({
      select: { id: true, name: true, img: true, categoryId: true },
    });

    // Create a map of products grouped by categoryId
    const productsByCategory = {};
    products.forEach((product) => {
      if (!productsByCategory[product.categoryId]) {
        productsByCategory[product.categoryId] = [];
      }
      productsByCategory[product.categoryId].push(product);
    });

    // Attach products to corresponding categories
    const categoriesWithProducts = categories.map((category) => ({
      ...category,
      products: productsByCategory[category.id] || [],
    }));

    return res.json(categoriesWithProducts);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.json({ error: "Failed to fetch categories" }, { status: 500 });
  }

  } else if (req.method === 'POST') {
    const { name, img } = req.body;

    try {
      const category = await prisma.category.create({
        data: {
          name,
          img,
        },
      });
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating category' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
