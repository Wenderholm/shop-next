"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useCart } from "@/contexts/CartContext";
import { useCartItems, type CartItem } from "@/hooks/useCartItems";
import {
  calculateGrandTotal,
  SERVICE_FEE,
  SHIPPING_INSURANCE,
  SHIPPING_PRICE,
} from "@/lib/checkout";
import {
  type CheckoutAddressFormState,
  type AddressMode,
} from "@/types/checkout";

interface UseCheckoutPageOptions {
  userCountry: string;
}

export function useCheckoutPage({ userCountry }: UseCheckoutPageOptions) {
  const { items, loading, loadCart } = useCartItems();
  const [addressMode, setAddressMode] = useState<AddressMode>("existing");
  const [protectedItems, setProtectedItems] = useState<number[]>([]);
  const [newAddressCountry, setNewAddressCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [isMainAddress, setIsMainAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { clearCart, refreshCart } = useCart();
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

  const toggleProtection = (itemId: number) => {
    setProtectedItems((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
  };

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
        0,
      ),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const protectionTotal = protectedItems.length;
  const shippingPrice = items.length > 0 ? SHIPPING_PRICE : 0;
  const shippingInsurance = items.length > 0 ? SHIPPING_INSURANCE : 0;
  const serviceFee = items.length > 0 ? SERVICE_FEE : 0;
  const grandTotal = calculateGrandTotal(subtotal, protectionTotal);
  const breadcrumbLabel = items[0]?.product.name ?? "Checkout";

  const handleCheckout = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protectionCount: protectionTotal,
          addressMode,
          country: addressMode === "existing" ? userCountry : newAddressCountry,
          province,
          city,
          postalCode,
          streetAddress,
          makeMainAddress: isMainAddress,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setSubmitError(payload.message ?? "Unable to complete checkout.");
        return;
      }

      clearCart();
      await refreshCart();
      router.push(`/checkout/success/${payload.orderId}`);
    } catch {
      setSubmitError("Unable to complete checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addressForm: CheckoutAddressFormState = {
    newAddressCountry,
    setNewAddressCountry,
    province,
    setProvince,
    city,
    setCity,
    postalCode,
    setPostalCode,
    streetAddress,
    setStreetAddress,
    isMainAddress,
    toggleMainAddress: () => setIsMainAddress((current) => !current),
  };

  return {
    items,
    loading,
    breadcrumbLabel,
    protectedItems,
    addressMode,
    addressForm,
    subtotal,
    itemCount,
    protectionTotal,
    shippingPrice,
    shippingInsurance,
    serviceFee,
    grandTotal,
    isSubmitting,
    submitError,
    setAddressMode,
    updateQuantity,
    toggleProtection,
    handleCheckout,
  };
}
