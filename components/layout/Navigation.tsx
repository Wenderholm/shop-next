"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationProps = {
  isAuthenticated: boolean;
};

export default function Navigation({ isAuthenticated }: NavigationProps) {
  const pathname = usePathname();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="flex flex-row gap-12 font-semibold text-[16px] leading-[26px] mb-10 ">
      <Link
        href="/"
        className={pathname === "/" ? "text-orange" : "text-[#B0B0B0]"}
      >
        Home
      </Link>

      <Link
        href="/products"
        className={pathname === "/products" ? "text-orange" : "text-[#B0B0B0]"}
      >
        Products
      </Link>

      <Link
        href="/contact"
        className={pathname === "/contact" ? "text-orange" : "text-[#B0B0B0]"}
      >
        Contact
      </Link>
    </nav>
  );
}
