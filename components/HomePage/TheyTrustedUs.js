"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  "/logos/1.png",
  "/logos/2.png",
  "/logos/3.png",
  "/logos/4.png",
  "/logos/5.png",
  "/logos/6.png",
  "/logos/7.png",
  "/logos/8.png",
];

const clientImages = logos.map((src, index) => ({
  src,
  alt: `Client ${index + 1}`,
  id: index,
}));

export default function TheyTrustedUs() {
  const t = useTranslations("trusted");

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-50">
      <div className="section overflow-hidden px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <p className="text-primary font-semibold text-base md:text-lg mb-6" data-aos="fade-right">
          {t("partners_label")}
        </p>
        <h2
          className="mb-8 font-semibold text-3xl md:text-4xl text-left rtl:text-right"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          {t("title")}
        </h2>
        <div data-aos="fade-in">
          <Slider {...settings}>
            {clientImages.map((image) => (
              <div key={image.id} className="px-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={120}
                  className="w-full h-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[150px] mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}