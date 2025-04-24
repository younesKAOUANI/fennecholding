
import AfterSaleAdvantages from '@/components/ServicePage/AfterSaleAdvantages'
import AfterSaleServices from '@/components/ServicePage/AfterSaleServices'
import ReplacementAdvantages from '@/components/ServicePage/ReplacementAdvantages'
import ReplacementPieces from '@/components/ServicePage/ReplacementPieces'
import ServiceHero from '@/components/ServicePage/ServiceHero'
import Image from 'next/image'
import React from 'react'

const advantages = [
    "Réactivité immédiate",
    "Visites sur site",
    "Maintenance",
    "Experts qualifiés",
    "Support technique avancé"
];

export default function index() {
    return (
        <main className='pt-6 relative bg-gray-50'>
            <Image src='/services-page-image.png' alt='Our DNA' width={300} height={400} className='absolute top-0 right-0' />
            <ServiceHero />
            <AfterSaleServices />
            <AfterSaleAdvantages />
            <ReplacementPieces />
            <ReplacementAdvantages />
        </main >
    )
}

