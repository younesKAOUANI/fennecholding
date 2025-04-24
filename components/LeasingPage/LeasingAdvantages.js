"use client";
import React from 'react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useTranslations } from 'next-intl';

export default function LeasingAdvantages() {
  const t = useTranslations('leasing.advantages');

  const stats = [
    { label: t('stats.0'), icon: <IoCheckmarkDoneOutline size={32} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <IoCheckmarkDoneOutline size={32} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.2'), icon: <IoCheckmarkDoneOutline size={32} className="mx-auto mb-2 text-primary" /> }
  ];

  return (
    <section>
      <div className='section grid md:grid-cols-4 gap-8 items-center'>
        <h2
          data-aos='fade-right'
          className='font-semibold text-3xl md:text-left text-center max-w-[150px]'
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
            <p className="text-lg mb-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}