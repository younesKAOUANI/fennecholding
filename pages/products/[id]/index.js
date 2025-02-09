"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Prevent fetching if `id` is undefined

    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error || !product) return <div className="text-center py-10">Product not found</div>;

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
            <p className="font-bold text-2xl mb-4">Specification</p>
            <p>{product.specification}</p>

            <p className="font-bold text-2xl mb-4 mt-8">Configurations</p>
            <p>{product.configurations}</p>

            <div className="flex gap-4 items-center justify-start mt-8">
              <Link href="#" className="text-xl font-semibold px-6 py-2 bg-primary text-white rounded-md hover:scale-95">
                Brochure
              </Link>
              <Link href="#" className="text-xl font-semibold px-6 py-2 bg-primary text-white rounded-md hover:scale-95">
                Datasheet
              </Link>
            </div>
          </div>

          {/* Highlights Section */}
          <div>
            <p className="font-semibold text-3xl mb-4">A la une</p>
            {product.highlights?.map((highlight) => (
              <div key={highlight.title} className="flex flex-col gap-1 items-start mb-4">
                <h3 className="font-bold text-lg flex items-center">
                  <span className="bg-primary mr-2 inline-block rounded-full w-2 h-2"></span>
                  {highlight.title}
                </h3>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* 🔹 Product Gallery Component */
function ProductGallery({ productData }) {
  const [selectedImage, setSelectedImage] = useState(productData.img?.[0] || "");

  return (
    <div className="flex justify-center w-full gap-6 items-center h-[500px]">
      {/* Main Image */}
      <div className="flex-1 flex justify-center items-center rounded-lg overflow-hidden">
        <div className="w-full h-[500px] rounded-lg  overflow-hidden">
          <Image
            src={selectedImage}
            alt={productData.name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-col gap-2 overflow-y-auto h-[500px]">
        {productData.img?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`border-2 rounded-md overflow-hidden w-24 h-24 ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={image  }
              alt={productData.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
