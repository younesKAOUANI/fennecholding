"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const images = [
  { src: "https://placehold.co/1080x600", alt: "Placeholder Image 1" },
  { src: "https://placehold.co/1080x500", alt: "Placeholder Image 2" },
  { src: "https://placehold.co/1080x700", alt: "Placeholder Image 3" },
  { src: "https://placehold.co/1080x800", alt: "Placeholder Image 4" },
  { src: "https://placehold.co/1080x500", alt: "Placeholder Image 5" },
];

export default function Hero() {


  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current].src}
          src={images[current].src}
          alt={images[current].alt}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>


      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-primary" : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
