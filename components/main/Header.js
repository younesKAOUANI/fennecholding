import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { i18n } from '@/i18n';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('header');

  return (
    <header className='fixed z-50 w-full bg-white '>
      <div className='container mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo-submark.png' alt='Logo' width={120} height={50} />
        </Link>
        <nav className='hidden md:flex gap-10 items-center'>
          <MainMenu />
        </nav>
        <button className="md:hidden text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu />
        </button>
        <LanguageSwitcher />
      </div>
      <AnimatePresence>
        {isMenuOpen && <MainMenuMobile onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function MainMenu() {
  const t = useTranslations('header');

  return (
    <ul className='flex gap-8 items-center'>
      <MenuItem href='/' text={t('home')} />
      <MenuItem href='/products' text={t('products')} />
      <MenuItem href='/services' text={t('services')} />
      <MenuItem href='/leasing' text={t('leasing')} />
      <MenuItem href='/about' text={t('about')} />
    </ul>
  );
}

export function MenuItem({ href, text, onClick }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li className={`md:text-lg text-3xl font-medium ${isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'} transition`}>
      <Link href={href} onClick={onClick}>
        {text}
      </Link>
    </li>
  );
}

function MainMenuMobile({ onClose }) {
  const t = useTranslations('header');

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
          <MenuItem href='/' text={t('home')} onClick={onClose} />
          <MenuItem href='/products' text={t('products')} onClick={onClose} />
          <MenuItem href='/services' text={t('services')} onClick={onClose} />
          <MenuItem href='/leasing' text={t('leasing')} onClick={onClose} />
          <MenuItem href='/about' text={t('about')} onClick={onClose} />
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const t = useTranslations('header');

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
      <IoIosSearch
        className="text-3xl cursor-pointer"
        onClick={togglePopup}
      />
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
              placeholder={t('search_placeholder')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = router;

  const handleChange = (newLocale) => {
    router.push(router.pathname, router.pathname, { locale: newLocale });
  };

  // Flag images (make sure to adjust paths to where your flags are stored)
  const flags = {
    en: "/flags/en.png", // English flag
    fr: "/flags/fr.png", // French flag
    ar: "/flags/ar.png", // Arabic flag
  };

  return (
    <div className="flex gap-2">
      {i18n.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`w-7 h-7 rounded-full transition-transform ${locale === loc ? "ring-2 ring-primary scale-110" : "opacity-70 hover:opacity-100"
            }`}
          aria-label={`Switch to ${loc}`}
        >
          <img
            src={flags[loc]}
            alt={`Flag of ${loc}`}
            className="w-full h-full object-cover rounded-full border border-black"
          />
        </button>
      ))}
    </div>
  );
}
