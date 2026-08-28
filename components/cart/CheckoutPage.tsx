"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import ApplePayIcon from "@/components/icons/paymentMethod/ApplePayIcon";
import Bin from "@/components/icons/Bin";
import CheckIcon from "@/components/icons/Check";
import GreenShield from "@/components/icons/GreenShield";
import { useCart } from "@/contexts/CartContext";
import { useCartItems, CartItem } from "@/hooks/useCartItems";
import {
  calculateGrandTotal,
  SERVICE_FEE,
  SHIPPING_INSURANCE,
  SHIPPING_PRICE,
} from "../../lib/checkout";

type AddressMode = "existing" | "new";

interface CheckoutPageProps {
  userCountry: string;
}

const countryOptions = [
  "Poland",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
];

const provinceOptions = ["Mazovia", "Pomerania", "Silesia", "Lesser Poland"];
const cityOptions = ["Warsaw", "Gdansk", "Katowice", "Krakow"];
const postalCodeOptions = ["00-001", "80-001", "40-001", "30-001"];

export default function CheckoutPage({ userCountry }: CheckoutPageProps) {
  const { items, loading, loadCart } = useCartItems();
  const [addressMode, setAddressMode] = useState<AddressMode>("existing");
  const [protectedItems, setProtectedItems] = useState<number[]>([]);
  const [newAddressCountry, setNewAddressCountry] = useState(
    countryOptions.includes(userCountry) ? userCountry : countryOptions[0],
  );
  const [province, setProvince] = useState(provinceOptions[0]);
  const [city, setCity] = useState(cityOptions[0]);
  const [postalCode, setPostalCode] = useState(postalCodeOptions[0]);
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

  const removeItem = async (itemId: number) => {
    await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });

    setProtectedItems((current) => current.filter((id) => id !== itemId));
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

  if (loading) {
    return (
      <main className="px-10 py-16 text-[#B0B0B0]">Loading checkout...</main>
    );
  }

  return (
    <main className="px-6 pb-20 pt-4 text-white lg:px-10">
      <div className="mb-14 flex flex-wrap items-center gap-3 border-t border-[#383B42] pt-8 text-sm text-[#B0B0B0] lg:text-[16px]">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span className="text-[#777]">›</span>
        <Link href="/products" className="hover:text-white">
          Product
        </Link>
        <span className="text-[#777]">›</span>
        <span>{breadcrumbLabel}</span>
        <span className="text-[#777]">›</span>
        <span className="font-medium text-white">Checkout</span>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <h1 className="text-2xl font-medium">Your cart is empty</h1>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-orange px-6 py-3 text-[#262626]"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_224px] xl:grid-cols-[minmax(0,1fr)_260px]">
          <section className="space-y-9">
            <div>
              <h1 className="text-[28px] font-medium leading-9">Your Order</h1>
              <div className="mt-5 space-y-5">
                {items.map((item) => {
                  const isProtected = protectedItems.includes(item.id);

                  return (
                    <article
                      key={item.id}
                      className="rounded-md border border-[#353535] bg-[#262626]"
                    >
                      <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
                        <div className="flex min-w-0 gap-4">
                          <div className="flex h-23 w-23 items-center justify-center rounded-md bg-white p-3">
                            <Image
                              src={item.product.imageUrls[0]}
                              alt={item.product.name}
                              width={72}
                              height={72}
                              className="h-auto w-auto object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <h2 className="text-xl font-medium leading-7 text-[#FCFCFC]">
                              {item.product.name}
                            </h2>
                            <span className="mt-3 inline-flex rounded-md bg-[#E5610A] px-3 py-1 text-xs font-medium text-[#FDEDD7]">
                              {item.product.category.name}
                            </span>
                            <p className="mt-4 text-[30px] font-semibold leading-10 tracking-[-0.01em] text-[#FCFCFC]">
                              ${Number(item.priceAtPurchase).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-4 sm:items-end">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="rounded-md transition hover:opacity-80"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Bin />
                          </button>

                          <div className="flex items-center gap-4 text-sm text-[#E5610A]">
                            <button type="button">Write Note</button>
                            <span className="text-[#4B4B4B]">|</span>
                            <div className="flex items-center rounded-md border border-[#6B7280] px-3 py-2 text-white">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item, item.quantity - 1)
                                }
                                className="h-6 w-6 text-xl leading-none"
                              >
                                −
                              </button>
                              <span className="w-10 text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item, item.quantity + 1)
                                }
                                className="h-6 w-6 text-xl leading-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 border-t border-[#383B42] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5">
                        <button
                          type="button"
                          onClick={() => toggleProtection(item.id)}
                          className="flex items-start gap-3 text-left"
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                              isProtected
                                ? "bg-orange text-[#262626]"
                                : "border border-[#5B5B5B] bg-transparent"
                            }`}
                          >
                            {isProtected ? (
                              <CheckIcon className="h-3.5 w-3.5" />
                            ) : null}
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-[#FCFCFC]">
                              Product Protection
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-[#9E9E9E]">
                              The claim process is easy and instant, valid for 6
                              months
                            </span>
                          </span>
                        </button>

                        <span className="pl-8 text-sm font-medium text-[#FCFCFC] sm:pl-0">
                          $1
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <section>
              <h2 className="text-[28px] font-medium leading-9">Address</h2>
              <div className="mt-5 rounded-md border border-[#353535] bg-[#262626] p-4 sm:p-5">
                <div className="grid grid-cols-2 border-b border-[#383B42] text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setAddressMode("existing")}
                    className={`pb-4 transition ${
                      addressMode === "existing"
                        ? "border-b-2 border-orange text-orange"
                        : "text-[#8E8E8E]"
                    }`}
                  >
                    Existing Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressMode("new")}
                    className={`pb-4 transition ${
                      addressMode === "new"
                        ? "border-b-2 border-orange text-orange"
                        : "text-[#8E8E8E]"
                    }`}
                  >
                    New Address
                  </button>
                </div>

                {addressMode === "existing" ? (
                  <div className="pt-6 text-[#D4D4D4]">
                    <div className="mb-6">
                      <p className="text-xs text-[#9E9E9E]">Address</p>
                      <span className="mt-2 inline-flex rounded-md bg-[#E5610A] px-3 py-1 text-xs font-medium text-[#FDEDD7]">
                        Main Address
                      </span>
                      <p className="mt-4 text-lg font-medium text-[#FCFCFC]">
                        Bangalau Road No 23, RT 4/RW 6, Kinajaya
                      </p>
                    </div>

                    <div className="grid gap-6 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-[#9E9E9E]">Country</p>
                        <p className="mt-2 text-base text-[#FCFCFC]">
                          {userCountry || "Poland"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#9E9E9E]">Province</p>
                        <p className="mt-2 text-base text-[#FCFCFC]">Jakarta</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#9E9E9E]">City</p>
                        <p className="mt-2 text-base text-[#FCFCFC]">Jakarta</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#9E9E9E]">Postal Code</p>
                        <p className="mt-2 text-base text-[#FCFCFC]">12819</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <select
                        value={newAddressCountry}
                        onChange={(event) =>
                          setNewAddressCountry(event.target.value)
                        }
                        className="rounded-md border border-[#4B4B4B] bg-transparent px-4 py-3 text-sm text-[#FCFCFC] outline-none"
                      >
                        {countryOptions.map((country) => (
                          <option
                            key={country}
                            value={country}
                            className="bg-[#262626]"
                          >
                            {country}
                          </option>
                        ))}
                      </select>

                      <select
                        value={province}
                        onChange={(event) => setProvince(event.target.value)}
                        className="rounded-md border border-[#4B4B4B] bg-transparent px-4 py-3 text-sm text-[#FCFCFC] outline-none"
                      >
                        {provinceOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#262626]"
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        className="rounded-md border border-[#4B4B4B] bg-transparent px-4 py-3 text-sm text-[#FCFCFC] outline-none"
                      >
                        {cityOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#262626]"
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={postalCode}
                        onChange={(event) => setPostalCode(event.target.value)}
                        className="rounded-md border border-[#4B4B4B] bg-transparent px-4 py-3 text-sm text-[#FCFCFC] outline-none"
                      >
                        {postalCodeOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#262626]"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      value={streetAddress}
                      onChange={(event) => setStreetAddress(event.target.value)}
                      rows={5}
                      placeholder="Input Complete Address"
                      className="w-full rounded-md border border-[#4B4B4B] bg-transparent px-4 py-3 text-sm text-[#FCFCFC] outline-none placeholder:text-[#7B7B7B]"
                    />

                    <label className="flex items-center gap-3 text-sm text-[#D4D4D4]">
                      <button
                        type="button"
                        onClick={() => setIsMainAddress((current) => !current)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md ${
                          isMainAddress
                            ? "bg-orange text-[#262626]"
                            : "border border-[#5B5B5B] bg-transparent"
                        }`}
                      >
                        {isMainAddress ? (
                          <CheckIcon className="h-3.5 w-3.5" />
                        ) : null}
                      </button>
                      <span>Make it the main address</span>
                    </label>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-[28px] font-medium leading-9">Shipping</h2>
              <div className="mt-5 flex items-center gap-3 rounded-md border border-[#353535] bg-[#262626] px-4 py-5 text-[#D4D4D4] sm:px-5">
                <GreenShield />
                <span>NexusHub Courier</span>
              </div>
            </section>

            <section>
              <h2 className="text-[28px] font-medium leading-9">
                Payment Method
              </h2>
              <div className="mt-5 flex items-center gap-4 rounded-md border border-[#353535] bg-[#262626] px-4 py-3 sm:px-5">
                <div className="h-8.5 w-13.5 shrink-0">
                  <ApplePayIcon />
                </div>
                <span className="text-[#FCFCFC]">Apple Pay</span>
              </div>
            </section>
          </section>

          <aside className="h-fit rounded-md border border-[#353535] bg-[#262626] p-4 sm:p-5">
            <h2 className="text-lg font-medium">Total Product</h2>
            <div className="mt-5 space-y-4 border-b border-[#383B42] pb-5 text-sm text-[#D4D4D4]">
              <div className="flex items-start justify-between gap-4">
                <span>Total Product Price ({itemCount} Item)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span>Total Product Protection</span>
                <span>${protectionTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span>Total Shipping Price</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span>Shipping Insurance</span>
                <span>${shippingInsurance.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-b border-[#383B42] pb-5 text-sm text-[#D4D4D4]">
              <p className="font-medium text-[#FCFCFC]">Transaction Fees</p>
              <div className="flex items-start justify-between gap-4">
                <span>Service Fees</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 text-xl font-medium">
              <span>Grand total</span>
              <span className="text-[36px] leading-10 tracking-[-0.01em]">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {submitError ? (
              <p className="mt-6 text-sm text-[#F87171]">{submitError}</p>
            ) : null}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="mt-8 w-full rounded-md bg-orange px-4 py-4 font-medium text-[#262626] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Processing..." : "Pay Now"}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
