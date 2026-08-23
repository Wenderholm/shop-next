"use client";

import { useState } from "react";

import { Brand } from "@/types/brand";

import BrandCard from "./BrandCard";
import SeeAllButton from "./SeeAllButton";
import RightArrow from "@/components/icons/RightArrow";

interface BrandListProps {
  brands: Brand[];
}

export default function BrandList({ brands }: BrandListProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2
          className="font-medium
        text-[28px]
        leading-10
        tracking-[-0.01em]
      text-[#FCFCFC]"
        >
          Brand
        </h2>
        <div className="flex items-center gap-[14px]">
          <SeeAllButton showAll={showAll} setShowAll={setShowAll} />
          <RightArrow className="w-6 h-6"/>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className={`
            flex
            gap-[32px]
            transition-transform
            duration-500
            ${showAll ? "-translate-x-[120px]" : "translate-x-0"}
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
