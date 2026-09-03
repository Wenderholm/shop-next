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
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[422px_minmax(0,1fr)_420px] lg:items-start lg:gap-10.5">
      {/* LEWA STRONA - ZDJĘCIE */}
      <ProductGallery
        imageUrls={product.imageUrls}
        productName={product.name}
      />

      {/* ŚRODEK - INFORMACJE */}
      <div className="max-w-105 pt-2 ">
        <h1 className="text-[28px] font-medium leading-10 tracking-[-0.01em] text-foreground">
          {product.name}
        </h1>

        <div className="mt-5 inline-flex rounded-md bg-brand-strong px-2.5 py-1.5 text-sm font-medium leading-6 text-foreground">
          {product.category.name}
        </div>

        <p className="mt-8 text-[32px] font-medium leading-11 tracking-[-0.01em] text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <p
          className={`mt-8 text-base leading-6.5 text-foreground ${isShowDescription ? "" : "line-clamp-1"}`}
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

        <div className="mt-8">
          <p className="text-lg font-medium leading-7 text-foreground-dim">
            Shipping Available
          </p>

          <div className="mt-3.5 flex max-w-83 justify-center gap-2 rounded-md border border-foreground px-5 py-4">
            <div className="">
              <GreenShield />
            </div>

            <div>
              <p className="text-base font-medium text-white">
                NexusHub Courier
              </p>
              <p className="mt-2 text-base text-foreground-soft">
                Estimated arrival {currentDate} - {estimatedDateString}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRAWA STRONA - PANEL ZAKUPU */}
      <div className="h-fit rounded-lg border border-border-strong bg-surface p-6 lg:p-6">
        <div>
          <p className="text-lg font-medium leading-7 text-foreground-dim">
            Colors
          </p>

          <div className="mt-3.5 flex items-center gap-4">
            <button
              type="button"
              aria-label="Selected white color"
              className="flex h-13.5 w-13.5 items-center justify-center rounded-lg border border-[#F3F3F3] bg-[#F8F8F8] text-[#1D1D1D]"
              onClick={() => setSelectedColor("white")}
            >
              {selectedColor === "white" && <CheckIcon className="w-6 h-6" />}
            </button>

            <button
              type="button"
              aria-label="Alternate dark color"
              className="flex h-13.5 w-13.5 items-center justify-center rounded-lg border border-border-default bg-surface-elevated"
              onClick={() => setSelectedColor("dark")}
            >
              {selectedColor === "dark" && (
                <CheckIcon className="w-6 h-6" color="#FCFCFC" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-lg font-medium leading-7 text-foreground-dim">
            Quantity
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-14 items-center rounded-lg border border-[#D5D5D5] px-4 text-foreground">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center text-[34px] font-light leading-none text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                disabled={quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>

              <span className="min-w-7 text-center text-base font-medium">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center text-[34px] font-light leading-none text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                disabled={quantity >= product.stock}
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
              >
                +
              </button>
            </div>

            <p className="text-base text-foreground">
              Stock : <span className="text-white">{product.stock}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-6">
          <p className="text-[18px] font-medium text-[#A3A3A3]">Subtotal</p>
          <p className="text-[28px] font-medium leading-10 tracking-[-0.01em] text-white">
            ${subtotal}
          </p>
        </div>

        <button
          className="mt-8 flex h-15 w-full items-center justify-center gap-3 rounded-lg border border-orange bg-transparent px-4 text-base font-medium leading-6.5 text-orange transition hover:bg-[#2F2A24]"
          onClick={handleAddToCart}
        >
          Add to Cart
          <CartIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
