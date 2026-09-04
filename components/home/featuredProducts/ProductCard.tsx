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
        border-border-default
        bg-[#262626]
      "
    >
      <div className="relative p-4 pb-4.5 justify-center items-center flex w-full">
        <AddToCartButton product={product} />

        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={300}
          height={280}
          className="h-45 w-full  rounded-md sm:h-44 md:h-56 lg:h-64"
        />
      </div>

      <div className="px-4 pb-5">
        <span className="inline-flex items-center rounded bg-brand-strong px-2.5 py-1.5 text-[14px] font-medium text-accent-soft">
          {product.category.name}
        </span>

        <h3 className="mt-4 text-[18px] leading-7 text-foreground">
          {product.name}
        </h3>

        <p className="mt-2 text-2xl font-semibold leading-8 tracking-[-0.01em] text-foreground sm:text-[28px] sm:leading-10">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
