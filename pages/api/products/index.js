import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if cookies are needed
  
  if (req.method === 'POST') {
    const { images, categoryId, datasheet, brochure, translations } = req.body;

    // Validate inputs
    if (!categoryId || !translations || !Array.isArray(translations) || translations.length !== 3) {
      return res.status(400).json({
        message: 'Catégorie et trois traductions (Anglais, Français, Arabe) sont requis',
      });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: 'Au moins une image est requise' });
    }

    for (const t of translations) {
      if (!t.locale || !t.name || !t.specifications || !t.configurations) {
        return res.status(400).json({
          message: 'Chaque traduction doit avoir un locale, un nom, des spécifications et des configurations',
        });
      }
      if (!Array.isArray(t.highlights) || t.highlights.some((h) => typeof h !== 'string' || !h.trim())) {
        return res.status(400).json({
          message: 'Tous les points forts doivent être des chaînes non vides',
        });
      }
    }

    try {
      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) {
        return res.status(400).json({ message: 'Catégorie invalide' });
      }

      const product = await prisma.product.create({
        data: {
          images,
          categoryId,
          datasheet: datasheet || null,
          brochure: brochure || null,
          translations: {
            create: translations.map((t) => ({
              locale: t.locale,
              name: t.name,
              specifications: t.specifications,
              configurations: t.configurations,
              highlights: t.highlights, // Store directly as array of strings
            })),
          },
        },
        include: {
          translations: true,
          category: { include: { translations: true } },
        },
      });

      return res.status(201).json({ message: 'Produit créé avec succès', product });
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        include: {
          translations: true,
          category: { include: { translations: true } },
        },
      });
      return res.status(200).json({ products });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}