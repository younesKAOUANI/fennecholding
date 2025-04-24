import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { LuCircleArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

export default function OurDna() {
  const t = useTranslations('about.dna');

  return (
    <section className='relative border-t-4 border-primary/60 bg-gray-50'>
      <Image src='/dna-image.png' alt='Our DNA' width={300} height={400} className='absolute rtl:left-0' />
      <div className='section grid grid-cols-2 gap-8'>
        <div className='text-right rtl:text-left'>
          <p className='text-primary font-semibold text-xl'>{t('label')}</p>
          <h3 className='text-8xl font-bold mt-2'>{t('title')}</h3>
        </div>
        <div className='text-lg flex flex-col gap-4 text-justify items-start'>
          <p>{t('description1')}</p>
          <p>{t('description2')}</p>
          <p>{t('description3')}</p>
          <Link
            href={'/'}
            data-aos="fade-in"
            className='text-xl font-medium px-4 py-2 text-primary rounded-full flex  items-center justify-center gap-4 hover:scale-95 border-2 border-primary hover:bg-primary hover:text-white'
          >
            <span>{t('button')}</span>
            <LuCircleArrowRight className='text-3xl rtl:rotate-180' />
          </Link>
        </div>
      </div>
    </section>
  );
}