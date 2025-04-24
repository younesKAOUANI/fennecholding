import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DataTable from '@/components/main/DataTable';
import MobileDataTable from '@/components/main/MobileDataTable';
import Title from '@/components/main/Title';
import { categoriesTableView } from '@/data/categories';

export default function Categories() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const newData = await response.json();
      setData(newData);
      console.log(newData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Title title="Catégories">
        <Link
          href="/admin/categories/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Ajouter une Catégorie
        </Link>
      </Title>
      <div className="mt-6">
        <MobileDataTable data={data} tableData={categoriesTableView(fetchData)} />
      </div>
    </div>
  );
}