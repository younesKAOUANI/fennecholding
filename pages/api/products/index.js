import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handlePostProduct(req, res)
  } else if (req.method === 'GET') {
    await handleGetProducts(req, res)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// Handler for creating a new product
async function handlePostProduct(req, res) {
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

    // Create product with nested highlights
    const newProduct = await prisma.product.create({
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

    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ 
      error: 'Failed to create product', 
      details: error.message 
    })
  }
}

// Handler for fetching products
async function handleGetProducts(req, res) {
  try {
    // Extract query parameters
    const { 
      page = 1, 
      limit = 10, 
      categoryId,
      search 
    } = req.query

    // Convert page and limit to numbers
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)

    // Build where condition
    const where = {}
    if (categoryId) {
      where.categoryId = categoryId
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { specification: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Fetch products with pagination and optional filtering
    const products = await prisma.product.findMany({
      where,
      include: {
        highlights: true,
        category: true
      },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get total count for pagination
    const totalProducts = await prisma.product.count({ where })

    res.status(200).json({
      products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ 
      error: 'Failed to fetch products', 
      details: error.message 
    })
  }
}