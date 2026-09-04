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
      <div className="flex min-w-0 flex-1 justify-between rounded-lg border border-border-strong bg-surface p-5">
        <div className="flex min-w-0 gap-4">
          <Image
            src={item.product.imageUrls[0]}
            alt={item.product.name}
            width={172}
            height={138}
            className="h-34 w-40 rounded-md bg-white object-contain p-2"
          />

          <div className="min-w-0 flex-1">
            <div>
              <h2 className="text-xl font-medium leading-7.5 tracking-[-0.01em] text-foreground">
                {item.product.name}
              </h2>

              <span className={`mt-3 ${labelStyle}`}>
                {item.product.category.name}
              </span>
            </div>
            <p className="mt-4 text-[30px] font-semibold leading-10 tracking-[-0.01em] text-foreground">
              ${Number(item.priceAtPurchase).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-end gap-6 text-sm text-brand-strong">
          <span className="inline-block border-r border-neutral-soft py-2 pl-2 pr-6 text-base leading-6.5 text-orange">
            Write Note
          </span>
          <div className="flex items-center rounded-md border border-gray-500 px-3 py-2 text-white">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item, item.quantity - 1)}
              className="h-6 w-6 text-xl leading-none"
            >
              −
            </button>
            <span className="w-10 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item, item.quantity + 1)}
              className="h-6 w-6 text-xl leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border-default p-6 sm:flex-row sm:items-start sm:justify-between sm:px-6">
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
          <span>
            <span className="block text-base font-medium leading-6.5 text-foreground">
              Product Protection
            </span>
            <span className="mt-1 block text-sm leading-6 text-foreground-soft">
              The claim process is easy and instant, valid for 6 months
            </span>
          </span>
        </button>

        <span className="pl-8 text-lg font-medium leading-7 text-foreground sm:pl-0">
          $1
        </span>
      </div>
    </div>
  );
}
