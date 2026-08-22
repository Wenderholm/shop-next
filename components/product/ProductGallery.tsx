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

  return (
    <div>
      {/* GŁÓWNE ZDJĘCIE */}
      <div className="flex h-[420px] w-[422px] items-center justify-center rounded-md border border-[#383B42] bg-[#262626] p-3">
        <Image
          src={selectedImage}
          alt={productName}
          width={500}
          height={500}
          className="h-full w-full rounded-md object-cover"
        />
      </div>

      {/* MINIATURY */}
      <div className="mt-8 flex gap-4">
        {imageUrls.map((image, index) => {
          const active = selectedImage === image;

          return (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`
                flex h-[100px] w-[130px]
                items-center justify-center
                rounded-md border 
                ${active ? "border-[#E5610A]" : "border-[#383B42]"}
              `}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                width={100}
                height={100}
                className="h-full w-full rounded-md object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
