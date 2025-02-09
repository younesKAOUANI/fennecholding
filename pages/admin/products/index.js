// pages/index.jsx
import DataTable from '@/components/main/DataTable'
import MobileDataTable from '@/components/main/MobileDataTable'
import Title from '@/components/main/Title'
import { productsTableView } from '@/data/products'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function Index() {
  // State to store the full product data and filtered data
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  // Fetch the products from the API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const newData = await response.json()
      setData(newData.products)
      setFilteredData(newData.products) // Initially, no filter is applied.
      console.log(newData, 'newData')
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Function to filter products by category when a category is selected.
  const handleCategoryFilter = (selectedOption) => {
    if (!selectedOption) {
      // If no category is selected, display all products.
      setFilteredData(data)
    } else {
      // Filter the products by matching categoryId.
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
      {/* 
         Pass filteredData to the MobileDataTable along with the table view and the Filter component.
         We pass our handleCategoryFilter callback as onFilterChange to Filter.
      */}
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
      const newData = await response.json()
      setCategories(newData)
      console.log('Categories:', newData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Map the fetched categories to the format expected by react-select.
  const options = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  return (
    <Select
      options={options}
      onChange={onFilterChange} // Call the parent's filter function when a selection is made.
      placeholder="Sélectionner une catégorie"
      isClearable
      className="w-80"
    />
  )
}
