import GreenShield from "@/components/icons/ui/GreenShield";

export default function CheckoutShippingSection() {
  return (
    <section>
      <h2 className="text-2xl font-medium leading-9 tracking-[-0.01em]">
        Shipping
      </h2>

      <div className="mt-4 flex items-center gap-4 rounded-md border border-border-default bg-surface px-6 py-6.5 text-foreground-soft sm:p-6">
        <GreenShield />
        <span className="text-lg font-medium leading-7 tracking-normal text-foreground">
          NexusHub Courier
        </span>
      </div>
    </section>
  );
}
