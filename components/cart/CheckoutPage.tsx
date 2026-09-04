"use client";
import Link from "next/link";
import CheckoutAddressSection from "@/components/cart/checkout/CheckoutAddressSection";
import CheckoutBreadcrumb from "@/components/cart/checkout/CheckoutBreadcrumb";
import CheckoutOrderList from "@/components/cart/checkout/CheckoutOrderList";
import CheckoutPaymentSection from "@/components/cart/checkout/CheckoutPaymentSection";
import CheckoutShippingSection from "@/components/cart/checkout/CheckoutShippingSection";
import CheckoutSummary from "@/components/cart/checkout/CheckoutSummary";
import { useCheckoutPage } from "@/hooks/useCheckoutPage";

interface CheckoutPageProps {
  userCountry: string;
}

export default function CheckoutPage({ userCountry }: CheckoutPageProps) {
  const {
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
  } = useCheckoutPage({ userCountry });

  if (loading) {
    return (
      <main className="px-10 py-16 text-foreground-dim">
        Loading checkout...
      </main>
    );
  }

  return (
    <main className="px-6 pb-12 pt-4 text-white lg:px-10">
      <CheckoutBreadcrumb breadcrumbLabel={breadcrumbLabel} />

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <h1 className="text-2xl font-medium">Your cart is empty</h1>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-orange px-6 py-3 text-foreground-inverse"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_423px] xl:grid-cols-[minmax(0,1fr)_423px]">
          <section className="space-y-10">
            <CheckoutOrderList
              items={items}
              protectedItems={protectedItems}
              onUpdateQuantity={updateQuantity}
              onToggleProtection={toggleProtection}
            />

            <CheckoutAddressSection
              userCountry={userCountry}
              addressMode={addressMode}
              setAddressMode={setAddressMode}
              form={addressForm}
            />

            <CheckoutShippingSection />
            <CheckoutPaymentSection />
          </section>

          <CheckoutSummary
            itemCount={itemCount}
            subtotal={subtotal}
            protectionTotal={protectionTotal}
            shippingPrice={shippingPrice}
            shippingInsurance={shippingInsurance}
            serviceFee={serviceFee}
            grandTotal={grandTotal}
            submitError={submitError}
            isSubmitting={isSubmitting}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </main>
  );
}
