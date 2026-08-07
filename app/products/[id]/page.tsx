import ProductDetails from "@/components/product/ProductDetails";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/products/${id}`);

  if (!response.ok) {
    notFound();
  }

  const product: Product = await response.json();
  return <ProductDetails product={product} />;
}
