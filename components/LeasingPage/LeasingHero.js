"use client";
import React from "react";
import { useTranslations } from 'next-intl';

export default function LeasingHero() {
  const t = useTranslations('leasing.hero');

  return (
    <section className="section px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-5xl sm:text-6xl md:text-7xl uppercase leading-tight pt-8 font-bold" data-aos="fade-up">
        {t('title')}
      </h1>
      <p className="text-base md:text-xl font-medium mt-4" data-aos="fade-up" data-aos-delay="100">
        {t('description')}
      </p>
    </section>
  );
}