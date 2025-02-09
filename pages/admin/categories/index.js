import DataTable from '@/components/main/DataTable'
import MobileDataTable from '@/components/main/MobileDataTable'
import Title from '@/components/main/Title'
import { categoriesTableView } from '@/data/categories'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function index() {
  const [data, setData] = React.useState([])

  const fetchData = async () => {
    const response = await fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const newData = await response.json()
    setData(newData)
    console.log(newData)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Title title='Categories'>
        <Link href="/admin/categories/add" className='bg-blue-500 px-4 py-2 rounded-md text-white'>Ajouter une Categorie </Link>
      </Title>
      <MobileDataTable data={data} tableData={categoriesTableView(fetchData)} />
    </div>
  )
}
