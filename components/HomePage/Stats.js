import React, { useEffect } from 'react'

const stats = [
    { label: 'de produits', number: 'Plus de 200 millions' },
    { label: 'catégories de produits', number: 59000 },
    // { label: 'fournisseurs', number: 120 },
    // { label: 'pays et régions', number: 59 },
]

export default function Stats() {

    return (
        <section className=''>
            <div className='section grid md:grid-cols-3 gap-8 items-center'>
                <div className='md:col-span-2' data-aos='fade-right'>
                    <h2 className='font-semibold md:text-4xl text-xl md:text-left text-center'>Explorez des millions d'offres adaptées aux besoins de votre entreprise</h2>
                </div>
                <div className='grid grid-cols-2 md:gap-8 gap-2 w-full'>
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white text-center shadow-md rounded-lg p-4 md:border-l-4 md:border-t-0 border-t-4 border-primary" data-aos='fade-left' data-aos-delay={index * 100}>
                            <h3 className="text-2xl font-medium">{stat.number}</h3>
                            <p className="text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
