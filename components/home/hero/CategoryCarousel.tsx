"use client";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../../icons/navigation/ArrowRightIcon";
import ArrowLeftIcon from "../../icons/navigation/ArrowLeftIcon";
import RightArrow from "../../icons/navigation/RightArrow";
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
    max-w-340     
    lg:mx-10
    bg-surface-elevated 
    rounded-md 
    border 
    border-border-default 
    overflow-hidden"
      >
        <div className=" max-w-108.25 flex-col px-3 sm:ml-30">
          <h2 className="font-medium text-[32px] text-center leading-11 tracking-[-0.32px] text-foreground mb-6 pt-5 sm:pt-33">
            {category.name}
          </h2>

          <p className="font-normal text-justify text-base leading-6.5 text-foreground-soft mb-10">
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
    bottom-1
    sm:top-1/2 
    sm:-translate-y-1/2
    left-0
    flex
    h-18.5
    w-11
    items-center
    justify-center
    rounded-br-md
    rounded-tr-md
    bg-orange
  "
          onClick={handlePrevious}
        >
          <ArrowLeftIcon />
        </button>

        <button
          type="button"
          className="
    absolute
    bottom-1
    sm:top-1/2 
    sm:-translate-y-1/2
    right-0
    flex
    h-18.5
    w-11
    items-center
    justify-center
    rounded-bl-md
    rounded-tl-md
    bg-orange
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
