"use client";
import { Product } from "@/types/product";
import React from "react";
import ProductGallery from "./ProductGallery";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = React.useState(1);
  const subtotal = Number((product.price * quantity).toFixed(2));

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[422px_minmax(0,1fr)_420px] lg:items-start lg:gap-10.5">
      {/* LEWA STRONA - ZDJĘCIE */}
      <ProductGallery
        imageUrls={product.imageUrls}
        productName={product.name}
      />

      {/* ŚRODEK - INFORMACJE */}
      <div className="max-w-105 pt-2">
        <h1 className="text-[48px] font-medium leading-[1.1] tracking-[-0.03em] text-white">
          {product.name}
        </h1>

        <div className="mt-7 inline-flex rounded-lg bg-[#E5610A] px-4 py-2 text-sm font-medium text-white">
          {product.category.name}
        </div>

        <p className="mt-10 text-[56px] font-medium leading-none tracking-[-0.04em] text-white">
          ${product.price.toFixed(2)}
        </p>

        <p className="mt-12 max-w-97.5 text-[20px] leading-normal text-[#E5E5E5]">
          {product.description}
        </p>

        <button
          type="button"
          className="mt-4 text-[16px] font-medium text-[#E58A3A] transition hover:text-[#F09B55]"
        >
          View More
        </button>

        <div className="mt-16">
          <p className="text-[18px] font-medium text-[#A3A3A3]">
            Shipping Available
          </p>

          <div className="mt-5 flex max-w-83 items-start gap-4 rounded-[10px] border border-[#DDDDDD] bg-transparent px-5 py-4">
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#22C55E] text-[#22C55E]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <div>
              <p className="text-[16px] font-medium text-white">
                {product.brand.name} Courier
              </p>
              <p className="mt-2 text-[16px] text-[#D4D4D4]">
                Estimated arrival 30 Sep - 3 Oct
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRAWA STRONA - PANEL ZAKUPU */}
      <div className="h-fit rounded-lg border border-[#353535] bg-[#262626] px-6 py-8 lg:px-6.5">
        <div>
          <p className="text-[18px] font-medium text-[#A3A3A3]">Colors</p>

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              aria-label="Selected white color"
              className="flex h-14.5 w-14.5 items-center justify-center rounded-lg border border-[#F3F3F3] bg-[#F8F8F8] text-[#1D1D1D]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Alternate dark color"
              className="h-14.5 w-14.5 rounded-lg border border-[#3A3F4A] bg-[#272932]"
            />
          </div>
        </div>

        <div className="mt-9">
          <p className="text-[18px] font-medium text-[#A3A3A3]">Quantity</p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-14.5 items-center rounded-lg border border-[#D5D5D5] px-4 text-white">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center text-[34px] font-light leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>

              <span className="min-w-7 text-center text-[18px] font-medium">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center text-[34px] font-light leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={quantity >= product.stock}
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
              >
                +
              </button>
            </div>

            <p className="text-[16px] text-white">
              Stock : <span className="text-white">{product.stock}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <p className="text-[18px] font-medium text-[#A3A3A3]">Subtotal</p>
          <p className="text-[40px] font-medium leading-none tracking-[-0.04em] text-white">
            ${subtotal}
          </p>
        </div>

        <button className="mt-10 flex h-15 w-full items-center justify-center gap-3 rounded-lg border border-[#E58A3A] bg-transparent px-4 text-[18px] font-medium text-[#F59A41] transition hover:bg-[#2F2A24]">
          Add to Cart
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.9a1 1 0 0 0 1-.8L21 7H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
