"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
import Link from "next/dist/client/link";
import { useState } from "react";

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
}

const sortOptions = [
  {
    label: "Price ↑",
    value: "priceAsc",
  },
  {
    label: "Price ↓",
    value: "priceDesc",
  },
] as const;

export default function ProductFilters({
  categories,
  brands,
}: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.push(`/products?${params.toString()}`);
  }

  const searchParams = useSearchParams();
  console.log("searchParams w product filters", searchParams);

  return (
    <div>
      <h2>Search</h2>

      <h3>Categories</h3>

      {categories.map((category) => {
        const params = new URLSearchParams(searchParams); // tworzymy nowy obiekt URLSearchParams na podstawie obecnych searchParams
        params.set("category", category.name); // ustawiamy nowy parametr category na nazwę kategorii
        return (
          <Link key={category.id} href={`/products?${params.toString()}`}>
            <hr />
            {category.name}
          </Link>
        );
      })}

      <h3>Brands</h3>

      {brands.map((brand) => {
        const params = new URLSearchParams(searchParams);
        params.set("brand", brand.name);
        return (
          <Link key={brand.id} href={`/products?${params.toString()}`}>
            {brand.name}
          </Link>
        );
      })}

      <h3>Sort</h3>
      {/* label i value wyciagniete z sortOptions */}
      {sortOptions.map(({ label, value }) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        return (
          <Link key={value} href={`/products?${params.toString()}`}>
            {label}
          </Link>
        );
      })}

      <p>WYSZUKIWANIE </p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
