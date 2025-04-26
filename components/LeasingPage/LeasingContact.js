"use client";
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function LeasingContact() {
  const t = useTranslations('leasing.contact');

  return (
    <section>
      <div className='section flex flex-col md:flex-row gap-6 md:gap-8 justify-between px-4 py-12 md:px-6 md:py-16'>
        <div className='w-full md:w-1/2' data-aos="fade-right">
          <h2 className='text-4 soaredxl md:text-5xl font-bold mb-6 leading-tight'>{t('title')}</h2>
          <p className='text-base md:text-xl text-justify'>{t('description')}</p>
        </div>
        <div className='w-full md:w-1/2' data-aos="fade-left">
          <Image
            src='/images/contactus.png'
            alt='After Sale Services'
            width={500}
            height={300}
            className='rounded-sm w-full h-auto'
          />
        </div>
      </div>
    </section>
  );
}