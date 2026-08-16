import { Product } from "@/types/product";

import ProductCard from "./ProductCard";

interface RecommendationListProps {
  products: Product[];
  showAll: boolean;
}

export default function RecommendationList({
  products,
  showAll,
}: RecommendationListProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={`
          flex
          gap-8
          transition-transform
          duration-500
          ${showAll ? "-translate-x-[634px]" : "translate-x-0"}
        `}
      >
        {products.map((product) => (
          <div key={product.id} className="w-[300px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
