"use client";
import React from 'react';
import { FaTools, FaCogs, FaWrench, FaBoxOpen } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('services.stats');

  const stats = [
    { label: t('stats.0'), icon: <FaTools size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <FaCogs size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.2'), icon: <FaWrench size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.3'), icon: <FaBoxOpen size={24} className="mx-auto mb-2 text-primary" /> },
  ];

  return (
    <section>
      <div className='section grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center px-4 py-12 md:px-6 md:py-16'>
        <h2
          data-aos='fade-right'
          className='font-semibold text-lg md:text-xl md:col-span-1 col-span-2 text-center md:text-left md:max-w-[150px]'
        >
          {t('title')}
        </h2>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white h-full flex flex-col items-center justify-center text-center shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-lg p-4"
            data-aos='fade-left'
            data-aos-delay={index * 100}
          >
            {stat.icon}
            <p className="text-base md:text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}