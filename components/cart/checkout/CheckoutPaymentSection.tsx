import ApplePayIcon from "@/components/icons/paymentMethod/ApplePayIcon";

export default function CheckoutPaymentSection() {
  return (
    <section>
      <h2 className="text-2xl font-medium leading-9 tracking-[-0.01em]">
        Payment Method
      </h2>
      <div className="mt-4 flex items-center gap-6 rounded-md border border-border-default bg-surface px-5 py-5 sm:px-6">
        <div className="h-8.5 w-13.5 shrink-0">
          <ApplePayIcon />
        </div>
        <span className="text-lg font-medium leading-7 tracking-normal text-foreground">
          Apple Pay
        </span>
      </div>
    </section>
  );
}
