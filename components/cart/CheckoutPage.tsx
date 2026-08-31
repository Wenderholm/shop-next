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

const checkoutEntryClass =
  "flex items-start justify-between  font-medium text-[16px] leading-7 tracking-normal align-middle";
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

  const labelStyle =
    "inline-block rounded-md bg-[#E5610A] px-[10px] py-[6px] text-sm leading-6 font-medium text-[#FDEDD7]";
  return (
    <main className="px-6 pb-12 pt-4 text-white lg:px-10">
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_423px] xl:grid-cols-[minmax(0,1fr)_423px]">
          <section className="space-y-9">
            <div className="mb-10">
              <h1 className="text-[28px] font-medium leading-9">Your Order</h1>
              <div className="mt-5 space-y-5">
                {items.map((item) => {
                  const isProtected = protectedItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="rounded-md border border-[#353535] bg-[#262626]"
                    >
                      <div className="flex min-w-0 flex-1 justify-between rounded-lg border border-[#353535] bg-[#262626] p-5">
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
                              <h2 className="text-xl leading-[30px] font-medium tracking-[-0.01em] text-[#FCFCFC]">
                                {item.product.name}
                              </h2>

                              <span className={` mt-3 ${labelStyle}`}>
                                {item.product.category.name}
                              </span>
                            </div>
                            <p className="mt-4 text-[30px] font-semibold leading-10 tracking-[-0.01em] text-[#FCFCFC]">
                              ${Number(item.priceAtPurchase).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* <div className="flex flex-col items-start justify-between sm:items-end"> */}
                        <div className="flex items-end gap-6 text-sm text-[#E5610A]">
                          <span className="inline-block text-[16px] leading-6.5 text-[#F29145] border-r py-2 pr-6 pl-2 border-[#D4D4D4]">
                            Write Note
                          </span>
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
                        {/* </div> */}
                      </div>

                      <div className="flex flex-col gap-3 border-t border-[#383B42] p-6 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                        <button
                          type="button"
                          onClick={() => toggleProtection(item.id)}
                          className="flex items-start gap-4 text-left"
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
                            <span className="block text-[16px] leading-[26px] font-medium text-[#FCFCFC]">
                              Product Protection
                            </span>
                            <span className="mt-1 block text-[14px] leading-6 text-[#E7E7E7]">
                              The claim process is easy and instant, valid for 6
                              months
                            </span>
                          </span>
                        </button>

                        <span className="pl-8 text-[18px] leading-[28px] font-medium text-[#FCFCFC] sm:pl-0">
                          $1
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <section>
              <h2 className="font-medium text-2xl leading-9 tracking-[-0.01em] text-[#FCFCFC]">
                Address
              </h2>
              <div className="mt-4 rounded-md border border-[#383B42] bg-[#262626] p-4 sm:p-6">
                <div className="grid grid-cols-2 border-b border-[#383B42] text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setAddressMode("existing")}
                    className={`text-[18px] font-semibold leading-7 transition pb-3 ${
                      addressMode === "existing"
                        ? "border-b-2 border-[#F29145] text-[#F29145]"
                        : "text-[#B0B0B0]"
                    }`}
                  >
                    Existing Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressMode("new")}
                    className={`text-[18px] font-semibold leading-7 pb-3 transition ${
                      addressMode === "new"
                        ? "border-b-2 border-[#F29145] text-[#F29145]"
                        : "text-[#B0B0B0]"
                    }`}
                  >
                    New Address
                  </button>
                </div>

                {addressMode === "existing" ? (
                  <div className="pt-8 text-[#D4D4D4]">
                    <div className="flex mb-3 gap-4">
                      <p className="flex items-center justify-center text-[#E7E7E7] font-medium text-base leading-[26px] tracking-normal">
                        Address
                      </p>
                      <span className={`${labelStyle}`}>Main Address</span>
                    </div>
                    <div>
                      <p className="text-[18px] leading-[28px] font-medium text-[#FCFCFC]">
                        Bangalau Road No 23, RT 4/RW 6, Kinajaya
                      </p>
                    </div>

                    <div className="flex justify-between text-sm mt-10">
                      <div>
                        <p className="font-medium text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                          Country
                        </p>
                        <p className="mt-1 text-base text-[#FCFCFC]">
                          {userCountry || "Poland"}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                          Province
                        </p>
                        <p className="mt-1 font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                          Jakarta
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                          City
                        </p>
                        <p className="mt-1 font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                          Jakarta
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                          Postal Code
                        </p>
                        <p className="mt-1 font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                          12819
                        </p>
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
              <h2 className="font-medium text-2xl leading-9 tracking-[-0.01em] ">
                Shipping
              </h2>

              <div className="mt-4 flex items-center gap-4 rounded-md border border-[#383B42] bg-[#262626] px-[24px] py-[26px] text-[#D4D4D4] sm:p-6 ">
                <GreenShield />
                <span className="font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                  NexusHub Courier
                </span>
              </div>
            </section>

            <section>
              <h2 className="font-medium text-2xl leading-9 tracking-[-0.01em]">
                Payment Method
              </h2>
              <div className="mt-4 flex items-center gap-4 rounded-md border border-[#383B42] bg-[#262626] px-5 py-5 sm:px-6">
                <div className="h-8.5 w-13.5 shrink-0">
                  <ApplePayIcon />
                </div>
                <span className="font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                  Apple Pay
                </span>
              </div>
            </section>
          </section>

          <aside className="h-fit rounded-md border border-[#353535] bg-[#262626] p-4 sm:py-[36px] sm:px-[24px]">
            <h2 className="font-medium text-lg leading-7 tracking-normal align-middle text-[#FCFCFC]">
              Total Product
            </h2>
            <div className="mt-5 space-y-4 border-b border-[#383B42] pb-6 text-sm text-[#D4D4D4]">
              <div className={checkoutEntryClass}>
                <span>Total Product Price ({itemCount} Item)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={checkoutEntryClass}>
                <span>Total Product Protection</span>
                <span>${protectionTotal.toFixed(2)}</span>
              </div>
              <div className={checkoutEntryClass}>
                <span>Total Shipping Price</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className={checkoutEntryClass}>
                <span>Shipping Insurance</span>
                <span>${shippingInsurance.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-b border-[#383B42] pb-6 text-sm text-[#D4D4D4]">
              <p className="font-medium text-lg leading-7 tracking-normal align-middle text-[#FCFCFC]">
                Transaction Fees
              </p>
              <div className={checkoutEntryClass}>
                <span>Service Fees</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 text-xl font-medium">
              <span className="font-medium text-lg leading-7 tracking-normal align-middle text-[#FCFCFC]">
                Grand total
              </span>
              <span className="font-medium text-lg leading-7 tracking-normal align-middle text-[#FCFCFC]">
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
