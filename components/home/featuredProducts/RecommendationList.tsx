"use client";

import { useRef } from "react";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import LeftArrow from "@/components/icons/navigation/LeftArrow";
import RightArrow from "@/components/icons/navigation/RightArrow";

interface RecommendationListProps {
  products: Product[];
  showAll: boolean;
}

export default function RecommendationList({
  products,
  showAll,
}: RecommendationListProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth / 2;

    sliderRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* MOBILE */}

      <div className="lg:hidden">
        <div
          ref={sliderRef}
          className="
            flex
            gap-4
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            scrollbar-hide
          "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="
                min-w-[calc(50%-8px)]
                shrink-0
                snap-start
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="rounded-full border px-3 py-2"
          >
            <LeftArrow className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="rounded-full border px-3 py-2"
          >
            <RightArrow className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* DESKTOP */}

      <div className="hidden overflow-hidden lg:block">
        <div
          className={`
            flex
            gap-8
            transition-transform
            duration-500
            ${showAll ? "-translate-x-158.5" : "translate-x-0"}
          `}
        >
          {products.map((product) => (
            <div key={product.id} className="w-75 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
