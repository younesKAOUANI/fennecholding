import LeasingAdvantages from '@/components/LeasingPage/LeasingAdvantages'
import LeasingAndFincancement from '@/components/LeasingPage/LeasingAndFinancement'
import LeasingContact from '@/components/LeasingPage/LeasingContact'
import LeasingHero from '@/components/LeasingPage/LeasingHero'
import Image from 'next/image'
import React from 'react'

export default function index() {
    return (
        <main className='relative !pt-8 bg-gray-50'>
            <Image src='/leasinghero-image.png' alt='Our DNA' width={300} height={400} className='absolute top-0 right-0' />
            <LeasingHero />
            <LeasingAndFincancement />
            <LeasingAdvantages />
            <LeasingContact />
        </main>
    )
}
