import { Product } from "@/types/product";
import Link from "next/link";
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div>
        <h2>{product.name}</h2>
        <p>{product.price} zł</p>
        <p>{product.stock} szt.</p>
        <img src={product.imageUrl} alt={product.name} />
        <p>Kategoria: {product.category.name}</p>
        <p>Marka: {product.brand.name}</p>
      </div>
    </Link>
  );
}
