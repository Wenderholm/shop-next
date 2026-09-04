"use client";

import Image from "next/image";
import Link from "next/link";
import BinIcon from "@/components/icons/ui/BinIcon";
import CheckIcon from "../icons/ui/CheckIcon";
import { useCartPage } from "@/hooks/useCartPage";

export default function CartPage() {
  const {
    items,
    loading,
    selected,
    total,
    selectedItemCount,
    allSelected,
    toggleSelected,
    toggleSelectAll,
    updateQuantity,
    removeItem,
    goToCheckout,
  } = useCartPage();
  // const total = items.reduce(
  //   (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
  //   0,
  // );
  // const allSelected = items.length > 0 && selected.length === items.length;

  if (loading)
    return (
      <main className="px-10 py-16 text-foreground-dim">Loading cart...</main>
    );

  return (
    <main className="px-10 pb-20 pt-10 text-white">
      <div className="mb-14 flex items-center gap-4 text-base">
        <Link href="/" className="text-foreground-dim hover:text-white">
          Home
        </Link>
        <span className="text-foreground-subtle">›</span>
        <span>Cart</span>
      </div>

      {items.length === 0 ? (
        <div className="border-t border-border-default py-20 text-center">
          <h1 className="text-2xl font-medium">Your cart is empty</h1>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-orange px-6 py-3 text-foreground-inverse"
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
                onClick={() => toggleSelectAll()}
                className={`flex h-6.5 w-6.5 items-center justify-center rounded-md border transition
                    ${allSelected ? "border-brand-strong bg-brand-strong" : "border-border-muted"}
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
                        ? "border-brand-strong bg-brand-strong"
                        : "border-border-muted"
                    }`}
                  >
                    {selected.includes(item.id) && (
                      <CheckIcon className="h-4 w-4 text-white" />
                    )}
                  </button>

                  <div className="flex min-w-0 flex-1 gap-5 rounded-lg border border-border-strong bg-surface p-5">
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
                            <h2 className="text-xl font-medium leading-7.5 tracking-[-0.01em] text-foreground">
                              {item.product.name}
                            </h2>

                            <span className="mt-3 inline-block rounded-md bg-brand-strong px-2.5 py-1.5 text-sm font-medium leading-6 text-accent-soft">
                              {item.product.category.name}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex transition hover:opacity-80"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <BinIcon />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between">
                          <p className="mt-4 text-[30px] font-semibold leading-10 tracking-[-0.01em] text-foreground">
                            ${Number(item.priceAtPurchase).toFixed(2)}
                          </p>
                          <div className="flex flex-wrap items-center gap-6">
                            <span className="inline-block border-r border-neutral-soft py-0 pl-2 pr-6 text-base leading-6.5 text-orange">
                              Write Note
                            </span>
                            <div className="flex items-center rounded-md border border-[#D5D5D5] px-2 py-[6px]">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
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
                                  updateQuantity(item.id, item.quantity + 1)
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

          <aside className="h-fit rounded-lg border border-border-strong bg-surface p-6">
            <h2 className="font-medium text-[18px] leading-7 tracking-normal ">
              Total Product
            </h2>
            <div className="mt-4 flex justify-between border-b border-border-default pb-6 text-foreground-soft">
              <span className="text-base leading-6.5 tracking-normal">
                Total Product Price (
                {selectedItemCount > 1
                  ? `${selectedItemCount} Items`
                  : `${selectedItemCount} Item`}
                )
              </span>
              <span className="text-lg leading-7 tracking-normal">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="mt-[30px] flex justify-between text-lg leading-7 tracking-normal text-foreground">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={goToCheckout}
              className="mt-8 w-full rounded-md bg-orange py-3.5 text-foreground-inverse"
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
