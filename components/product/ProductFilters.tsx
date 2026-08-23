"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import PriceFilter from "./PriceFilter";
import CheckIcon from "../icons/Check";

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
}

export default function ProductFilters({
  categories,
  brands,
}: ProductFiltersProps) {
  const searchParams = useSearchParams();

  return (
    <div
      className="
    p-6"
    >
      <div className="border-b border-[#383B42] pb-6">
        <h3 className="mb-4 text-xl leading-[30px] text-[#FCFCFC] font-semibold tracking-[-0.01em]">
          Category
        </h3>

        <div className="space-y-5">
          <Link href="/products" className="flex items-center gap-4">
            <div
              className={`h-5 w-5 rounded border
        ${
          !searchParams.get("category")
            ? "border-[#E5610A] bg-[#E5610A]"
            : "border-[#616674]"
        }`}
            >
              {!searchParams.get("category") && (
                <CheckIcon className="w-4.5 h-4.5" />
              )}
            </div>
            <span>All</span>
          </Link>
          {categories.map((category) => {
            const params = new URLSearchParams(searchParams);
            params.set("category", category.name);
            const active = searchParams.get("category") === category.name;
            return (
              <Link
                key={category.id}
                href={`/products?${params.toString()}`}
                className="flex items-center gap-4"
              >
                <div
                  className={`
            h-5
            w-5
            rounded
            border
            ${active ? "border-[#E5610A] bg-[#E5610A]" : "border-[#616674]"}
          `}
                >
                  {active && <CheckIcon className="w-4.5 h-4.5" />}
                </div>

                <span>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#383B42] py-6">
        <h3 className="mb-4 text-xl leading-[30px] text-[#FCFCFC] font-semibold tracking-[-0.01em]">
          Brand
        </h3>

        <div className="space-y-5">
          <Link
            href={`/products?${(() => {
              const params = new URLSearchParams(searchParams);
              params.delete("brand");
              return params.toString();
            })()}`}
            className="flex items-center gap-4"
          >
            <div
              className={`
          h-5
          w-5
          rounded
          border
          ${
            !searchParams.get("brand")
              ? "border-[#E5610A] bg-[#E5610A]"
              : "border-[#616674]"
          }
        `}
            >
              {!searchParams.get("brand") && (
                <CheckIcon className="w-4.5 h-4.5" />
              )}
            </div>

            <span>All</span>
          </Link>

          {brands.map((brand) => {
            const params = new URLSearchParams(searchParams);

            params.set("brand", brand.name);

            const active = searchParams.get("brand") === brand.name;

            return (
              <Link
                key={brand.id}
                href={`/products?${params.toString()}`}
                className="flex items-center gap-4"
              >
                <div
                  className={`
              h-5
              w-5
              rounded
              border
              ${active ? "border-[#E5610A] bg-[#E5610A]" : "border-[#616674]"}
            `}
                >
                  {active && <CheckIcon className="w-4.5 h-4.5" />}
                </div>

                <span>{brand.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <PriceFilter />
      </div>
    </div>
  );
}
