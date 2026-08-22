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
        <span className="text-[20px] leading-[30px] text-[#FCFCFC]">
          Sort by
        </span>

        <select
          value={searchParams.get("sort") ?? ""}
          onChange={handleSortChange}
          className="
            rounded
            border
            border-[#616674]
            bg-[#262626]
            px-4
            py-2
            text-[14px]
            text-[#FCFCFC]
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
        <span className="text-[20px] leading-[30px] text-[#FCFCFC]">Show</span>

        <select
          value={searchParams.get("limit") ?? "9"}
          onChange={handleLimitChange}
          className="
            rounded
            border
            border-[#383B42]
            bg-[#262626]
            px-4
            py-2
            text-[14px]
            text-[#FCFCFC]
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
