"use client";
import React from 'react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useTranslations } from 'next-intl';

export default function LeasingAdvantages() {
  const t = useTranslations('leasing.advantages');

  const stats = [
    { label: t('stats.0'), icon: <IoCheckmarkDoneOutline size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <IoCheckmarkDoneOutline size={24} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.2'), icon: <IoCheckmarkDoneOutline size={24} className="mx-auto mb-2 text-primary" /> }
  ];

  return (
    <section>
      <div className='section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center px-4 py-12 md:px-6 md:py-16'>
        <h2
          data-aos='fade-right'
          className='font-semibold text-2xl md:text-3xl text-center md:text-left max-w-[150px]'
        >
          {t('title')}
        </h2>
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
    </section>
  );
}