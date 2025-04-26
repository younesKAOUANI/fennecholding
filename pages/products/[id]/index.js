"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

// Skeleton Component (unchanged)
const ProductPageSkeleton = () => (
  <main className="!pt-20 bg-white">
    <div className="section">
      <div className="h-10 w-1/2 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-8"></div>
      <div className="flex justify-center w-full gap-6 items-center h-[650px]">
        <div className="flex-1 h-[650px] bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg"></div>
        <div className="flex flex-col gap-2 h-[500px] w-24">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`skeleton-thumb-${index}`}
              className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-12">
        <div>
          <div className="h-8 w-1/3 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4"></div>
          <div className="h-24 w-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-8"></div>
          <div className="h-8 w-1/3 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4"></div>
          <div className="h-24 w-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
          <div className="flex gap-4 mt-8">
            <div className="h-12 w-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
            <div className="h-12 w-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
          </div>
        </div>
        <div>
          <div className="h-8 w-1/3 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4"></div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`skeleton-highlight-${index}`} className="mb-4">
              <div className="h-6 w-1/2 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="h-16 w-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
);

// Main ProductPage Component
export default function ProductPage() {
  const locale = useLocale(); // Dynamically get the current locale
  const t = useTranslations("ProductPage");
  const params = useParams() || {};
  const id = params.id; // Directly use params.id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate the ID
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
        console.log("Selected translation locale:", selectedTranslation.locale); // Debug log
        setProduct({
          ...data.product,
          name: selectedTranslation.name || t("unnamedProduct"),
          specifications: selectedTranslation.specifications || t("noSpecifications"),
          configurations: selectedTranslation.configurations || t("noConfigurations"),
          highlights: Array.isArray(selectedTranslation.highlights) ? selectedTranslation.highlights : [],
          images: Array.isArray(data.product.images) ? data.product.images : ["/placeholder.png"],
        });
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(err.message);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id, locale, t]); // Include locale in dependencies

  if (loading) return <ProductPageSkeleton />;

  if (error || !product) {
    return (
      <div className="text-center py-10 text-red-600">
        {error || t("productNotFound")}
      </div>
    );
  }

  return (
    <main className="!pt-20 bg-white">
      <div className="section">
        <h1 className="font-bold text-4xl text-left mb-8">{product.name}</h1>

        {/* Product Gallery */}
        <ProductGallery productData={product} />

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-8 items-start mt-12">
          {/* Specifications & Configurations */}
          <div>
            <p className="font-bold text-2xl mb-4">{t("specificationsTitle")}</p>
            <p>{product.specifications}</p>

            <p className="font-bold text-2xl mb-4 mt-8">{t("configurationsTitle")}</p>
            <p>{product.configurations}</p>

            <div className="flex gap-4 items-center justify-start mt-8">
              {product.brochure && (
                <Link
                  href={product.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold px-6 py-2 bg-primary text-white rounded-md hover:scale-95"
                >
                  {t("brochure")}
                </Link>
              )}
              {product.datasheet && (
                <Link
                  href={product.datasheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold px-6 py-2 bg-primary text-white rounded-md hover:scale-95"
                >
                  {t("datasheet")}
                </Link>
              )}
            </div>
          </div>

          {/* Highlights Section */}
          <div>
            <p className="font-semibold text-3xl mb-4">{t("highlightsTitle")}</p>
            {product.highlights.length > 0 ? (
              product.highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col gap-1 items-start mb-4">
                  <h3 className="font-bold text-lg flex items-center">
                    <span className="bg-primary mr-2 inline-block rounded-full w-2 h-2"></span>
                    {highlight.title || t("noHighlightTitle")}
                  </h3>
                  <p>{highlight.description || t("noHighlightDescription")}</p>
                </div>
              ))
            ) : (
              <p>{t("noHighlights")}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Product Gallery Component (unchanged)
function ProductGallery({ productData }) {
  const t = useTranslations("ProductPage");
  const [selectedImage, setSelectedImage] = useState(
    productData.images?.[0] || "/placeholder.png"
  );

  return (
    <div className="flex justify-center w-full gap-6 items-center h-[650px]">
      <div className="flex-1 flex justify-center items-center rounded-lg overflow-hidden">
        <div className="w-full h-[650px] rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt={productData.name || t("productImageAlt")}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto h-[500px]">
        {productData.images?.length > 0 ? (
          productData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`border-2 rounded-md overflow-hidden w-24 h-24 ${
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
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md"></div>
        )}
      </div>
    </div>
  );
}