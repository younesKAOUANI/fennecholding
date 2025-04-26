import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SolutionsSection() {
  const t = useTranslations('about.solutions');
  const [activeTab, setActiveTab] = useState(0);

  const infoArray = [
    {
      id: 1,
      title: t('tabs.0.title'),
      description: t('tabs.0.description'),
    },
    {
      id: 2,
      title: t('tabs.1.title'),
      description: t('tabs.1.description'),
    },
    {
      id: 3,
      title: t('tabs.2.title'),
      description: t('tabs.2.description'),
    },
  ];

  return (
    <section className='relative'>
      <Image 
        src='/solutions-image.png' 
        alt='' 
        width={300} 
        height={400} 
        className='absolute hidden md:block right-0 -top-32' 
      />
      <div className="section pt-4 md:pt-8 relative z-10 px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-12" data-aos="fade-up">{t('title')}</h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="flex flex-col p-3 w-full md:min-w-[250px] lg:min-w-[300px] gap-4 shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 rounded-xl" data-aos="fade-right">
            {infoArray.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`rounded-lg py-3 px-5 text-left font-semibold text-sm shadow-inner 
                ${activeTab === index
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-100'
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-inner bg-gradient-to-r from-gray-100 to-gray-50 shadow-gray-400 p-6 text-base md:text-lg text-gray-800 w-full" data-aos="fade-left">
            <p>{infoArray[activeTab].description}</p>
          </div>
        </div>
      </div>
      <div className='relative bg-white h-[300px] md:h-[500px] border-y-4 border-primary/60'>
        <div
          className='absolute top-0 left-0 w-full md:w-1/2 h-full bg-cover bg-center border-r-2 border-primary/60'
          style={{ backgroundImage: "url('/images/solutions-1.png')" }}
        ></div>
        <div
          className='absolute top-0 right-0 w-full md:w-1/2 h-full bg-cover bg-center border-l-2 border-primary/60'
          style={{ backgroundImage: "url('/images/solutions-2.png')" }}
        ></div>
      </div>
    </section>
  );
}