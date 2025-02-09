import Image from 'next/image'
import React from 'react'
import { MenuItem } from './Header'
import Link from 'next/link'
import { IoMdMail, IoMdPhonePortrait } from 'react-icons/io'
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { TbBrandLinkedin } from "react-icons/tb";
import { RiFacebookBoxLine } from "react-icons/ri";
import Map from '../AboutPage/Map'


export default function Footer() {
    return (
        <footer className='bg-white'>
            <div className='container px-4 md:px-0 mx-auto grid md:grid-cols-2 gap-8 items-center !py-6 pt-'>
                <div className='order-4 md:order-0'>
                    <h2 className='font-semibold text-4xl text-left'>Nous Somme la Pour vous</h2>
                    <div>
                        <ul className='flex flex-col gap-2 items-left'>
                            <li className='text-lg font-medium hover:text-primary flex flex-col gap-1 mt-4' >
                                <h3 className='text-2xl'>Numéro de téléphone:</h3>
                                <Link href='tel:+225 07 65 34 56 78' className='text-gray-600'>  +225 07 65 34 56 78</Link>
                            </li>
                            <li className='text-lg font-medium hover:text-primary flex flex-col gap-1 mt-4' >
                                <h3 className='text-2xl'>Email:</h3>
                                <Link href='mail:contact@fennecholdings.dz' className='text-gray-600'>  contact@fennecholdings.dz</Link>
                            </li>
                            <li className='text-lg font-medium hover:text-primary flex flex-col gap-1 mt-4' >
                                <h3 className='text-2xl'>Addresse:</h3>
                                <p  className='text-gray-600'>R.N-N°5 - Entrée De Hraicha Amar - Ain Smara (w) Constantine, Constantine 25140</p>
                            </li>
                        </ul>
                    </div>
                    <div className='flex gap-4 items-center justify-start mt-4'>
                        <Link href={"/"}> <FaInstagram className='text-4xl hover:text-3xl  text-primary' /> </Link>
                        <Link href={"/"}> <TbBrandLinkedin className='text-4xl hover:text-3xl text-primary' /> </Link>
                        <Link href={"/"}> <RiFacebookBoxLine className='text-4xl hover:text-3xl text-primary' /> </Link>
                    </div>
                </div>
                <Map />
            </div>
            <div className='max-w-6xl mx-auto border-t-2 border-gray-300 text-gray-800 text-center py-4'>

                <p>© 2025 Fennecholdings. Tous droits réservés.</p>
            </div>
        </footer>
    )
}
