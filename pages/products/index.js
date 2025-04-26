"use client";

import Banner from '@/components/main/Banner';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LuCircleArrowRight } from 'react-icons/lu';
import Slider from 'react-slick';
import Head from 'next/head';

export default function Index() {
  const locale = useLocale(); // Dynamically get the current locale
  const t = useTranslations('Index'); // Access translations
  const [allCategories, setAllCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(t('fetchError', { status: response.statusText }));
      }
      const newData = await response.json();
      console.log('API Response from /api/categories:', newData);

      if (!Array.isArray(newData)) {
        throw new Error(
          t('invalidResponse', { data: JSON.stringify(newData) })
        );
      }

      const translatedCategories = newData.map((category) => {
        console.log('Current locale:', locale);
        console.log('Category translations:', category.translations);
        const categoryTranslation =
          category.translations?.find((t) => t?.locale === locale) ||
          category.translations?.[0] ||
          {};
        console.log('Selected category translation:', categoryTranslation);
        return {
          ...category,
          name: categoryTranslation.name || t('unnamedCategory'),
          products: (category.products || []).map((product) => {
            const productTranslation =
              product.translations?.find((t) => t?.locale === locale) ||
              product.translations?.[0] ||
              {};
            console.log(
              'Selected product translation for locale',
              locale,
              ':',
              productTranslation
            );
            return {
              ...product,
              name: productTranslation.name || t('unnamedProduct'),
            };
          }),
        };
      });
      setAllCategories(translatedCategories);
      setVisibleCategories(translatedCategories);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      setAllCategories([]);
      setVisibleCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Locale changed to:', locale);
    fetchCategories();
  }, [locale]);

  const handleSelectCategory = (selectedCategory) => {
    if (selectedCategory) {
      setVisibleCategories(
        allCategories.filter((cat) => cat.id === selectedCategory.id)
      );
    } else {
      setVisibleCategories(allCategories);
    }
  };

  return (
    <main className="!pt-24 bg-white">
      <Head>
        <title>Produits - Fennec Holding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner
        title={t('bannerTitle')}
        backgroundImage="https://placehold.co/1080x600.png"
      />
      <div className="section grid grid-cols-4 gap-8">
        <Filter
          categories={allCategories}
          onSelectCategory={handleSelectCategory}
        />
        <div className="col-span-3">
          {error ? (
            <div className="text-center py-10 text-red-600">
              {t('errorLoading', { error })}
            </div>
          ) : isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CategorySectionSkeleton key={`skeleton-${index}`} />
            ))
          ) : visibleCategories.length > 0 ? (
            visibleCategories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center py-10">{t('noCategories')}</div>
          )}
        </div>
      </div>
    </main>
  );
}

const CategorySection = ({ category }) => {
  const t = useTranslations('Index');
  const slidesToShowDesktop = 4;
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
  };

  const products = category.products || [];
  const numPlaceholders =
    products.length < slidesToShowDesktop
      ? slidesToShowDesktop - products.length
      : 0;
  const slides = [...products, ...Array(numPlaceholders).fill(null)];

  return (
    <div className="bg-white mb-8">
      <h2 className="text-xl font-medium px-4 py-2 mb-6">{category.name}</h2>
      {products.length > 0 ? (
        <Slider {...settings}>
          {slides.map((product, index) => {
            if (!product) {
              return (
                <div key={`placeholder-${index}`} className="px-2">
                  <div className="h-full invisible"></div>
                </div>
              );
            }
            return (
              <div key={product.id} className="px-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-95 transition-transform">
                  <Image
                    src={product.images?.[0] || '/placeholder.png'}
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
                      <LuCircleArrowRight className="text-2xl rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="text-center py-4">{t('noProducts')}</div>
      )}
    </div>
  );
};

const Filter = ({ categories, onSelectCategory }) => {
  const t = useTranslations('Index');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    onSelectCategory(null);
  };

  return (
    <div className="col-span-1 flex flex-col items-start mt-4">
      <h3 className="text-xl font-semibold mb-4">{t('filterTitle')}</h3>
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

            </li>
          ))
        )}
      </ul>
      {selectedCategory && (
        <button
          onClick={clearFilter}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          {t('resetFilter')}
        </button>
      )}
    </div>
  );
};

const CategorySectionSkeleton = () => {
  return (
    <div className="mb-6">
      <div className="mb-6 w-80 h-12 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-gradient-to-r w-full h-48 from-gray-100 to-gray-200 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};