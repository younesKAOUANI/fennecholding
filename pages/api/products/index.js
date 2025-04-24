import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { images, categoryId, datasheet, brochure, translations } = req.body;

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
    if (t.highlights.some((h) => !h.title || !h.description)) {
      return res.status(400).json({
        message: 'Tous les points forts doivent avoir un titre et une description',
      });
    }
  }

  try {
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
            highlights: JSON.stringify(t.highlights),
          })),
        },
      },
    });

    return res.status(201).json({ message: 'Produit créé avec succès', product });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  } finally {
    await prisma.$disconnect();
  }
}