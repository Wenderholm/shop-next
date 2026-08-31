"use client";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import RightArrow from "../../icons/RightArrow";
import CarouselDots from "./CarouselDots";
import { useState } from "react";

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  // const category = categories[0];
  const [currentIndex, setCurrentIndex] = useState(0);

  const category = categories[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };
  return (
    <>
      <section
        className="
    relative
    w-full 
    max-w-[1360px]     
    lg:mx-10
    bg-[#222327] 
    rounded-md 
    border 
    border-[#383B42] 
    overflow-hidden"
      >
        <div className=" max-w-[433px] flex-col  sm:ml-[120px]">
          <h2 className="font-medium text-[32px]  leading-11 tracking-[-0.32px] text-[#FCFCFC] mb-6 pt-[132px]">
            {category.name}
          </h2>

          <p className="font-normal text-justify text-base leading-6.5 text-[#E7E7E7] mb-10">
            {category.description}
          </p>

          <Link
            href={`/products?category=${category.name}`}
            className="
    inline-flex
    gap-3.5
    rounded-md
    border
    border-orange
    pl-5
    py-3.5
    pr-5
    font-semibold
    text-[16px]
    leading-6
    text-orange
    mb-20
  "
          >
            Explore Category <RightArrow className="w-6 h-6" />
          </Link>
        </div>
        <div
          className={
            category.name === "Mouse"
              ? "hidden md:absolute md:-inset-y-62.5 md:right-[clamp(120px,18vw,250px)] md:block md:w-[clamp(160px,24vw,443px)]"
              : "hidden md:absolute md:right-[clamp(24px,8vw,120px)] md:top-1/2 md:block md:w-[clamp(160px,28vw,443px)] md:-translate-y-1/2"
          }
        >
          <Image
            src={category.image}
            alt={category.name}
            width={443}
            height={853}
            className={`h-auto w-full ${
              category.name === "Mouse" ? "rotate-[-34.55deg]" : ""
            }`}
          />
        </div>
        <button
          type="button"
          // top-1/2 to samo co top-[50%]→ ustawia górną krawędź przycisku na 50% wysokości sekcji.
          // -translate-y-1/2 → przesuwa przycisk do góry o połowę jego własnej wysokości.
          className="
    absolute
    top-1/2 
    -translate-y-1/2
    left-0
    flex
    h-[74px]
    w-[44px]
    items-center
    justify-center
    rounded-br-md
    rounded-tr-md
    bg-[#F29145]
  "
          onClick={handlePrevious}
        >
          <ArrowLeftIcon />
        </button>

        <button
          type="button"
          className="
    absolute
    top-1/2
    -translate-y-1/2
    right-0
    flex
    h-[74px]
    w-[44px]
    items-center
    justify-center
    rounded-bl-[6px]
    rounded-tl-[6px]
    bg-[#F29145]
  "
          onClick={handleNext}
        >
          <ArrowRightIcon />
        </button>
      </section>
      <div className="mt-6 flex justify-center">
        <CarouselDots total={categories.length} currentIndex={currentIndex} />
      </div>
    </>
  );
}
