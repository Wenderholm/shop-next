"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  imageUrls: string[];
  productName: string;
}

export default function ProductGallery({
  imageUrls,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);
  const previewImages = imageUrls.slice(0, 3);

  return (
    <div>
      {/* GŁÓWNE ZDJĘCIE */}
      <div className="flex h-65 w-full max-w-105.5 items-center justify-center rounded-md border border-border-default bg-[#262626] p-3 sm:h-80 md:h-95 lg:h-105">
        <Image
          src={selectedImage}
          alt={productName}
          width={500}
          height={500}
          className="h-full w-full rounded-md "
        />
      </div>

      {/* MINIATURY */}
      <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3 lg:mt-8 lg:gap-4">
        {previewImages.map((image, index) => {
          const active = selectedImage === image;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`
                flex h-18 w-[calc((100%-16px)/3)] max-w-32.5
                items-center justify-center
                rounded-md border 
                sm:h-22
                sm:w-27.5
                lg:h-25
                lg:w-32.5
                ${active ? "border-brand-strong" : "border-border-default"}
              `}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                width={100}
                height={100}
                className="h-full w-full rounded-md z"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
