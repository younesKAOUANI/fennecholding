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
    { label: t('stats.0'), icon: <IoCheckmarkDoneOutline size={32} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <IoCheckmarkDoneOutline size={32} className="mx-auto mb-2 text-primary" /> },
  ];

  return (
    <section className='relative bg-gray-50'>
      <div className='section flex gap-8 justify-between'>
        <div>
          <Image
            src='https://placehold.co/600x400.png'
            alt='After Sale Services'
            width={600}
            height={400}
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col gap-6 items-start w-1/2'>
          <div className='flex gap-2 items-center'>
            <p className='text-primary font-semibold text-lg'>{t('label')}</p>
          </div>
          <h1 className='text-5xl font-bold'>{t('title')}</h1>
          <p className='text-xl text-justify'>{t('description')}</p>
        </div>
      </div>
    </section>
  );
}