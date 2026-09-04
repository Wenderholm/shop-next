import ProductDetails from "@/components/product/ProductDetails";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/products/${id}`);

  if (!response.ok) {
    notFound();
  }

  const product: Product = await response.json();
  return (
    <div className="px-4 pb-10 sm:px-6 lg:px-8">
      <ProductBreadcrumb
        productName={product.name}
        categoryName={product.category.name}
      />

      <ProductDetails product={product} />
    </div>
  );
}
