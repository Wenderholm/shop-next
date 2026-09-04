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
      <main className="px-4 py-12 text-foreground-dim sm:px-6 lg:px-10 lg:py-16">
        Loading cart...
      </main>
    );

  return (
    <main className="px-4 pb-16 pt-4 text-white sm:px-6 sm:pt-6 lg:px-10 lg:pb-20 lg:pt-10">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:mb-8 sm:gap-3 sm:text-sm lg:mb-14 lg:gap-4 lg:text-base">
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
            <label className="mb-5 flex items-center gap-3 sm:mb-6 lg:mb-7">
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
            <div className="space-y-5 sm:space-y-6 lg:space-y-7">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center"
                >
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
                  <div className="flex-1 rounded-lg border border-border-strong bg-surface p-4 sm:p-6">
                    <div className="mb-4 flex items-center gap-3 sm:mb-0 lg:hidden">
                      <span className="text-sm text-foreground-soft">
                        Select product
                      </span>
                    </div>

                    <div className="flex w-full items-start gap-4 lg:items-center">
                      <div className="flex min-w-0 flex-1 flex-col items-center  gap-4 lg:flex-row lg:items-start lg:gap-8">
                        <div className=" border border-border-default p-3 rounded-md shrink-0 sm:h-40 sm:w-40 lg:h-34.5 lg:w-43">
                          <Image
                            src={item.product.imageUrls[0]}
                            alt={item.product.name}
                            width={172}
                            height={138}
                            className="h-32 w-full rounded-md bg-white object-contain p-5"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4 sm:gap-6 lg:items-center">
                            <h2 className="text-lg font-medium leading-7 tracking-[-0.01em] text-foreground sm:text-xl sm:leading-7.5">
                              {item.product.name}
                            </h2>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="flex shrink-0 transition hover:opacity-80"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <BinIcon />
                            </button>
                          </div>

                          <div className="mt-3 text-center sm:text-left">
                            <span className="inline-block rounded-md bg-brand-strong px-2.5 py-1.5 text-xs font-medium leading-5 text-accent-soft sm:text-sm sm:leading-6">
                              {item.product.category.name}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:mt-4">
                            <p className="text-2xl font-semibold leading-8 tracking-[-0.01em] text-foreground sm:text-[24px] sm:leading-10">
                              ${Number(item.priceAtPurchase).toFixed(2)}
                            </p>

                            <div className=" flex items-center justify-between gap-4 ">
                              <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-start sm:gap-6">
                                <span className="inline-block border-r border-neutral-soft py-0 pr-4 text-sm leading-6 text-orange sm:pl-2 sm:pr-6 sm:text-base sm:leading-6.5">
                                  Write Note
                                </span>
                                <div className="flex items-center rounded-md border border-[#D5D5D5] px-2 py-1.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="h-8 w-7 text-xl sm:h-9 sm:w-8 sm:text-2xl"
                                  >
                                    −
                                  </button>

                                  <span className="w-8 text-center text-sm">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="h-8 w-7 text-xl sm:h-9 sm:w-8 sm:text-2xl"
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
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-border-strong bg-surface p-6">
            <h2 className="font-medium text-center sm:text-left text-[18px] leading-7 tracking-normal ">
              Total Product
            </h2>
            <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between border-b border-border-default pb-6 text-foreground-soft">
              <span className="text-[12px] sm:text-base leading-6.5 tracking-normal">
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
            <div className="mt-7.5 flex justify-between text-lg leading-7 tracking-normal text-foreground">
              <span>Subtotal</span>
              <span className="text-center  sm:text-left text-base sm:text-[28px]">
                ${total.toFixed(2)}
              </span>
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
