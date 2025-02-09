import Aos from 'aos';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { LuCircleArrowRight } from 'react-icons/lu'

export default function InfoSection({ title, description, description2, img, alt, imgOrder, bg = false, href }) {

    return (
        <section style={bg ? { backgroundImage: `url(texture.png)`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            <div className={`section flex flex-col md:flex-row gap-6 justify-between ${bg ? 'text-white' : ''}`} >
                <div className='flex flex-col justify-center items-start gap-4 md:w-1/2 order-1'>
                    <h2 className='font-semibold text-4xl' data-aos="fade-right">{title}:</h2>
                    <p className='text-lg text-justify' data-aos="fade-right">{description}</p>
                    {description2 && <p className='text-lg text-justify' data-aos="fade-right">{description2}</p>}
                    {href ?
                        <Link href={href} data-aos="fade-in"
                            className='self-end text-xl font-medium  px-4 py-2 bg-primary text-white rounded-full flex items-center justify-center gap-4 hover:scale-95'>
                            <span>Voir Plus</span>
                            <LuCircleArrowRight className='text-3xl' />
                        </Link>
                        : null}
                </div>
                <Image
                    src={img}
                    alt={alt}
                    width={500}
                    height={400}
                    className={`md:${imgOrder} object-cover rounded-md shadow-md  order-5`}
                    data-aos="fade-left"
                    />
            </div>
        </section>
    )
}
