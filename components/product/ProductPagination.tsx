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
    <div className="mt-10 flex items-center justify-between">
      {/* NUMERY STRON */}
      <div className="flex items-center gap-2">
        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="flex h-8 w-8 items-center justify-center text-gray-400"
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
          h-11
          w-11
          items-center
          justify-center
          rounded-md
          text-base
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
      <div className="flex items-center gap-4">
        {page > 1 ? (
          <Link
            href={createPageUrl(page - 1)}
            className="
              flex
              h-10
              items-center
              gap-2
              rounded-md
              border
              border-border-muted
              px-4
              text-sm
              text-foreground
              hover:bg-surface
            "
          >
            <LeftArrow className="w-5 h-5" /> Previous
          </Link>
        ) : (
          <div className="h-10" />
        )}

        {page < totalPages ? (
          <Link
            href={createPageUrl(page + 1)}
            className="
              flex
              h-10
              items-center
              gap-3.5
              rounded-md
              border
              border-border-muted
              px-5
              leading-6
              text-sm
              text-foreground
              hover:bg-surface
            "
          >
            Next <RightArrow className="w-5 h-5 text-white" />
          </Link>
        ) : (
          <div className="h-10" />
        )}
      </div>
    </div>
  );
}
