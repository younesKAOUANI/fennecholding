import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query

  // Validate ID
  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' })
  }

  try {
    switch (req.method) {
      case 'GET':
        await handleGetProduct(req, res, id)
        break
      case 'PUT':
        await handleUpdateProduct(req, res, id)
        break
      case 'DELETE':
        await handleDeleteProduct(req, res, id)
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('Error handling product request:', error)
    res.status(500).json({ 
      error: 'Failed to process product request', 
      details: error.message 
    })
  }
}

// Handler for fetching a single product by ID
async function handleGetProduct(req, res, id) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        highlights: true,
        category: true
      }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ 
      error: 'Failed to fetch product', 
      details: error.message 
    })
  }
}

// Handler for updating a product
async function handleUpdateProduct(req, res, id) {
  try {
    const { 
      name, 
      img, 
      specification, 
      configurations, 
      categoryId, 
      highlights, 
      datasheet, 
      brochure 
    } = req.body

    // Validate required fields
    if (!name || !categoryId) {
      return res.status(400).json({ error: 'Name and Category are required' })
    }

    // Update product with nested highlights
    const updatedProduct = await prisma.$transaction(async (prisma) => {
      // Delete existing highlights
      await prisma.highlight.deleteMany({
        where: { productId: id }
      })

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
            create: highlights.map(highlight => ({
              title: highlight.title,
              description: highlight.description
            }))
          },
          datasheet,
          brochure
        },
        include: {
          highlights: true
        }
      })

      return product
    })

    res.status(200).json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ 
      error: 'Failed to update product', 
      details: error.message 
    })
  }
}

// Handler for deleting a product
async function handleDeleteProduct(req, res, id) {
  try {
    // Use transaction to ensure consistency
    const deletedProduct = await prisma.$transaction(async (prisma) => {
      // First, delete associated highlights
      await prisma.highlight.deleteMany({
        where: { productId: id }
      })

      // Then delete the product
      const product = await prisma.product.delete({
        where: { id }
      })

      return product
    })

    res.status(200).json({ 
      message: 'Product deleted successfully',
      deletedProduct 
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    
    // Check if the product was not found
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(500).json({ 
      error: 'Failed to delete product', 
      details: error.message 
    })
  }
}