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
    <nav className="mb-5 text-[14px] gap-5 sm:mb-10 flex justify-center sm:justify-start flex-row sm:gap-12 sm:text-base font-semibold leading-6.5">
      <Link
        href="/"
        className={pathname === "/" ? "text-orange" : "text-foreground-dim"}
      >
        Home
      </Link>

      <Link
        href="/products"
        className={
          pathname === "/products" ? "text-orange" : "text-foreground-dim"
        }
      >
        Products
      </Link>

      <Link
        href="/contact"
        className={
          pathname === "/contact" ? "text-orange" : "text-foreground-dim"
        }
      >
        Contact
      </Link>
    </nav>
  );
}
