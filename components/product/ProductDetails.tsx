"use client";
import { Product } from "@/types/product";
import React, { useState } from "react";
import ProductGallery from "./ProductGallery";
import GreenShield from "../icons/ui/GreenShield";
import CheckIcon from "../icons/ui/CheckIcon";
import CartIcon from "../icons/ui/CartIcon";
import { useCartNotification } from "@/contexts/CartNotificationContext";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);
  const estimatedDateString = estimatedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const { showNotification } = useCartNotification();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const subtotal = Number((product.price * quantity).toFixed(2));

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (await addToCart(product, quantity)) showNotification();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[422px_minmax(0,1fr)_420px] lg:items-start lg:gap-10.5">
      {/* LEWA STRONA - ZDJĘCIE */}
      <ProductGallery
        imageUrls={product.imageUrls}
        productName={product.name}
      />

      {/* ŚRODEK - INFORMACJE */}
      <div className="max-w-105 pt-1 sm:pt-2">
        <h1 className="text-2xl font-medium leading-8 tracking-[-0.01em] text-foreground sm:text-[26px] sm:leading-9 lg:text-[28px] lg:leading-10">
          {product.name}
        </h1>

        <div className="mt-3 inline-flex rounded-md bg-brand-strong px-2.5 py-1.5 text-sm font-medium leading-6 text-foreground sm:mt-4 lg:mt-5">
          {product.category.name}
        </div>

        <p className="mt-4 text-[28px] font-medium leading-9 tracking-[-0.01em] text-foreground sm:mt-6 sm:text-[30px] sm:leading-10 lg:mt-8 lg:text-[32px] lg:leading-11">
          ${product.price.toFixed(2)}
        </p>
        <p
          className={`mt-4 text-sm leading-6 text-foreground sm:mt-6 sm:text-base sm:leading-6.5 lg:mt-8 ${isShowDescription ? "" : "line-clamp-1"}`}
        >
          {product.description}
        </p>
        <button
          type="button"
          className="text-base font-medium leading-6.5 text-orange transition hover:text-[#F09B55]"
          onClick={() => setIsShowDescription(!isShowDescription)}
        >
          {isShowDescription ? "View Less" : "View More"}
        </button>

        <div className="mt-5 sm:mt-6 lg:mt-8">
          <p className="text-base font-medium leading-6 text-foreground-dim sm:text-lg sm:leading-7">
            Shipping Available
          </p>

          <div className="mt-3 flex max-w-full justify-center gap-2 rounded-md border border-foreground px-4 py-3 sm:mt-3.5 sm:max-w-83 sm:px-5 sm:py-4">
            <div className="">
              <GreenShield />
            </div>

            <div>
              <p className="text-sm font-medium text-white sm:text-base">
                NexusHub Courier
              </p>
              <p className="mt-1 text-sm text-foreground-soft sm:mt-2 sm:text-base">
                Estimated arrival {currentDate} - {estimatedDateString}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRAWA STRONA - PANEL ZAKUPU */}
      <div className="h-fit rounded-lg border border-border-strong bg-surface p-4 sm:p-5 lg:p-6">
        <div>
          <p className="text-base font-medium leading-6 text-foreground-dim sm:text-lg sm:leading-7">
            Colors
          </p>

          <div className="mt-3 flex items-center gap-3 sm:mt-3.5 sm:gap-4">
            <button
              type="button"
              aria-label="Selected white color"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#F3F3F3] bg-[#F8F8F8] text-[#1D1D1D] sm:h-13.5 sm:w-13.5"
              onClick={() => setSelectedColor("white")}
            >
              {selectedColor === "white" && <CheckIcon className="w-6 h-6" />}
            </button>

            <button
              type="button"
              aria-label="Alternate dark color"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-default bg-surface-elevated sm:h-13.5 sm:w-13.5"
              onClick={() => setSelectedColor("dark")}
            >
              {selectedColor === "dark" && (
                <CheckIcon className="w-6 h-6" color="#FCFCFC" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 lg:mt-8">
          <p className="text-[18px] font-medium leading-6 text-foreground-dim sm:text-lg sm:leading-7">
            Quantity
          </p>

          <div className="mt-3.5 flex flex-col sm:flex-row items-center gap-3 sm:mt-5">
            <div className="flex h-12 w-full sm:w-auto items-center justify-between rounded-lg border border-[#D5D5D5] px-4 text-foreground sm:h-14 sm:max-w-55 sm:justify-start">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center text-[30px] font-light leading-none text-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:text-[34px]"
                disabled={quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>

              <span className="min-w-7 flex-1 text-center text-base font-medium sm:flex-none">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center text-[30px] font-light leading-none text-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:text-[34px]"
                disabled={quantity >= product.stock}
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
              >
                +
              </button>
            </div>

            <p className="text-sm text-foreground sm:text-base">
              Stock : <span className="text-white">{product.stock}</span>
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:justify-between items-center gap-1 text-center sm:mt-6 lg:mt-8">
          <p className="text-base font-medium text-[#A3A3A3] sm:text-[18px]">
            Subtotal
          </p>
          <p className="text-2xl font-medium leading-8 tracking-[-0.01em] text-white sm:text-[26px] sm:leading-9 lg:text-[28px] lg:leading-10">
            ${subtotal}
          </p>
        </div>

        <button
          className="mt-5 flex h-13 w-full items-center justify-center gap-3 rounded-lg border border-orange bg-transparent px-4 text-sm font-medium leading-6 text-orange transition hover:bg-[#2F2A24] sm:mt-6 sm:h-15 sm:text-base sm:leading-6.5 lg:mt-8"
          onClick={handleAddToCart}
        >
          Add to Cart
          <CartIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
