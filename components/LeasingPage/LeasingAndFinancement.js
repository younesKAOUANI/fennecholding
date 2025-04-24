import Image from 'next/image';
import React from 'react';
import { LuCircleArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LeasingAndFinancement( {button = false} ) {
  const t = useTranslations('leasing.financement');

  return (
    <section className='relative bg-gray-50'>
      <div className='section !py-2 flex gap-8 justify-between'>
        <div>
          <Image
            src='/images/leasing-financement.png'
            alt='After Sale Services'
            width={500}
            height={350}
            className='rounded-md shadow-md'
          />
        </div>
        <div className='flex flex-col gap-6 items-start w-1/2'>
          <div className='flex gap-2 items-center'>
            <Image src='/financement-icon.png' alt='After Sale Services' width={24} height={24} />
            <p className='text-primary font-semibold text-lg'>{t('label')}</p>
          </div>
          <h1 className='text-5xl font-bold'>{t('title')}</h1>
          <p className='text-xl text-justify'>{t('description')}</p>
          {button && (
            <Link
              href={'/'}
              data-aos="fade-in"
              className='text-xl font-medium px-4 py-2 text-primary rounded-full flex items-center justify-center gap-4 hover:scale-95 border-2 border-primary hover:bg-primary hover:text-white'
            >
              <span>{t('button')}</span>
              <LuCircleArrowRight className='text-3xl rtl:rotate-180' />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
