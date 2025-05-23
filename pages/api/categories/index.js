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
  
  const { method } = req;
  const { id } = req.query; // For GET by ID, PATCH, DELETE

  switch (method) {
    case 'GET':
      try {
        if (id) {
          // GET by ID
          const category = await prisma.category.findUnique({
            where: { id },
            include: {
              translations: true,
              products: { include: { translations: true } },
            },
          });
          if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }
          return res.status(200).json(category);
        } else {
          // GET all categories
          const categories = await prisma.category.findMany({
            include: {
              translations: true,
              products: { include: { translations: true } },
            },
          });
          return res.status(200).json(categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      try {
        const { translations } = req.body;

        // Validation: Ensure translations are provided
        if (!translations || !Array.isArray(translations) || translations.length === 0) {
          return res.status(400).json({ message: 'At least one translation is required' });
        }

        for (const t of translations) {
          if (!t.locale || !t.name) {
            return res.status(400).json({ message: 'Each translation must have a locale and name' });
          }
        }

        // Create category without img
        const category = await prisma.category.create({
          data: {
            translations: {
              create: translations.map((t) => ({
                locale: t.locale,
                name: t.name,
              })),
            },
          },
        });
        return res.status(201).json({ message: 'Category created successfully', category });
      } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PATCH':
      try {
        if (!id) {
          return res.status(400).json({ message: 'Category ID is required' });
        }

        const { translations } = req.body;

        // Validation: Ensure translations are provided and valid
        if (!translations || !Array.isArray(translations)) {
          return res.status(400).json({ message: 'Translations must be provided as an array' });
        }

        for (const t of translations) {
          if (!t.locale || !t.name) {
            return res.status(400).json({ message: 'Each translation must have a locale and name' });
          }
        }

        // Update category translations (no img)
        await prisma.categoryTranslation.deleteMany({ where: { categoryId: id } });
        const updateData = {
          translations: {
            create: translations.map((t) => ({
              locale: t.locale,
              name: t.name,
            })),
          },
        };

        const category = await prisma.category.update({
          where: { id },
          data: updateData,
          include: { translations: true },
        });
        return res.status(200).json({ message: 'Category updated successfully', category });
      } catch (error) {
        console.error('Error updating category:', error);
        if (error.code === 'P2025') {
          return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ message: 'Category ID is required' });
        }

        // Check if category has associated products
        const productCount = await prisma.product.count({ where: { categoryId: id } });
        if (productCount > 0) {
          return res.status(400).json({ message: 'Cannot delete category with associated products' });
        }

        // Delete translations and category
        await prisma.categoryTranslation.deleteMany({ where: { categoryId: id } });
        await prisma.category.delete({ where: { id } });
        return res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        console.error('Error deleting category:', error);
        if (error.code === 'P2025') {
          return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}