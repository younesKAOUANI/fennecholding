"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
    "https://placehold.co/200x201.png",
    "https://placehold.co/200x202.png",
    "https://placehold.co/200x203.png",
    "https://placehold.co/200x204.png",
    "https://placehold.co/200x205.png",
    "https://placehold.co/200x206.png",
];

const clientImages = logos.map((src, index) => (
    <Image key={index} src={src} alt={`Client ${index + 1}`} width={150} height={150} className="w-full h-auto max-w-[100px]  md:w-auto lg:max-w-lg xl:max-w-xl" />
));
export default function TheyTrustedUs() {
    return (
        <section className="bg-white">
            <div className="section overflow-hidden">
                <h2 className="mb-8 font-semibold text-4xl text-center" data-aos="fade-down">Ils nous on fait confiance</h2>
                <motion.div
                    className='flex md:gap-12 gap-4 justify-center items-center'
                    animate={{ x: ['0%', '-100%', '0%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: 'linear',
                    }}
                    data-aos="fade-in"
                >
                    {clientImages}
                    {clientImages}
                    {clientImages}
                </motion.div>
            </div>
        </section>
    );
}