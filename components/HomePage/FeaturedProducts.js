import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuCircleArrowRight } from "react-icons/lu";
import { useTranslations } from 'next-intl';

const products = [
  { id: 1, image: 'https://placehold.co/400x400.png', name: 'ZLP1000/1', link: '/' },
  { id: 2, image: 'https://placehold.co/400x400.png', name: 'ZLP1000/2', link: '/' },
  { id: 3, image: 'https://placehold.co/400x400.png', name: 'ZLP1000/3', link: '/' },
  { id: 4, image: 'https://placehold.co/400x400.png', name: 'ZLP1000/3', link: '/' },
];

export default function FeaturedProducts() {
  const t = useTranslations('products.featured');

  return (
    <section className='relative overflow-hidden'>
      <Image 
        src='/featured-image.png' 
        alt='' 
        width={300} 
        height={400} 
        className='absolute hidden md:block right-0' 
      />
      <div className='section pt-0 md:pt-4 px-4 py-12 md:px-6 md:py-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6'>
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-95"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full aspect-video object-cover"
              />
              <div className="flex items-center p-4">
                <Link
                  href={product.link}
                  className="mx-auto text-sm md:text-xl font-medium px-4 py-2 hover:bg-primary hover:text-white rounded-full flex items-center gap-4"
                >
                  {product.name}
                  <LuCircleArrowRight className='text-xl md:text-2xl rtl:rotate-180' />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center mt-12 relative z-10 gap-4'>
          <h2 className='text-2xl md:text-5xl  font-semibold' data-aos="fade-right">{t('title')}</h2>
          <Link
            href={'/'}
            data-aos="fade-in"
            className='text-lg md:text-xl font-medium px-4 py-2 bg-primary text-white rounded-full flex items-center justify-center gap-4 hover:scale-95'
          >
            <span>{t('button')}</span>
            <LuCircleArrowRight className='text-2xl md:text-3xl rtl:rotate-180' />
          </Link>
        </div>
      </div>
    </section>
  );
}