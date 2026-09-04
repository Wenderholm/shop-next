"use client";

import { useEffect, useState } from "react";
import type { SerializedPrice } from "@/lib/checkout";

export interface CartItem {
  id: number;
  quantity: number;
  priceAtPurchase: SerializedPrice;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrls: string[];
    category: { name: string };
  };
}

export function useCartItems() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    const response = await fetch("/api/orders", { cache: "no-store" });

    if (response.ok) {
      const cart = await response.json();
      setItems(cart.orderItems ?? []);
    } else {
      setItems([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    fetch("/api/orders", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((cart) => {
        if (!isMounted) return;
        setItems(cart?.orderItems ?? []);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { items, loading, loadCart };
}
