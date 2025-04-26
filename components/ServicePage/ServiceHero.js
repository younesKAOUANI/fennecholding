"use client";
import React from 'react';
import { FaBoxOpen, FaTools } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function ServiceHero() {
  const t = useTranslations('services.hero');

  const stats = [
    { label: t('stats.0'), icon: <FaTools size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <FaBoxOpen size={24} className="mx-auto mb-2 text-primary" /> },
  ];

  return (
    <section className='bg-gray-50'>
      <div className='section px-4 py-12 md:px-6 md:py-16'>
        <h1 className='text-5xl sm:text-6xl md:text-7xl uppercase leading-tight pt-8 font-bold' data-aos="fade-up">{t('title')}</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-center w-full md:w-1/3 mt-8 mx-auto md:mx-0'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white h-full text-center shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-lg p-4"
              data-aos='fade-left'
              data-aos-delay={index * 100}
            >
              {stat.icon}
              <p className="text-base md:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

