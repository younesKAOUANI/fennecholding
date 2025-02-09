// pages/api/categories/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
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
  } else if (req.method === 'PUT') {
    // Update a category by id
    const { name, img } = req.body;
    try {
      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name, img },
      });
      return res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating category' });
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
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
