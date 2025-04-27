"use client";
import Image from 'next/image';
import { Link } from 'next-intl';
import React from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

export default function AboutUsSection() {
  const t = useTranslations('about.us');

  const stats = [
    { label: t('stats.0'), icon: <IoCheckmarkDoneOutline size={24} className="mx-2 mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <IoCheckmarkDoneOutline size={24} className="mx-1 mb-2 text-primary" /> },
  ];

  return (
    <section className='relative'>
      <div className='section flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-center px-4 py-12 md:px-6 md:py-16'>
        <div className='flex flex-col gap-6 items-start w-full md:w-1/2' data-aos="fade-right">
          <div className='flex gap-2 items-center'>
            <p className='text-primary font-semibold text-base md:text-lg'>{t('label')}</p>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold'>{t('title')}</h1>
          <p className='text-base md:text-xl text-justify'>{t('description1')}</p>
          <p className='text-base md:text-xl text-justify'>{t('description2')}</p>
          <p className='text-base md:text-xl text-justify'>{t('description3')}</p>
        </div>
        <div className='w-full md:w-1/2' data-aos="fade-left">
          <Image
            src='/images/about-1.png'
            alt='After Sale Services'
            width={600}
            height={400}
            className='rounded-md w-full h-auto'
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center bg-white h-full text-center shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-lg p-4"
                data-aos='fade-left'
                data-aos-delay={index * 100}
              >
                {stat.icon}
                <p className="text-base md:text-lg mb-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}