import React from 'react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useTranslations } from 'next-intl';

export default function ReplacementAdvantages() {
  const t = useTranslations('services.replacement_advantages');

  const advantages = [
    t('stats.0'),
    t('stats.1'),
    t('stats.2'),
    t('stats.3')
  ];

  return (
    <section className='bg-gray-50'>
      <div className='section py-4 md:py-8 px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center'>
          <h2 className='text-3xl md:text-4xl uppercase font-bold text-center md:text-left' data-aos="fade-right">Avantages Fennec</h2>
          <div className='col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex items-center p-4"
                data-aos='fade-left'
                data-aos-delay={index * 100}
              >
                <IoCheckmarkDoneOutline className="text-primary text-xl md:text-2xl mr-2" />
                <p className="text-base md:text-lg font-medium">{advantage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}