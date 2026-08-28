"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "@/types/product";

interface CartContextValue {
  itemCount: number;
  isAdding: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<boolean>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/orders", { cache: "no-store" }) // no-store przegladarka ma pobrać zawsze najnowsze dane z serwera, a nie z cache
      .then((response) => (response.ok ? response.json() : null))
      .then((cart) => {
        if (!isMounted || !cart) return;
        setItemCount(
          cart.orderItems?.reduce(
            (total: number, item: { quantity: number }) =>
              total + item.quantity,
            0,
          ) ?? 0,
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshCart = async () => {
    const response = await fetch("/api/orders", { cache: "no-store" });
    if (!response.ok) return;
    const cart = await response.json();
    setItemCount(
      cart.orderItems?.reduce(
        (total: number, item: { quantity: number }) => total + item.quantity,
        0,
      ) ?? 0,
    );
  };

  const clearCart = () => {
    setItemCount(0);
  };

  const addToCart = async (product: Product, quantity = 1) => {
    setIsAdding(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      if (!response.ok) return false;
      await refreshCart();
      return true;
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ itemCount, isAdding, addToCart, refreshCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
