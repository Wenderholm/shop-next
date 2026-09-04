import type { AddressMode, CheckoutAddressFormState } from "@/types/checkout";

import CheckoutExistingAddress from "./CheckoutExistingAddress";
import CheckoutNewAddressForm from "./CheckoutNewAddressForm";

interface CheckoutAddressSectionProps {
  userCountry: string;
  addressMode: AddressMode;
  setAddressMode: (mode: AddressMode) => void;
  form: CheckoutAddressFormState;
}

export default function CheckoutAddressSection({
  userCountry,
  addressMode,
  setAddressMode,
  form,
}: CheckoutAddressSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-medium leading-7 tracking-[-0.01em] text-foreground sm:text-2xl sm:leading-9">
        Address
      </h2>
      <div className="mt-4 rounded-md border border-border-default bg-surface p-4 sm:p-6">
        <div className="grid grid-cols-2 border-b border-border-default text-sm font-medium">
          <button
            type="button"
            onClick={() => setAddressMode("existing")}
            className={`pb-3 text-sm font-semibold leading-6 transition sm:text-lg sm:leading-7 ${
              addressMode === "existing"
                ? "border-b-2 border-orange text-orange"
                : "text-foreground-dim"
            }`}
          >
            Existing Address
          </button>
          <button
            type="button"
            onClick={() => setAddressMode("new")}
            className={`pb-3 text-sm font-semibold leading-6 transition sm:text-lg sm:leading-7 ${
              addressMode === "new"
                ? "border-b-2 border-orange text-orange"
                : "text-foreground-dim"
            }`}
          >
            New Address
          </button>
        </div>

        {addressMode === "existing" ? (
          <CheckoutExistingAddress userCountry={userCountry} />
        ) : (
          <CheckoutNewAddressForm form={form} />
        )}
      </div>
    </section>
  );
}
