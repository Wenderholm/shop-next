"use client";

import Link from "next/link";
import CartIcon from "@/components/icons/ui/CartIcon";
import { useCart } from "@/contexts/CartContext";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${itemCount} items`}
      className="relative"
    >
      <CartIcon className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-xs font-bold text-[#262626]">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
