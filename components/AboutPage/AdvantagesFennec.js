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
      icon: "/first-icon.png"
    },
    {
      label: t('stats.1.label'),
      text: t('stats.1.text'),
      icon: "/second-icon.png"
    },
    {
      label: t('stats.2.label'),
      text: t('stats.2.text'),
      icon: "/third-icon.png"
    },
    {
      label: t('stats.3.label'),
      text: t('stats.3.text'),
      icon: "/fourth-icon.png"
    }
  ];

  return (
    <section className='relative'>
      <Image 
        src={'/advantagesfennec-image.png'} 
        alt='about' 
        width={400} 
        height={600} 
        className='absolute hidden md:block right-0 -top-16' 
      />
      <div className='section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center px-4 py-12 md:px-6 md:py-16'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col bg-white h-full shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-lg p-4"
            data-aos='fade-left'
            data-aos-delay={index * 100}
          >
            <Image width={40} height={40} src={stat.icon} alt='about' className='mb-4' />
            <p className="text-xl md:text-2xl mb-4 font-bold">{stat.label}</p>
            <p className="text-base md:text-lg mb-1">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}