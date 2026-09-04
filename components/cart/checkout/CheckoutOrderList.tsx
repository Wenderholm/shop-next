import type { CartItem } from "@/hooks/useCartItems";

import CheckoutOrderItem from "./CheckoutOrderItem";

interface CheckoutOrderListProps {
  items: CartItem[];
  protectedItems: number[];
  onUpdateQuantity: (item: CartItem, quantity: number) => Promise<void>;
  onToggleProtection: (itemId: number) => void;
}

export default function CheckoutOrderList({
  items,
  protectedItems,
  onUpdateQuantity,
  onToggleProtection,
}: CheckoutOrderListProps) {
  return (
    <div className="mb-10">
      <h1 className="text-[28px] font-medium leading-9">Your Order</h1>
      <div className="mt-5 space-y-5">
        {items.map((item) => (
          <CheckoutOrderItem
            key={item.id}
            item={item}
            isProtected={protectedItems.includes(item.id)}
            onUpdateQuantity={onUpdateQuantity}
            onToggleProtection={onToggleProtection}
          />
        ))}
      </div>
    </div>
  );
}
