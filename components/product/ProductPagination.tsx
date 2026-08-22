"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";

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

  const getPages = () => {
    const pages: (number | "...")[] = [];

    // Jeżeli stron jest mało, pokazujemy wszystkie
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Pierwsze 3 strony
    pages.push(1, 2, 3);

    // ...
    pages.push("...");

    // Ostatnie 3 strony
    pages.push(totalPages - 2, totalPages - 1, totalPages);

    return pages;
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
                className="flex h-8 w-8 items-center justify-center text-[#9CA3AF]"
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
                text-[16px]
                ${
                  page === item
                    ? "bg-[#E5610A] text-#262626"
                    : "text-[#B0B0B0] hover:text-white"
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
              border-[#616674]
              px-4
              text-sm
              text-[#FCFCFC]
              hover:bg-[#262626]
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
              gap-[14px]
              rounded-md
              border
              border-[#616674]
              px-5
              leading-6
              text-sm
              text-[#FCFCFC]
              hover:bg-[#262626]
            "
          >
            Next <RightArrow className="w-5 h-5" />
          </Link>
        ) : (
          <div className="h-10" />
        )}
      </div>
    </div>
  );
}
