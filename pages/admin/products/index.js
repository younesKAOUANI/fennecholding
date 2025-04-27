import DataTable from '@/components/main/DataTable'
import MobileDataTable from '@/components/main/MobileDataTable'
import Title from '@/components/main/Title'
import { productsTableView } from '@/data/products'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function Index() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const newData = await response.json()
      setData(newData.products || [])
      setFilteredData(newData.products || [])
      console.log(newData, 'newData')
    } catch (error) {
      console.error('Error fetching products:', error)
      setData([])
      setFilteredData([])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCategoryFilter = (selectedOption) => {
    if (!selectedOption) {
      setFilteredData(data)
    } else {
      const filtered = data.filter(
        (item) => item.categoryId === selectedOption.value
      )
      setFilteredData(filtered)
    }
  }

  return (
    <div>
      <Title title="Produits">
        <Link
          href="/admin/products/add"
          className="bg-blue-500 px-4 py-2 rounded-md text-white"
        >
          Ajouter un Produit
        </Link>
      </Title>
      <MobileDataTable
        data={filteredData}
        tableData={productsTableView(fetchData)}
        Filter={<Filter onFilterChange={handleCategoryFilter} />}
      />
    </div>
  )
}

const Filter = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`)
      }
      const newData = await response.json()
      setCategories(newData)
      console.log('Categories:', newData)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([]) // Set to empty array on error
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Map categories to options using the French translation for the label
  const options = categories.map((cat) => {
    const frenchTranslation = cat.translations.find((t) => t.locale === 'fr')
    return {
      value: cat.id,
      label: frenchTranslation ? frenchTranslation.name : 'N/A',
    }
  })

  return (
    <Select
      options={options}
      onChange={onFilterChange}
      placeholder="Sélectionner une catégorie"
      isClearable
      className="w-80"
    />
  )
}