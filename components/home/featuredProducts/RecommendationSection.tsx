"use client";
import { Product } from "@/types/product";
import RecommendationList from "./RecommendationList";
import SeeAllButton from "./SeeAllButton";
import { useState } from "react";
import RightArrow from "@/components/icons/RightArrow";

interface RecommendationSectionProps {
  products: Product[];
}

export default function RecommendationSection({
  products,
}: RecommendationSectionProps) {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="mb-20 lg:mx-10">
      <div className="mb-8 flex items-center justify-between">
        <h2
          className="font-medium
        text-[28px]
        leading-[40px]
        tracking-[-0.01em]
      text-[#FCFCFC]"
        >
          Recommendation
        </h2>
        <div className="flex items-center gap-[14px]">
          {products.length > 4 && (
            <>
              <SeeAllButton showAll={showAll} setShowAll={setShowAll} />
              <RightArrow />
            </>
          )}
        </div>
      </div>

      <RecommendationList products={products} showAll={showAll} />
    </section>
  );
}
