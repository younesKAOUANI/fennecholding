"use client";
import React from "react";
import { useTranslations } from 'next-intl';

export default function LeasingHero() {
  const t = useTranslations('leasing.hero');

  return (
    <section className="section">
      <h1 className="text-7xl uppercase leading-tight pt-8 font-bold">
        {t('title')}
      </h1>
      <p className="text-xl font-medium">
        {t('description')}
      </p>
    </section>
  );
}