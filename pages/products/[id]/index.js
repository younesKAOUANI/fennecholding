"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Head from "next/head";

const ProductPageSkeleton = () => (
  <main className="!pt-16 md:pt-20 bg-white">
    <div className="section px-4 md:px-6 lg:px-8">
      <div className="h-8 md:h-10 w-3/4 md:w-1/2 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-6 md:mb-8"></div>
      <div className="flex flex-col md:flex-row justify-center w-full gap-4 md:gap-6 items-center">
        <div className="w-full md:flex-1 h-64 md:h-[500px] bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg"></div>
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto h-auto md:h-[400px] w-full md:w-20">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`skeleton-thumb-${index}`}
              className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
        <div>
          <div className="h-6 md:h-8 w-1/3 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4"></div>
          <div className="h-20 md:h-24 w-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-6 md:mb-8"></div>
          <div className="h-6 md:h-8 w-1/3 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4"></div>
          <div className="h-20 md:h-24 w-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
          <div className="flex gap-4 mt-6 md:mt-8">
            <div className="h-10 md:h-12 w-24 md:w-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
            <div className="h-10 md:h-12 w-24 md:w-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
          </div>
        </div>
        <div>
          <div className="h-6 md:h-8 w-1/3 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4"></div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`skeleton-highlight-${index}`} className="mb-4">
              <div className="h-5 md:h-6 w-1/2 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
);

export default function ProductPage() {
  const locale = useLocale();
  const t = useTranslations("ProductPage");
  const params = useParams() || {};
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !/^[a-f0-9]{24}$/.test(id)) {
      setError(t("invalidId"));
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? t("productNotFound") : t("fetchError"));
        return res.json();
      })
      .then((data) => {
        if (!data?.product) throw new Error(t("invalidData"));
        const translations = data.product.translations || [];
        const selectedTranslation = translations.find((t) => t.locale === locale) || translations[0] || {};
        setProduct({
          ...data.product,
          name: selectedTranslation.name || t("unnamedProduct"),
          specifications: selectedTranslation.specifications || t("noSpecifications"),
          configurations: selectedTranslation.configurations || t("noConfigurations"),
          highlights: Array.isArray(selectedTranslation.highlights)
            ? selectedTranslation.highlights
            : [],
          images: Array.isArray(data.product.images) ? data.product.images : ["/placeholder.png"],
        });
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(err.message);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id, locale, t]);

  if (loading) return <ProductPageSkeleton />;

  if (error || !product) {
    return (
      <div className="text-center py-10 text-red-600 text-sm md:text-base">
        {error || t("productNotFound")}
      </div>
    );
  }

  return (
    <main className="!pt-16 md:pt-20 bg-white">
      <Head>
        <title>{product.name} - Fennec Holding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="section px-4 md:px-6 lg:px-8">
        <h1 className="font-bold text-2xl md:text-4xl text-left mb-6 md:mb-8">
          {product.name}
        </h1>

        <ProductGallery productData={product} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
          <div>
            <p className="font-bold text-lg md:text-2xl mb-3 md:mb-4">
              {t("specificationsTitle")}
            </p>
            <p className="text-sm md:text-base">{product.specifications}</p>
            <p className="font-bold text-lg md:text-2xl mb-3 md:mb-4 mt-6 md:mt-8">
              {t("configurationsTitle")}
            </p>
            <p className="text-sm md:text-base">{product.configurations}</p>
            <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-start mt-6 md:mt-8">
              {product.brochure && (
                <Link
                  href={product.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-xl font-semibold px-4 md:px-6 py-2 bg-primary text-white rounded-md hover:scale-95"
                >
                  {t("brochure")}
                </Link>
              )}
              {product.datasheet && (
                <Link
                  href={product.datasheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-xl font-semibold px-4 md:px-6 py-2 bg-primary text-white rounded-md hover:scale-95"
                >
                  {t("datasheet")}
                </Link>
              )}
            </div>
          </div>

          <div>
            <p className="font-semibold text-xl md:text-3xl mb-3 md:mb-4">
              {t("highlightsTitle")}
            </p>
            {product.highlights.length > 0 ? (
              product.highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col gap-1 items-start mb-3 md:mb-4">
                  <h3 className="font-bold text-base md:text-lg flex items-center">
                    <span className="bg-primary mr-2 inline-block rounded-full w-2 h-2"></span>
                    {highlight || t("noHighlightTitle")}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-sm md:text-base">{t("noHighlights")}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductGallery({ productData }) {
  const t = useTranslations("ProductPage");
  const [selectedImage, setSelectedImage] = useState(productData.images?.[0] || "/placeholder.png");

  return (
    <div className="flex flex-col md:flex-row justify-center w-full gap-4 md:gap-6 items-center">
      <div className="w-full md:flex-1 rounded-lg overflow-hidden">
        <div className="w-full h-64 md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt={productData.name || t("productImageAlt")}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto h-auto md:h-[400px] w-full md:w-20">
        {productData.images?.length > 0 ? (
          productData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`border-2 rounded-md overflow-hidden w-20 h-20 flex-shrink-0 ${
                selectedImage === image ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={productData.name || t("thumbnailAlt")}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </button>
          ))
        ) : (
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md flex-shrink-0"></div>
        )}
      </div>
    </div>
  );
}