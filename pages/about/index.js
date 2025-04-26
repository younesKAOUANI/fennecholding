import AboutUsSection from '@/components/AboutPage/AboutUsSection'
import AdvantagesFennec from '@/components/AboutPage/AdvantagesFennec'
import OurMission from '@/components/AboutPage/OurMission'
import TheyTrustedUs from '@/components/HomePage/TheyTrustedUs'
import { useTranslations } from 'next-intl'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

export default function index() {
    const t = useTranslations('about');
    return (
        <div className='pt-20 bg-gray-50 relative'>
            <Head>
                <title>A propos - Fennec Holding</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image src={'/about-us-img.png'} alt='about' width={350} height={500} className='absolute ltr:right-0 top-0 rtl:left-0' />
            <div className='section !pb-4'>
                <h1 className='font-bold text-7xl uppercase'>{t('title')}</h1>
            </div>
            <AboutUsSection />
            <OurMission />
            <AdvantagesFennec />
            <TheyTrustedUs />
        </div>
    )
}
