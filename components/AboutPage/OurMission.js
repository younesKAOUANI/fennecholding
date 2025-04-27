"use client";
import Image from 'next/image';
import { Link } from 'next-intl';
import React from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { LuCircleArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

export default function OurMission() {
  const t = useTranslations('about.mission');

  const stats = [
    { label: t('stats.0'), icon: <IoCheckmarkDoneOutline size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <IoCheckmarkDoneOutline size={24} className="mx-auto mb-2 text-primary" /> },
  ];

  return (
    <section className='relative bg-gray-50'>
      <div className='section flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-center px-4 py-12 md:px-6 md:py-16'>
        <div className='w-full md:w-1/2' data-aos="fade-right">
          <Image
            src='/images/about-2.png'
            alt='After Sale Services'
            width={600}
            height={400}
            className='rounded-md w-full h-auto'
          />
        </div>
        <div className='flex flex-col gap-6 items-start w-full md:w-1/2' data-aos="fade-left">
          <div className='flex gap-2 items-center'>
            <p className='text-primary font-semibold text-base md:text-lg'>{t('label')}</p>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold'>{t('title')}</h1>
          <p className='text-base md:text-xl text-justify'>{t('description')}</p>
        </div>
      </div>
    </section>
  );
}