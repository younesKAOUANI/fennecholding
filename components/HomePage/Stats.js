"use client";
import React from 'react';
import { FaTools, FaCogs, FaWrench, FaBoxOpen } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('services.stats');

  const stats = [
    { label: t('stats.0'), icon: <FaTools size={32} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.1'), icon: <FaCogs size={32} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.2'), icon: <FaWrench size={32} className="mx-auto mb-2 text-primary" /> },
    { label: t('stats.3'), icon: <FaBoxOpen size={32} className="mx-auto mb-2 text-primary" /> },
  ];

  return (
    <section>
      <div className='section grid md:grid-cols-5 gap-8 items-center'>
        <h2
          data-aos='fade-right'
          className='font-medium text-xl md:text-left text-center max-w-[150px]'
        >
          {t('title')}
        </h2>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white h-full text-center shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-lg p-4"
            data-aos='fade-left'
            data-aos-delay={index * 100}
          >
            {stat.icon}
            <p className="text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}