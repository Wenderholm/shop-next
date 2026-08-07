import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price} zł</p>
      <p>{product.stock} szt.</p>
      <p>{product.category.name}</p>
      <p>{product.brand.name}</p>
    </div>
  );
}
