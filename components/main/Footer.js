import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { IoMdMail, IoMdPhonePortrait } from 'react-icons/io';
import { FaInstagram } from "react-icons/fa";
import { TbBrandLinkedin } from "react-icons/tb";
import { RiFacebookBoxLine } from "react-icons/ri";
import Map from '../AboutPage/Map';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className='bg-white'>
      <div className='container px-4 md:px-0 mx-auto grid md:grid-cols-2 gap-8 items-center !py-6 pt-'>
        <div className='order-4 md:order-0'>
          <h2 className='font-semibold text-4xl rtl:text-right text-left '>{t('title')}</h2>
          <div>
            <ul className='flex flex-col gap-2 items-left'>
              <li className='text-lg font-medium hover:text-primary flex flex-col gap-1 mt-4'>
                <h3 className='text-2xl'>{t('phone_label')}</h3>
                <Link href='tel:+213561646190' className='text-gray-600 text-reverse'>{t('phone')}</Link>
                <Link href='tel:+213560436496' className='text-gray-600'>{t('phone-2')}</Link>
              </li>
              <li className='text-lg font-medium hover:text-primary flex flex-col gap-1 mt-4'>
                <h3 className='text-2xl'>{t('email_label')}</h3>
                <Link href='mailto:contact@fennecholdings.dz' className='text-gray-600'>{t('email')}</Link>
              </li>
              <li className='text-lg font-medium hover:text-primary flex flex-col gap-1 mt-4'>
                <h3 className='text-2xl'>{t('address_label')}</h3>
                <p className='text-gray-600'>{t('address')}</p>
              </li>
            </ul>
          </div>
          <div className='flex gap-4 items-center justify-start mt-4'>
            <Link href="/"><FaInstagram className='text-4xl hover:text-3xl text-primary' /></Link>
            <Link href="/"><TbBrandLinkedin className='text-4xl hover:text-3xl text-primary' /></Link>
            <Link href="/"><RiFacebookBoxLine className='text-4xl hover:text-3xl text-primary' /></Link>
          </div>
        </div>
        <Map />
      </div>
      <div className='max-w-6xl mx-auto border-t-2 border-gray-300 text-gray-800 text-center py-4'>
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
}