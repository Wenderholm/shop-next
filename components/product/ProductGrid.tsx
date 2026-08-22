"use client";
import { Product } from "@/types/product";

import ProductCard from "@/components/home/featuredProducts/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-x-12
        gap-y-8
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
