"use client";

import { useRef, useState } from "react";

import { Brand } from "@/types/brand";

import BrandCard from "./BrandCard";
import SeeAllButton from "./SeeAllButton";
import LeftArrow from "@/components/icons/navigation/LeftArrow";
import RightArrow from "@/components/icons/navigation/RightArrow";

interface BrandListProps {
  brands: Brand[];
}

export default function BrandList({ brands }: BrandListProps) {
  const [showAll, setShowAll] = useState(false);
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
      <div className="mb-8 flex items-center justify-between">
        <h2
          className="font-medium
        text-[28px]
        leading-10
        tracking-[-0.01em]
      text-foreground"
        >
          Brand
        </h2>
        <div className=" items-center gap-3.5 hidden lg:flex">
          <SeeAllButton showAll={showAll} setShowAll={setShowAll} />
          <RightArrow className="w-6 h-6" />
        </div>
      </div>
      <div className="lg:hidden">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="min-w-[calc(50%-8px)]
                shrink-0
                snap-start"
            >
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous brands"
            className="rounded-full border px-3 py-2"
          >
            <LeftArrow className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next brands"
            className="rounded-full border px-3 py-2"
          >
            <RightArrow className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      <div className="hidden overflow-hidden lg:block">
        <div
          className={`
            flex
            gap-8
            transition-transform
            duration-500
            ${showAll ? "-translate-x-30" : "translate-x-0"}
          `}
        >
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </>
  );
}
