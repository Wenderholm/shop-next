import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
  categoryName: string;
}

export default function ProductBreadcrumb({
  productName,
  categoryName,
}: ProductBreadcrumbProps) {
  return (
    <nav className="mb-10 flex items-center gap-2 text-[16px] text-[#A1A1AA]">
      <Link href="/products">Product</Link>

      <span>›</span>

      <Link href={`/products?category=${categoryName}`}>{categoryName}</Link>

      <span>›</span>

      <span className="text-white">{productName}</span>
    </nav>
  );
}
