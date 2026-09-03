"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (key: "minPrice" | "maxPrice", value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="py-6">
      <h3 className="mb-6 text-xl font-semibold">Price</h3>

      <div className="space-y-3">
        <div className="flex overflow-hidden rounded-md border border-border-default">
          <input
            type="number"
            placeholder="$ 10.00"
            className="w-full bg-transparent p-3 outline-none"
            onBlur={(e) => handleChange("minPrice", e.target.value)}
          />

          <select className="border-l border-border-default bg-transparent px-3">
            <option>USD</option>
            <option>PLN</option>
          </select>
        </div>

        <div className="flex overflow-hidden rounded-md border border-border-default">
          <input
            type="number"
            placeholder="$ Max Price"
            className="w-full bg-transparent p-3 outline-none"
            onBlur={(e) => handleChange("maxPrice", e.target.value)}
          />

          <select className="border-l border-border-default bg-transparent px-3">
            <option>USD</option>
            <option>PLN</option>
          </select>
        </div>
      </div>
    </div>
  );
}
