"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import PriceFilter from "./PriceFilter";
import CheckIcon from "../icons/ui/CheckIcon";

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
      <div className="border-b border-border-default pb-6">
        <h3 className="mb-4 text-xl font-semibold leading-7.5 tracking-[-0.01em] text-foreground">
          Category
        </h3>

        <div className="space-y-5">
          <Link href="/products" className="flex items-center gap-4">
            <div
              className={`h-5 w-5 rounded border
        ${
          !searchParams.get("category")
            ? "border-brand-strong bg-brand-strong"
            : "border-border-muted"
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
                ${active ? "border-brand-strong bg-brand-strong" : "border-border-muted"}
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

      <div className="border-b border-border-default py-6">
        <h3 className="mb-4 text-xl font-semibold leading-7.5 tracking-[-0.01em] text-foreground">
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
              ? "border-brand-strong bg-brand-strong"
              : "border-border-muted"
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
                  ${active ? "border-brand-strong bg-brand-strong" : "border-border-muted"}
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
