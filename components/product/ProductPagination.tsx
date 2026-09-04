"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LeftArrow from "../icons/navigation/LeftArrow";
import RightArrow from "../icons/navigation/RightArrow";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
}

export default function ProductPagination({
  page,
  totalPages,
}: ProductPaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());

    return `/products?${params.toString()}`;
  };

  const getPages = (): (number | "...")[] => {
    // const pages: (number | "...")[] = [];

    // Mało stron → pokazujemy wszystkie
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Początek
    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // Środek
    if (page >= 4 && page <= totalPages - 3) {
      return [1, "...", page - 1, page, page + 1, "...", totalPages];
    }

    // Koniec
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <div className="mt-10 flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* NUMERY STRON */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 lg:justify-start">
        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="flex h-7 w-7 items-center justify-center text-xs text-gray-400 sm:h-8 sm:w-8 sm:text-sm"
              >
                ...
              </span>
            );
          }

          return (
            <Link
              key={item}
              href={createPageUrl(item)}
              className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-md
          text-sm
          sm:h-11
          sm:w-11
          sm:text-base
          ${
            page === item
              ? "bg-brand-strong text-foreground-inverse"
              : "text-foreground-dim hover:text-white"
          }
        `}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {/* PREVIOUS / NEXT */}
      <div className="flex w-full items-center justify-center gap-3 sm:gap-4 lg:w-auto lg:justify-end">
        {page > 1 ? (
          <Link
            href={createPageUrl(page - 1)}
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-md
              border
              border-border-muted
              px-3
              text-xs
              text-foreground
              hover:bg-surface
              sm:h-10
              sm:px-4
              sm:text-sm
            "
          >
            <LeftArrow className="w-5 h-5" /> Previous
          </Link>
        ) : (
          <div className="h-9 w-24 sm:h-10 sm:w-29" />
        )}

        {page < totalPages ? (
          <Link
            href={createPageUrl(page + 1)}
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-md
              border
              border-border-muted
              px-3
              text-xs
              text-foreground
              hover:bg-surface
              sm:h-10
              sm:gap-3.5
              sm:px-5
              sm:text-sm
            "
          >
            Next <RightArrow className="w-5 h-5 text-white" />
          </Link>
        ) : (
          <div className="h-9 w-24 sm:h-10 sm:w-29" />
        )}
      </div>
    </div>
  );
}
