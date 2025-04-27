"use client";
import Image from 'next/image';
import React from 'react';
import { LuCircleArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AfterSaleServices({ button = false }) {
  const t = useTranslations('services.after_sale');

  return (
    <section className='bg-gray-50'>
      <div className='section flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-center px-4 py-12 md:px-6 md:py-16'>
        <div className='flex flex-col gap-6 items-start w-full md:w-1/2' data-aos="fade-left">
          <div className='flex gap-2 items-end'>
            <Image src='/aftersaleicon.png' alt='After Sale Services' width={24} height={24} />
            <p className='text-primary font-semibold text-base md:text-lg'>{t('label')}</p>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold'>{t('title')}</h1>
          <p className='text-base md:text-xl text-justify'>{t('description')}</p>
          {button && (
            <Link
              href={'/services'}
              data-aos="fade-in"
              className='text-lg md:text-xl font-medium px-4 py-2 text-primary rounded-full flex items-center justify-center gap-4 hover:scale-95 border-2 border-primary hover:bg-primary hover:text-white'
            >
              <span>{t('button')}</span>
              <LuCircleArrowRight className='text-2xl md:text-3xl rtl:rotate-180' />
            </Link>
          )}
        </div>
        <div className='w-full md:w-1/2' data-aos="fade-right">
          <Image
            src='/images/aftersale.png'
            alt='After Sale Services'
            width={500}
            height={400}
            className='rounded-md shadow-md w-full h-auto'
          />
        </div>
      </div>
    </section>
  );
}
