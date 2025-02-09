import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosSearch, IoMdClose } from "react-icons/io"
import { FiMenu } from "react-icons/fi"
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='fixed z-50 w-full bg-white shadow-md'>
            <div className='container mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center'>
                <Link href='/'>
                    <Image src='/logo-submark.png' alt='Logo' width={150} height={50} />
                </Link>
                <nav className='hidden md:flex gap-10 items-center'>
                    <MainMenu />
                </nav>
                <button className="md:hidden text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FiMenu />
                </button>
                <Search />
            </div>
            <AnimatePresence>
                {isMenuOpen && <MainMenuMobile onClose={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </header>
    );
}

function MainMenu() {
    return (
        <ul className='flex gap-8  items-center'>
            <MenuItem href='/' text='Acceuil' />
            <MenuItem href='/products' text='Produits' />
            <MenuItem href='/services' text='Services' />
            <MenuItem href='/leasing' text='Location' />
            <MenuItem href='/about' text='A propos' />
        </ul>
    )
}

export function MenuItem({ href, text, onClick }) {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <li className={`md:text-lg text-3xl font-medium ${isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'} transition`}>
            <Link href={href} onClick={onClick}>
                {text}
            </Link>
        </li>
    )
}

function MainMenuMobile({ onClose }) {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white shadow-md p-6"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                <ul className="flex flex-col items-center gap-6">
                    <button className="text-3xl mb-4" onClick={onClose}>
                        <IoMdClose />
                    </button>
                    <MenuItem href='/' text='Acceuil' onClick={onClose} />
                    <MenuItem href='/products' text='Produits' onClick={onClose} />
                    <MenuItem href='/services' text='Services' onClick={onClose} />
                    <MenuItem href='/leasing' text='Location' onClick={onClose} />
                    <MenuItem href='/about' text='A propos' onClick={onClose} />
                </ul>
            </motion.div>
        </motion.div>
    )
}

function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const togglePopup = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            {/* Search Icon */}
            <IoIosSearch
                className="text-3xl cursor-pointer"
                onClick={togglePopup}
            />

            {/* Animated Search Input */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={popupRef}
                        className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-2 z-10 md:w-64 w-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
