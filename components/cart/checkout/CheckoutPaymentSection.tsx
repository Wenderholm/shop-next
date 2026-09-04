import ApplePayIcon from "@/components/icons/paymentMethod/ApplePayIcon";

export default function CheckoutPaymentSection() {
  return (
    <section>
      <h2 className="text-center text-xl font-medium leading-7 tracking-[-0.01em] sm:text-left sm:text-2xl sm:leading-9">
        Payment Method
      </h2>
      <div className="mt-3 flex items-center justify-center gap-4 rounded-md border border-border-default bg-surface px-4 py-4 sm:mt-4 sm:justify-start sm:gap-6 sm:px-6 sm:py-5">
        <div className="h-8.5 w-13.5 shrink-0">
          <ApplePayIcon />
        </div>
        <span className="text-sm font-medium leading-6 tracking-normal text-foreground sm:text-lg sm:leading-7">
          Apple Pay
        </span>
      </div>
    </section>
  );
}
