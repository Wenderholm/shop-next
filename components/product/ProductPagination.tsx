"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
}

export default function ProductPagination({
  page,
  totalPages,
}: ProductPaginationProps) {
  // Array.from({ length: totalPages }) -> length to u nas totalPages [undefined, undefined, undefined]
  // (_, index) => index + 1 -> kazdy element zwiekaszaj o 1, wiec dostajemy [1, 2, 3]
  // finalnie dostajemy tablice z numerami stron [1, 2, 3] dla totalPages = 3
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const searchParams = useSearchParams();
  return (
    <div>
      {pages.map((pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return (
          <Link key={pageNumber} href={`/products?${params.toString()}`}>
            {page === pageNumber ? `[${pageNumber}]` : pageNumber}
          </Link>
        );
      })}
    </div>
  );
}
