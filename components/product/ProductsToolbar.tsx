"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const sortOptions = [
  {
    label: "Latest",
    value: "lastest",
  },
  {
    label: "Price ↑",
    value: "priceAsc",
  },
  {
    label: "Price ↓",
    value: "priceDesc",
  },
];

const limits = [3, 5, 6, 9];

export default function ProductsToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set("sort", event.target.value);
    } else {
      params.delete("sort");
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set("limit", event.target.value);

    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex items-center gap-8">
      <div className="flex items-center gap-3">
        <span className="text-xl leading-7.5 text-foreground">Sort by</span>

        <select
          value={searchParams.get("sort") ?? ""}
          onChange={handleSortChange}
          className="
            rounded
            border
            border-border-muted
            bg-surface
            px-4
            py-2
            text-sm
            text-foreground
          "
        >
          {sortOptions.map((option) => (
            <option key={option.label} value={option.value} className=" ">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xl leading-7.5 text-foreground">Show</span>

        <select
          value={searchParams.get("limit") ?? "9"}
          onChange={handleLimitChange}
          className="
            rounded
            border
            border-border-default
            bg-surface
            px-4
            py-2
            text-sm
            text-foreground
          "
        >
          {limits.map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
