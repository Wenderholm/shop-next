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
  const summaryRowClass =
    "flex w-full flex-col items-center justify-between gap-1 sm:flex-row sm:items-start";

  return (
    <aside className="h-fit rounded-md border border-border-strong bg-[#262626] p-4 sm:px-6 sm:py-9">
      <h2 className="text-center sm:text-left text-lg font-medium leading-7 tracking-normal align-middle text-foreground">
        Total Product
      </h2>
      <div className="mt-5 space-y-5 border-b border-border-default pb-6 text-sm sm:text-[16px] text-neutral-soft">
        <div className={summaryRowClass}>
          <span>
            Total Product Price ({itemCount}
            {itemCount === 1 ? " Item" : " Items"})
          </span>
          <span className="text-center sm:text-left text-base text-foreground sm:text-lg">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className={summaryRowClass}>
          <span>Total Product Protection</span>
          <span className=" text-center sm:text-left text-base text-foreground sm:text-lg">
            ${protectionTotal.toFixed(2)}
          </span>
        </div>
        <div className={summaryRowClass}>
          <span>Total Shipping Price</span>
          <span className="text-center sm:text-left text-base text-foreground sm:text-lg">
            ${shippingPrice.toFixed(2)}
          </span>
        </div>
        <div className={summaryRowClass}>
          <span>Shipping Insurance</span>
          <span className="text-center sm:text-left text-base text-foreground sm:text-lg">
            ${shippingInsurance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4 border-b border-border-default pb-6 text-sm text-neutral-soft">
        <p className="text-center sm:text-left text-lg font-medium leading-7 tracking-normal align-middle text-foreground">
          Transaction Fees
        </p>
        <div className={summaryRowClass}>
          <span className="text-sm sm:text-[16px]">Service Fees</span>
          <span className="text-center sm:text-left text-base text-foreground sm:text-lg">
            ${serviceFee.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-1 text-xl font-medium">
        <span className="text-center sm:text-left text-lg font-medium leading-7 tracking-normal align-middle text-foreground">
          Grand total
        </span>
        <span className="text-lg sm:text-[28px] font-medium leading-7 tracking-normal align-middle text-foreground">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      {submitError ? (
        <p className="mt-6 text-sm text-danger">{submitError}</p>
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
