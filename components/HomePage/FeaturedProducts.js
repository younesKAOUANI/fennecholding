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
      <Image src='/featured-image.png' alt='' width={300} height={400} className='absolute right-0' />
      <div className='section !pt-0'>
        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-2 mb-6'>
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
                  className="mx-auto md:text-xl text-xs font-medium px-4 py-2 hover:bg-primary hover:text-white rounded-full flex items-center gap-4"
                >
                  {product.name}
                  <LuCircleArrowRight className='text-2xl rtl:rotate-180' />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center mt-12 relative z-10'>
          <h2 className='text-5xl font-semibold'>{t('title')}</h2>
          <Link
            href={'/'}
            data-aos="fade-in"
            className='text-xl font-medium px-4 py-2 bg-primary text-white rounded-full flex items-center justify-center gap-4 hover:scale-95'
          >
            <span>{t('button')}</span>
            <LuCircleArrowRight className='text-3xl rtl:rotate-180' />
          </Link>
        </div>
      </div>
    </section>
  );
}