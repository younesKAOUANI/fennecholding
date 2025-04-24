"use client";
import Image from 'next/image';
import React from 'react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useTranslations } from 'next-intl';

export default function AdvantagesFennec() {
  const t = useTranslations('about.advantages');

  const stats = [
    {
      label: t('stats.0.label'),
      text: t('stats.0.text'),
      icon: <IoCheckmarkDoneOutline size={32} className="mb-4 text-primary" />
    },
    {
      label: t('stats.1.label'),
      text: t('stats.1.text'),
      icon: <IoCheckmarkDoneOutline size={32} className="mb-4 text-primary" />
    },
    {
      label: t('stats.2.label'),
      text: t('stats.2.text'),
      icon: <IoCheckmarkDoneOutline size={32} className="mb-4 text-primary" />
    },
    {
      label: t('stats.3.label'),
      text: t('stats.3.text'),
      icon: <IoCheckmarkDoneOutline size={32} className="mb-4 text-primary" />
    }
  ];

  return (
    <section className='relative'>
      <Image src={'/advantagesfennec-image.png'} alt='about' width={500} height={800} className='absolute right-0 -top-16' />
      <div className='section grid md:grid-cols-4 gap-8 items-center'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col bg-white h-full shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-lg p-4"
            data-aos='fade-left'
            data-aos-delay={index * 100}
          >
            {stat.icon}
            <p className="text-2xl mb-4 font-bold">{stat.label}</p>
            <p className="text-lg mb-1">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}