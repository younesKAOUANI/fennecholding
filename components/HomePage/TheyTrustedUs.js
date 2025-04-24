"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  "https://placehold.co/200x201.png",
  "https://placehold.co/200x202.png",
  "https://placehold.co/200x203.png",
  "https://placehold.co/200x204.png",
  "https://placehold.co/200x205.png",
  "https://placehold.co/200x206.png",
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-50">
      <div className="section overflow-hidden px-4 !pb-12 md:px-6 lg:px-8">
        <p className="text-primary font-semibold text-lg mb-6" data-aos="fade-up">
          {t("partners_label")}
        </p>
        <h2
          className="mb-8 font-semibold text-4xl text-left rtl:text-right"
          data-aos="fade-down"
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
                  width={150}
                  height={150}
                  className="w-full h-auto max-w-[100px] md:max-w-[120px] lg:max-w-[150px] mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}