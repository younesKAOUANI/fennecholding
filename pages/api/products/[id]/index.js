import { PrismaClient } from "@prisma/client";
import { deleteFile } from "@/ftp/ftpService"; // adjust the import as needed

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  // Validate ID
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    switch (req.method) {
      case "GET":
        await handleGetProduct(req, res, id);
        break;
      case "PUT":
        await handleUpdateProduct(req, res, id);
        break;
      case "DELETE":
        await handleDeleteProduct(req, res, id);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling product request:", error);
    res.status(500).json({
      error: "Failed to process product request",
      details: error.message,
    });
  }
}

// Handler for fetching a single product by ID
async function handleGetProduct(req, res, id) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        highlights: true,
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      error: "Failed to fetch product",
      details: error.message,
    });
  }
}

// Handler for updating a product (with file cleanup)
async function handleUpdateProduct(req, res, id) {
  try {
    const {
      name,
      img, // new images: an array of URLs (e.g. those returned after deferred uploads)
      specification,
      configurations,
      categoryId,
      highlights,
      datasheet, // new datasheet URL (if changed)
      brochure, // new brochure URL (if changed)
    } = req.body;

    // Validate required fields
    if (!name || !categoryId) {
      return res
        .status(400)
        .json({ error: "Name and Category are required" });
    }

    // Fetch the current product (with file URLs)
    const currentProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (!currentProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // --- File Cleanup Logic ---

    // For images (assumed to be an array of URLs):
    if (currentProduct.img && Array.isArray(currentProduct.img)) {
      // Delete any image that is no longer included in the updated array
      const filesToDelete = currentProduct.img.filter(
        (url) => !img.includes(url)
      );
      await Promise.all(
        filesToDelete.map((url) =>
          deleteFile(url).catch((e) =>
            console.error("Failed to delete image:", url, e)
          )
        )
      );
    }

    // For datasheet: if the old datasheet exists and is different than the new value, delete it.
    if (currentProduct.datasheet && currentProduct.datasheet !== datasheet) {
      await deleteFile(currentProduct.datasheet).catch((e) =>
        console.error("Failed to delete datasheet:", e)
      );
    }

    // For brochure: likewise, if changed, delete the old one.
    if (currentProduct.brochure && currentProduct.brochure !== brochure) {
      await deleteFile(currentProduct.brochure).catch((e) =>
        console.error("Failed to delete brochure:", e)
      );
    }

    // --- Update the product record (including nested highlights) ---
    const updatedProduct = await prisma.$transaction(async (prisma) => {
      // Delete existing highlights first
      await prisma.highlight.deleteMany({
        where: { productId: id },
      });

      // Update the product
      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          img,
          specification,
          configurations,
          categoryId,
          highlights: {
            create: highlights.map((highlight) => ({
              title: highlight.title,
              description: highlight.description,
            })),
          },
          datasheet,
          brochure,
        },
        include: {
          highlights: true,
        },
      });
      return product;
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      error: "Failed to update product",
      details: error.message,
    });
  }
}

// Handler for deleting a product (with file cleanup)
async function handleDeleteProduct(req, res, id) {
  try {
    // First, fetch the product so we know which files to delete.
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete associated files from FTP:
    const deletionPromises = [];
    if (product.img && Array.isArray(product.img)) {
      deletionPromises.push(
        ...product.img.map((url) =>
          deleteFile(url).catch((e) =>
            console.error("Failed to delete image:", url, e)
          )
        )
      );
    }
    if (product.datasheet) {
      deletionPromises.push(
        deleteFile(product.datasheet).catch((e) =>
          console.error("Failed to delete datasheet:", e)
        )
      );
    }
    if (product.brochure) {
      deletionPromises.push(
        deleteFile(product.brochure).catch((e) =>
          console.error("Failed to delete brochure:", e)
        )
      );
    }
    await Promise.all(deletionPromises);

    // Use a transaction to delete associated highlights and the product itself.
    const deletedProduct = await prisma.$transaction(async (prisma) => {
      await prisma.highlight.deleteMany({
        where: { productId: id },
      });
      const productDeleted = await prisma.product.delete({
        where: { id },
      });
      return productDeleted;
    });

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({
      error: "Failed to delete product",
      details: error.message,
    });
  }
}
