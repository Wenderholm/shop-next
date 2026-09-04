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
    <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#A1A1AA] sm:mb-8 sm:text-sm lg:mb-10 lg:text-base">
      <Link href="/products">Product</Link>

      <span>›</span>

      <Link href={`/products?category=${categoryName}`}>{categoryName}</Link>

      <span>›</span>

      <span className="break-words text-white">{productName}</span>
    </nav>
  );
}
