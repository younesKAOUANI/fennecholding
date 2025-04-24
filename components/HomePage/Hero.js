"use client";
import Image from "next/image";
import React from "react";
import { Link } from "next-intl";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const placeholderImages = [
    "https://placehold.co/124x124.png",
    "https://placehold.co/124x124.png",
    "https://placehold.co/124x124.png",
    "https://placehold.co/124x124.png",
    "https://placehold.co/124x124.png",
    "https://placehold.co/124x124.png",
  ];

  return (
    <section className="relative w-full min-h-screen bg-gray-50 overflow-hidden border-b-4 border-primary/60">
      <div className="container mx-auto !pt-32 px-4 py-12 md:py-16 lg:py-20 flex items-center justify-center h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6" data-aos="fade-right" data-aos-duration="800">
            <h1 className="text-xl md:text-2xl font-semibold text-primary">Fennec Holding</h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {t("title")}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
              {placeholderImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Placeholder ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-auto rounded-md hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
            <div className="text-base sm:text-lg text-gray-600 pt-4 border-t-2 border-gray-800">
              <p>{t("subtitle")}</p>
            </div>
          </div>
          <div className="flex justify-center" data-aos="fade-left" data-aos-duration="800">
            <Image
              src="/images/main-hero.png"
              alt="Hero Image"
              width={500}
              height={500}
              className="rounded-sm w-full max-w-md md:max-w-lg h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)]"
            />

          </div>
        </div>
      </div>
    </section>
  );
}