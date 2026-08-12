import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import RightArrow from "../icons/RightArrow";
import CarouselDots from "./CarouselDots";
interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const category = categories[0];

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
        <div className=" max-w-[433px] flex-col ml-[120px]">
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
            Explore Category <RightArrow />
          </Link>
        </div>
        <div className="absolute inset-y-[-250px] right-[250px]">
          <Image
            src={category.image}
            alt={category.name}
            width={443}
            height={853}
            className="rotate-[-34.55deg]"
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
    rounded-br-[6px]
    rounded-tr-[6px]
    bg-[#F29145]
  "
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
        >
          <ArrowRightIcon />
        </button>
      </section>
      <div className="mt-6 flex justify-center">
        <CarouselDots />
      </div>
    </>
  );
}
