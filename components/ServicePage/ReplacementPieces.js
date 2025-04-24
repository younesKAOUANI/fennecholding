"use client";
import Image from 'next/image';
import { Link } from 'next-intl';
import React from 'react';
import { LuCircleArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

export default function ReplacementPieces() {
  const t = useTranslations('services.replacement_pieces');

  return (
    <section className='bg-gray-50'>
      <div className='section flex gap-8 justify-between'>
        <div>
          <Image
            src='https://placehold.co/500x400.png'
            alt='After Sale Services'
            width={500}
            height={400}
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col gap-6 items-start w-1/2'>
          <div className='flex gap-2 items-center'>
            <Image src='/pieces-icon.png' alt='After Sale Services' width={24} height={24} />
            <p className='text-primary font-semibold text-lg uppercase'>{t('label')}</p>
          </div>
          <h1 className='text-5xl font-bold'>{t('title')}</h1>
          <p className='text-xl text-justify'>{t('description')}</p>
        </div>
      </div>
    </section>
  );
}