import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="
        flex
        flex-col
        overflow-hidden
        rounded-md
        border
        border-[#383B42]
        bg-[#262626]
      "
    >
      <div className="relative p-4 pb-[18px] justify-center items-center flex w-full">
        <AddToCartButton product={product} />

        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={280}
          className="h-full w-full object-contain rounded-[6px]"
        />
      </div>

      <div className="px-4 pb-5">
        <span className="inline-flex items-center rounded bg-[#E5610A] px-[10px] py-[6px] text-[14px] font-medium text-[#FDEDD7]">
          {product.category.name}
        </span>

        <h3 className="mt-4 text-[18px] leading-7 text-[#FCFCFC]">
          {product.name}
        </h3>

        <p className="mt-2 font-semibold text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
