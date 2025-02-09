import Banner from '@/components/main/Banner'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { LuCircleArrowRight } from 'react-icons/lu'
import Slider from 'react-slick'

export default function Index() {
  const [allCategories, setAllCategories] = useState([])
  const [visibleCategories, setVisibleCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const newData = await response.json()
      setAllCategories(newData)
      setVisibleCategories(newData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSelectCategory = (selectedCategory) => {
    if (selectedCategory) {
      setVisibleCategories(
        allCategories.filter((cat) => cat.id === selectedCategory.id)
      )
    } else {
      setVisibleCategories(allCategories)
    }
  }

  return (
    <main className='!pt-24 bg-white'>
      <Banner
        title='Nos Produits'
        backgroundImage='https://placehold.co/1080x600.png'
      />
      <div className='section grid grid-cols-4 gap-8'>
        <Filter
          categories={allCategories.filter(
            (cat) =>
              Array.isArray(cat.products) && cat.products.length > 0
          )}
          onSelectCategory={handleSelectCategory}
        />
        <div className='col-span-3'>
          {visibleCategories && visibleCategories.length > 0 ? (
            visibleCategories.map(
              (category) =>
                Array.isArray(category.products) &&
                category.products.length > 0 && (
                  <CategorySection key={category.id} category={category} />
                )
            )
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <CategorySectionSkeleton key={`skeleton-${index}`} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

const CategorySection = ({ category }) => {
  const slidesToShowDesktop = 4
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShowDesktop,
    slidesToScroll: slidesToShowDesktop,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const products = category.products
  const numPlaceholders =
    products.length < slidesToShowDesktop
      ? slidesToShowDesktop - products.length
      : 0
  const slides = [...products, ...Array(numPlaceholders).fill(null)]

  return (
    <div className="bg-white mb-8">
      <h2 className="text-xl font-medium px-4 py-2 mb-6">{category.name}</h2>
      <Slider {...settings}>
        {slides.map((product, index) => {
          if (!product) {
            return (
              <div key={`placeholder-${index}`} className="px-2">
                <div className="h-full invisible">
                </div>
              </div>
            )
          }
          return (
            <div key={product.id} className="px-2">
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-95 transition-transform">
                <Image
                  src={product?.img[0]}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full aspect-video object-cover"
                />
                <div className="flex items-center p-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="mx-auto text-md font-medium px-4 py-2 hover:bg-primary hover:text-white rounded-full flex items-center gap-4"
                  >
                    {product.name}
                    <LuCircleArrowRight className="text-2xl" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}


const Filter = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    onSelectCategory(category)
  }

  const clearFilter = () => {
    setSelectedCategory(null)
    onSelectCategory(null)
  }

  return (
    <div className="col-span-1 flex flex-col items-start mt-4">
      <h3 className="text-xl font-semibold mb-4">Filter par Catégorie</h3>
      <ul className="w-full">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category.id}
              className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedCategory && selectedCategory.id === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </li>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <li
              key={`skeleton-${index}`}
              className="py-2 px-4 mb-2 rounded bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse"
            >
              &nbsp;
            </li>
          ))
        )}
      </ul>
      {selectedCategory && (
        <button
          onClick={clearFilter}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Réinitialiser
        </button>
      )}
    </div>
  )
}


const CategorySectionSkeleton = () => {
  return (
    <div className="mb-6">
      <div className='mb-6 w-80 h-12 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md'></div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-gradient-to-r w-full h-48 from-gray-100 to-gray-200 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    </div>
  )
}

