import SelectArrow from "@/components/icons/navigation/SelectArrow";
import CheckIcon from "@/components/icons/ui/CheckIcon";
import type { CheckoutAddressFormState } from "@/types/checkout";

import { selectClass } from "./styles";

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

interface CheckoutNewAddressFormProps {
  form: CheckoutAddressFormState;
}

export default function CheckoutNewAddressForm({
  form,
}: CheckoutNewAddressFormProps) {
  return (
    <div className="space-y-4 pt-6">
      <div className="mb-6 grid gap-4 sm:mb-8 sm:gap-8 sm:grid-cols-2">
        <div className="relative w-full">
          <select
            value={form.newAddressCountry}
            onChange={(event) => form.setNewAddressCountry(event.target.value)}
            className={`${selectClass} ${
              form.newAddressCountry === ""
                ? "text-foreground-dim"
                : "text-foreground"
            }`}
          >
            <option value="" disabled>
              Country
            </option>
            {countryOptions.map((country) => (
              <option key={country} value={country} className="bg-surface">
                {country}
              </option>
            ))}
          </select>

          <SelectArrow className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </div>

        <div className="relative w-full">
          <select
            value={form.province}
            onChange={(event) => form.setProvince(event.target.value)}
            className={`${selectClass} ${
              form.province === "" ? "text-foreground-dim" : "text-foreground"
            }`}
          >
            <option value="" disabled>
              Province
            </option>
            {provinceOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>

          <SelectArrow className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </div>

        <div className="relative">
          <select
            value={form.city}
            onChange={(event) => form.setCity(event.target.value)}
            className={`${selectClass} ${
              form.city === "" ? "text-foreground-dim" : "text-foreground"
            }`}
          >
            <option value="" disabled>
              City
            </option>
            {cityOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
          <SelectArrow className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </div>

        <div className="relative w-full">
          <select
            value={form.postalCode}
            onChange={(event) => form.setPostalCode(event.target.value)}
            className={`${selectClass} ${
              form.postalCode === "" ? "text-foreground-dim" : "text-foreground"
            }`}
          >
            <option value="" disabled>
              Postal Code
            </option>
            {postalCodeOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
          <SelectArrow className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </div>
      </div>
      <textarea
        value={form.streetAddress}
        onChange={(event) => form.setStreetAddress(event.target.value)}
        rows={5}
        placeholder="Input Complete Address"
        className="w-full rounded-md border border-[#4B4B4B] bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-sm placeholder:font-normal placeholder:text-[#7B7B7B] sm:placeholder:text-base"
      />

      <label className="flex items-center gap-3 text-sm text-foreground-soft">
        <button
          type="button"
          onClick={form.toggleMainAddress}
          className={`flex h-5 w-5 items-center justify-center rounded-md ${
            form.isMainAddress
              ? "bg-orange text-foreground-inverse"
              : "border border-[#5B5B5B] bg-transparent"
          }`}
        >
          {form.isMainAddress ? <CheckIcon className="h-3.5 w-3.5" /> : null}
        </button>
        <span className="text-sm font-medium leading-6 tracking-normal sm:text-base sm:leading-6.5">
          Make it the main address
        </span>
      </label>
    </div>
  );
}
