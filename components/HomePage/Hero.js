"use client";
import Image from "next/image";
import React from "react";
import { Link } from "next-intl";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const placeholderImages = [
    "/logos/1.png",
    "/logos/2.png",
    "/logos/3.png",
    "/logos/4.png",
    "/logos/5.png",
    "/logos/6.png",
  ];

  return (
    <section className="relative w-full min-h-screen bg-gray-50 overflow-hidden border-b-4 border-primary/60">
      <div className="container mx-auto pt-32 px-4 py-12 md:py-16 lg:py-20 flex items-center justify-center min-h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6" data-aos="fade-right" data-aos-duration="800">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary">Fennec Holding</h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("title")}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
              {placeholderImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Placeholder ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-auto rounded-md hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-600 pt-4 border-t-2 border-gray-800">
              <p>{t("subtitle")}</p>
            </div>
          </div>
          <div className="flex justify-center" data-aos="fade-left" data-aos-duration="800">
            <Image
              src="/images/main-hero.png"
              alt="Hero Image"
              width={400}
              height={400}
              className="rounded-sm w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
