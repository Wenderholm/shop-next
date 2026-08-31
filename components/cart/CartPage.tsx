"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bin from "@/components/icons/Bin";
import { useCart } from "@/contexts/CartContext";
import { CartItem, useCartItems } from "@/hooks/useCartItems";
import CheckIcon from "../icons/Check";
import React from "react";

export default function CartPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const { items, loading, loadCart } = useCartItems();
  const { refreshCart } = useCart();
  const router = useRouter();

  const updateQuantity = async (item: CartItem, quantity: number) => {
    if (quantity < 1 || quantity > item.product.stock) return;
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: item.id, quantity }),
    });
    await loadCart();
    await refreshCart();
  };

  const removeItem = async (itemId: number) => {
    await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    setSelected((current) => current.filter((id) => id !== itemId));
    await loadCart();
    await refreshCart();
  };

  const toggleSelected = (itemId: number) => {
    setSelected((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
    0,
  );
  const allSelected = items.length > 0 && selected.length === items.length;

  if (loading)
    return <main className="px-10 py-16 text-[#B0B0B0]">Loading cart...</main>;

  return (
    <main className="px-10 pb-20 pt-10 text-white">
      <div className="mb-14 flex items-center gap-4 text-[16px]">
        <Link href="/" className="text-[#B0B0B0] hover:text-white">
          Home
        </Link>
        <span className="text-[#777]">›</span>
        <span>Cart</span>
      </div>

      {items.length === 0 ? (
        <div className="border-t border-[#383B42] py-20 text-center">
          <h1 className="text-2xl font-medium">Your cart is empty</h1>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-orange px-6 py-3 text-[#262626]"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_385px]">
          <section>
            <label className="mb-7 flex cursor-pointer items-center gap-3">
              <button
                type="button"
                aria-label="Select all products"
                onClick={() =>
                  setSelected(allSelected ? [] : items.map((item) => item.id))
                }
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-md border transition
                    ${allSelected ? "border-[#E5610A] bg-[#E5610A]" : "border-[#616674]"}
                `}
              >
                {allSelected && <CheckIcon className="h-4 w-4 text-white" />}
              </button>
              <span>Select All</span>
            </label>
            <div className="space-y-7">
              {items.map((item) => (
                <div key={item.id} className="flex w-full items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleSelected(item.id)}
                    aria-label={`Select ${item.product.name}`}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                      selected.includes(item.id)
                        ? "border-[#E5610A] bg-[#E5610A]"
                        : "border-[#616674]"
                    }`}
                  >
                    {selected.includes(item.id) && (
                      <CheckIcon className="h-4 w-4 text-white" />
                    )}
                  </button>

                  <div className="flex min-w-0 flex-1 gap-5 rounded-lg border border-[#353535] bg-[#262626] p-5">
                    <div className="flex min-w-0 flex-1 gap-8">
                      <Image
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        width={172}
                        height={138}
                        className="h-34 w-40 rounded-md bg-white object-contain p-2"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h2 className="text-xl leading-[30px] font-medium tracking-[-0.01em] text-[#FCFCFC]">
                              {item.product.name}
                            </h2>

                            <span className="mt-3 inline-block rounded-md bg-[#E5610A] px-[10px] py-[6px] text-sm leading-6 font-medium text-[#FDEDD7]">
                              {item.product.category.name}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex transition hover:opacity-80"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Bin />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between">
                          <p className="mt-4 text-[30px] font-semibold leading-10 tracking-[-0.01em] text-[#FCFCFC]">
                            ${Number(item.priceAtPurchase).toFixed(2)}
                          </p>
                          <div className="flex flex-wrap items-center gap-6">
                            <span className="inline-block text-[16px] leading-6.5 text-[#F29145] border-r py-0 pr-6 pl-2 border-[#D4D4D4]">
                              Write Note
                            </span>
                            <div className="flex items-center rounded-md border border-[#D5D5D5] px-2 py-[6px]">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item, item.quantity - 1)
                                }
                                className="h-9 w-8 text-2xl"
                              >
                                −
                              </button>

                              <span className="w-8 text-[14px] text-center">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item, item.quantity + 1)
                                }
                                className="h-9 w-8 text-2xl"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-[#353535] bg-[#262626] p-6">
            <h2 className="font-medium text-[18px] leading-7 tracking-normal ">
              Total Product
            </h2>
            <div className="mt-4 flex justify-between border-b border-[#383B42] pb-6 text-[#E7E7E7]">
              <span className="text-[16px] leading-[26px] tracking-normal">
                Total Product Price (
                {items.reduce((sum, item) => sum + item.quantity, 0)} Item)
              </span>
              <span className="text-[18px] leading-[28px] tracking-normal">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="mt-[30px] flex justify-between text-[18px] leading-[28px] tracking-normal text-[#FCFCFC]">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="mt-8 w-full rounded-md bg-orange py-[14px] text-[#262626]"
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
