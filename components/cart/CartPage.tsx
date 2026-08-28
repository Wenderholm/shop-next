"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bin from "@/components/icons/Bin";
import { useCart } from "@/contexts/CartContext";
import { CartItem, useCartItems } from "@/hooks/useCartItems";

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
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  setSelected(allSelected ? [] : items.map((item) => item.id))
                }
                className="h-6 w-6 accent-orange"
              />
              <span>Select All</span>
            </label>
            <div className="space-y-7">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-5 rounded-lg border border-[#353535] bg-[#262626] p-5"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() =>
                      setSelected((current) =>
                        current.includes(item.id)
                          ? current.filter((id) => id !== item.id)
                          : [...current, item.id],
                      )
                    }
                    className="mt-12 h-6 w-6 shrink-0 accent-orange"
                  />
                  <div className="flex min-w-0 flex-1 gap-6">
                    <Image
                      src={item.product.imageUrls[0]}
                      alt={item.product.name}
                      width={128}
                      height={112}
                      className="h-28 w-32 rounded-md bg-white object-contain p-2"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-medium">
                            {item.product.name}
                          </h2>
                          <span className="mt-4 inline-block rounded-md bg-[#E5610A] px-3 py-2 text-sm">
                            {item.product.category.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-md transition hover:opacity-80"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Bin />
                        </button>
                      </div>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <span className="text-2xl">
                          ${Number(item.priceAtPurchase).toFixed(2)}
                        </span>
                        <div className="flex items-center rounded-md border border-[#D5D5D5] px-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item, item.quantity - 1)
                            }
                            className="h-9 w-8 text-2xl"
                          >
                            −
                          </button>
                          <span className="w-8 text-center">
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
                </article>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-[#353535] bg-[#262626] p-6">
            <h2 className="text-lg font-medium">Total Product</h2>
            <div className="mt-5 flex justify-between border-b border-[#383B42] pb-6 text-[#D4D4D4]">
              <span>
                Total Product Price (
                {items.reduce((sum, item) => sum + item.quantity, 0)} Item)
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-6 flex justify-between text-xl">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="mt-8 w-full rounded-md bg-orange px-4 py-4 text-[#262626]"
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
