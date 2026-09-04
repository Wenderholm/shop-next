import Link from "next/link";

interface CheckoutBreadcrumbProps {
  breadcrumbLabel: string;
}

export default function CheckoutBreadcrumb({
  breadcrumbLabel,
}: CheckoutBreadcrumbProps) {
  return (
    <div className="mb-14 flex flex-wrap items-center gap-3 border-t border-border-default pt-8 text-sm text-foreground-dim lg:text-base">
      <Link href="/" className="hover:text-white">
        Home
      </Link>
      <span className="text-foreground-subtle">›</span>
      <Link href="/products" className="hover:text-white">
        Product
      </Link>
      <span className="text-foreground-subtle">›</span>
      <span>{breadcrumbLabel}</span>
      <span className="text-foreground-subtle">›</span>
      <span className="font-medium text-white">Checkout</span>
    </div>
  );
}
