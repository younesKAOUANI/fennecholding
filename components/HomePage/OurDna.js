import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { LuCircleArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

export default function OurDna() {
  const t = useTranslations('about.dna');

  return (
    <section className='relative border-t-4 border-primary/60 bg-gray-50'>
      <Image 
        src='/dna-image.png' 
        alt='Our DNA' 
        width={300} 
        height={400} 
        className='absolute hidden md:block rtl:left-0' 
      />
      <div className='section grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-12 md:px-6 md:py-16'>
        <div className='text-center md:text-right rtl:text-left' data-aos="fade-right">
          <p className='text-primary font-semibold text-lg md:text-xl'>{t('label')}</p>
          <h3 className='text-5xl md:text-8xl font-bold mt-2'>{t('title')}</h3>
        </div>
        <div className='text-base md:text-lg flex flex-col gap-4 text-justify items-center md:items-start' data-aos="fade-left">
          <p>{t('description1')}</p>
          <p>{t('description2')}</p>
          <p>{t('description3')}</p>
          <Link
            href={'/'}
            data-aos="fade-in"
            className='text-lg md:text-xl font-medium px-4 py-2 text-primary rounded-full flex items-center justify-center gap-4 hover:scale-95 border-2 border-primary hover:bg-primary hover:text-white'
          >
            <span>{t('button')}</span>
            <LuCircleArrowRight className='text-2xl md:text-3xl rtl:rotate-180' />
          </Link>
        </div>
      </div>
    </section>
  );
}