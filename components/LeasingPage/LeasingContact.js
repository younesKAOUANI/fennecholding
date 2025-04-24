"use client";
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function LeasingContact() {
  const t = useTranslations('leasing.contact');

  return (
    <section>
      <div className='section flex justify-between'>
        <div className='w-1/2'>
          <h2 className='text-5xl font-bold mb-6 leading-tight'>{t('title')}</h2>
          <p className='text-xl text-justify'>{t('description')}</p>
        </div>
        <Image
          src='https://placehold.co/500x300.png'
          alt='After Sale Services'
          width={500}
          height={300}
          className='rounded-sm'
        />
      </div>
    </section>
  );
}