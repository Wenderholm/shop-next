import { checkoutEntryClass } from "./styles";

interface CheckoutSummaryProps {
  itemCount: number;
  subtotal: number;
  protectionTotal: number;
  shippingPrice: number;
  shippingInsurance: number;
  serviceFee: number;
  grandTotal: number;
  submitError: string;
  isSubmitting: boolean;
  onCheckout: () => Promise<void>;
}

export default function CheckoutSummary({
  itemCount,
  subtotal,
  protectionTotal,
  shippingPrice,
  shippingInsurance,
  serviceFee,
  grandTotal,
  submitError,
  isSubmitting,
  onCheckout,
}: CheckoutSummaryProps) {
  return (
    <aside className="h-fit rounded-md border border-[#353535] bg-[#262626] p-4 sm:px-[24px] sm:py-[36px]">
      <h2 className="text-lg font-medium leading-7 tracking-normal align-middle text-[#FCFCFC]">
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
        <p className="text-lg font-medium leading-7 tracking-normal align-middle text-[#FCFCFC]">
          Transaction Fees
        </p>
        <div className={checkoutEntryClass}>
          <span>Service Fees</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-xl font-medium">
        <span className="text-lg font-medium leading-7 tracking-normal align-middle text-[#FCFCFC]">
          Grand total
        </span>
        <span className="text-lg font-medium leading-7 tracking-normal align-middle text-[#FCFCFC]">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      {submitError ? (
        <p className="mt-6 text-sm text-[#F87171]">{submitError}</p>
      ) : null}

      <button
        type="button"
        onClick={onCheckout}
        disabled={isSubmitting}
        className="mt-8 w-full rounded-md bg-orange px-4 py-4 font-medium text-[#262626] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processing..." : "Pay Now"}
      </button>
    </aside>
  );
}
