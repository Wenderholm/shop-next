import GreenShield from "@/components/icons/ui/GreenShield";

export default function CheckoutShippingSection() {
  return (
    <section>
      <h2 className="text-center text-xl font-medium leading-7 tracking-[-0.01em] sm:text-left sm:text-2xl sm:leading-9">
        Shipping
      </h2>

      <div className="mt-3 flex items-center justify-center gap-3 rounded-md border border-border-default bg-surface px-4 py-4 text-foreground-soft sm:mt-4 sm:justify-start sm:gap-4 sm:p-6">
        <GreenShield />
        <span className="whitespace-nowrap text-sm font-medium leading-6 tracking-normal text-foreground sm:text-lg sm:leading-7">
          NexusHub Courier
        </span>
      </div>
    </section>
  );
}
