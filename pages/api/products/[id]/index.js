import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          translations: true,
          category: { include: { translations: true } },
        },
      });
      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
      // Parse highlights from JSON string
      const parsedProduct = {
        ...product,
        translations: product.translations.map((t) => ({
          ...t,
          highlights: JSON.parse(t.highlights || '[]'),
        })),
      };
      return res.status(200).json({ product: parsedProduct });
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else if (req.method === 'PUT') {
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
      if (!Array.isArray(t.highlights) || t.highlights.some((h) => !h.title || !h.description)) {
        return res.status(400).json({
          message: 'Tous les points forts doivent avoir un titre et une description',
        });
      }
    }

    try {
      // Verify category exists
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(400).json({ message: 'Catégorie invalide' });
      }

      // Update product
      const product = await prisma.product.update({
        where: { id },
        data: {
          images,
          categoryId,
          datasheet: datasheet || null,
          brochure: brochure || null,
          translations: {
            deleteMany: {}, // Delete existing translations
            create: translations.map((t) => ({
              locale: t.locale,
              name: t.name,
              specifications: t.specifications,
              configurations: t.configurations,
              highlights: JSON.stringify(t.highlights),
            })),
          },
        },
        include: {
          translations: true,
          category: { include: { translations: true } },
        },
      });

      // Parse highlights for response
      const parsedProduct = {
        ...product,
        translations: product.translations.map((t) => ({
          ...t,
          highlights: JSON.parse(t.highlights || '[]'),
        })),
      };

      return res.status(200).json({ message: 'Produit mis à jour avec succès', product: parsedProduct });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.product.delete({
        where: { id },
      });
      return res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}