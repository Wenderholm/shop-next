import Image from "next/image";

import CheckIcon from "@/components/icons/ui/CheckIcon";
import type { CartItem } from "@/hooks/useCartItems";

import { labelStyle } from "./styles";

interface CheckoutOrderItemProps {
  item: CartItem;
  isProtected: boolean;
  onUpdateQuantity: (item: CartItem, quantity: number) => Promise<void>;
  onToggleProtection: (itemId: number) => void;
}

export default function CheckoutOrderItem({
  item,
  isProtected,
  onUpdateQuantity,
  onToggleProtection,
}: CheckoutOrderItemProps) {
  return (
    <div className="rounded-md border border-border-strong bg-surface">
      <div className="flex min-w-0 flex-1 rounded-lg border border-border-strong bg-surface p-4 sm:p-5">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-8">
          <div className="shrink-0 rounded-md border border-border-default p-3 sm:h-40 sm:w-40 lg:h-34.5 lg:w-43">
            <Image
              src={item.product.imageUrls[0]}
              alt={item.product.name}
              width={172}
              height={138}
              className="h-32 w-full rounded-md bg-white object-contain p-5"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-medium leading-7 tracking-[-0.01em] text-foreground sm:text-xl sm:leading-7.5">
                {item.product.name}
              </h2>

              <div className="mt-3">
                <span
                  className={`${labelStyle} text-xs leading-5 sm:text-sm sm:leading-6`}
                >
                  {item.product.category.name}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-col items-center justify-between gap-4 sm:mt-4 sm:flex-row sm:items-center sm:text-left">
              <p className="text-2xl font-semibold leading-8 tracking-[-0.01em] text-foreground sm:text-[24px] sm:leading-10">
                ${Number(item.priceAtPurchase).toFixed(2)}
              </p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-start sm:gap-6">
                  <span className="inline-block border-r border-neutral-soft py-0 pr-4 text-[12px] sm:text-sm leading-6 text-orange sm:pl-2 sm:pr-6 sm:leading-6.5">
                    Write Note
                  </span>
                  <div className="flex items-center rounded-md border border-[#D5D5D5] px-2 py-1.5 text-white">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                      className="h-8 w-7 text-xl sm:h-9 sm:w-8 sm:text-2xl"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item, item.quantity + 1)}
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

      <div className="flex flex-col gap-3 border-t border-border-default p-4 sm:p-6 sm:px-6">
        <button
          type="button"
          onClick={() => onToggleProtection(item.id)}
          className="flex items-start gap-4 text-left"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
              isProtected
                ? "bg-orange text-foreground-inverse"
                : "border border-[#5B5B5B] bg-transparent"
            }`}
          >
            {isProtected ? <CheckIcon className="h-3.5 w-3.5" /> : null}
          </span>
          <div className="flex flex-col sm:flex-row gap-1 justify-between w-full">
            <div>
              <span className="block text-sm font-medium leading-6 text-foreground sm:text-base sm:leading-6.5">
                Product Protection
              </span>
              <span className="mt-1 block text-xs leading-5 text-foreground-soft sm:text-sm sm:leading-6">
                The claim process is easy and instant, valid for 6 months
              </span>
            </div>
            <div className="pl-9 text-sm  font-medium leading-6 text-foreground sm:pl-9 sm:text-lg sm:leading-7 lg:pl-0">
              $1
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
