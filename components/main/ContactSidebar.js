import Link from 'next/link'
import React, { useState } from 'react'
import { FaInstagram, FaPhoneAlt, FaEnvelope, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ContactSidebar() {
    const [showSocials, setShowSocials] = useState(false);

    return (
        <aside className="fixed bottom-12 right-4 z-50 w-12 h-auto p-4">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* Phone */}
                <div className="relative group">
                    <Link href="tel:+1234567890">
                        <FaPhoneAlt className="text-2xl text-primary cursor-pointer" />
                    </Link>
                    <div className="absolute right-10 hidden min-w-32 group-hover:flex items-center bg-white text-primary text-sm font-semibold rounded-md px-3 py-1 shadow-md">
                        +1 234 567 890
                    </div>
                </div>

                {/* Email */}
                <div className="relative group">
                    <Link href="mailto:contact@fennecholding.dz">
                        <FaEnvelope className="text-2xl text-primary cursor-pointer" />
                    </Link>
                    <div className="absolute right-10 hidden group-hover:flex items-center bg-white text-primary text-sm font-semibold rounded-md px-3 py-1 shadow-md">
                    contact@fennecholding.dz
                    </div>
                </div>

                {/* Socials */}
                <div
                    className="relative group"
                    onMouseEnter={() => setShowSocials(true)}
                    onMouseLeave={() => setShowSocials(false)}
                >
                    {/* <motion.div
                        className="cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        <FaInstagram className="text-2xl text-primary" />
                    </motion.div>

                    {showSocials && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-10 bg-white shadow-lg rounded-md p-3 flex flex-col items-start space-y-2"
                        >
                            <Link href="https://instagram.com" target="_blank" className="flex items-center space-x-2 text-primary hover:underline">
                                <FaInstagram /> <span>Instagram</span>
                            </Link>
                            <Link href="https://facebook.com" target="_blank" className="flex items-center space-x-2 text-primary hover:underline">
                                <FaFacebook /> <span>Facebook</span>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" className="flex items-center space-x-2 text-primary hover:underline">
                                <FaLinkedin /> <span>LinkedIn</span>
                            </Link>
                        </motion.div>
                    )} */}
                </div>

                {/* Decorative Line and Text */}
                <hr className="-rotate-90 mb-12 border-2 w-8 border-primary" />
                <p className="-rotate-90 font-semibold text-xl">CONTACT</p>
            </div>
        </aside>
    )
}
