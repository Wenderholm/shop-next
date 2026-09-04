"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/contexts/CartContext";
import { useCartItems } from "@/hooks/useCartItems";

export function useCartPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<number[]>([]);

  const { items, loading, loadCart } = useCartItems();

  const { refreshCart } = useCart();

  const toggleSelected = (itemId: number) => {
    setSelected((currentSelected) =>
      currentSelected.includes(itemId)
        ? currentSelected.filter((id) => id !== itemId)
        : [...currentSelected, itemId],
    );
  };

  const allSelected =
    items.length > 0 && items.every((item) => selected.includes(item.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }

    setSelected(items.map((item) => item.id));
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        quantity,
      }),
    });

    await loadCart();
    await refreshCart();
  };

  const removeItem = async (itemId: number) => {
    await fetch("/api/orders", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
      }),
    });

    setSelected((currentSelected) =>
      currentSelected.filter((id) => id !== itemId),
    );

    await loadCart();
    await refreshCart();
  };

  const selectedItems = useMemo(() => {
    return items.filter((item) => selected.includes(item.id));
  }, [items, selected]);

  const total = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
      0,
    );
  }, [selectedItems]);

  const selectedItemCount = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedItems]);

  const goToCheckout = () => {
    if (selected.length === 0) {
      return;
    }
    router.push(`/checkout?items=${selected.join(",")}`);
  };

  return {
    items,
    loading,
    selected,
    selectedItems,
    selectedItemCount,
    total,
    allSelected,
    toggleSelected,
    toggleSelectAll,
    updateQuantity,
    removeItem,
    goToCheckout,
  };
}
