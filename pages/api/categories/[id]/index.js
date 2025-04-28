import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if cookies are needed

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { id } = req.query;

  if (req.method === 'GET') {
    // Retrieve a category by id (including its products)
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: { products: true },
      });
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving category' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a category by id
    try {
      await prisma.category.delete({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error deleting category' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}