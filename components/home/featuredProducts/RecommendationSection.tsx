"use client";
import { Product } from "@/types/product";
import RecommendationList from "./RecommendationList";
import SeeAllButton from "./SeeAllButton";
import { useState } from "react";
import RightArrow from "@/components/icons/navigation/RightArrow";

interface RecommendationSectionProps {
  products: Product[];
}

export default function RecommendationSection({
  products,
}: RecommendationSectionProps) {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="mb-25 lg:mx-10 ">
      <div className="mb-8 flex items-center justify-between">
        <h2
          className="font-medium
        text-[28px]
        leading-10
        tracking-[-0.01em]
      text-[#FCFCFC]"
        >
          Recommendation
        </h2>
        <div className=" items-center gap-[14px] hidden lg:flex">
          {products.length > 4 && (
            <>
              <SeeAllButton showAll={showAll} setShowAll={setShowAll} />
              <RightArrow className="w-6 h-6" />
            </>
          )}
        </div>
      </div>

      <RecommendationList products={products} showAll={showAll} />
    </section>
  );
}
