import { labelStyle } from "./styles";

interface CheckoutExistingAddressProps {
  userCountry: string;
}

export default function CheckoutExistingAddress({
  userCountry,
}: CheckoutExistingAddressProps) {
  return (
    <div className="pt-6 text-foreground-soft sm:pt-8">
      <div className="mb-3 flex gap-3 sm:gap-4">
        <p className="flex items-center justify-center text-sm font-medium leading-6 tracking-normal text-foreground-soft sm:text-base sm:leading-6.5">
          Address
        </p>
        <span className={labelStyle}>Main Address</span>
      </div>
      <div>
        <p className="text-base font-medium leading-6 text-foreground sm:text-lg sm:leading-7">
          Bangalau Road No 23, RT 4/RW 6, Kinajaya
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:flex sm:justify-between sm:gap-0 sm:mt-8">
        <div>
          <p className="text-sm font-medium leading-6 tracking-normal text-foreground-soft sm:text-base sm:leading-6.5">
            Country
          </p>
          <p className="mt-1 text-sm text-foreground sm:text-base">
            {userCountry || "Poland"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium leading-6 tracking-normal text-foreground-soft sm:text-base sm:leading-6.5">
            Province
          </p>
          <p className="mt-1 text-sm font-medium leading-6 tracking-normal text-foreground sm:text-lg sm:leading-7">
            Jakarta
          </p>
        </div>
        <div>
          <p className="text-sm font-medium leading-6 tracking-normal text-foreground-soft sm:text-base sm:leading-6.5">
            City
          </p>
          <p className="mt-1 text-sm font-medium leading-6 tracking-normal text-foreground sm:text-lg sm:leading-7">
            Jakarta
          </p>
        </div>
        <div>
          <p className="text-sm font-medium leading-6 tracking-normal text-foreground-soft sm:text-base sm:leading-6.5">
            Postal Code
          </p>
          <p className="mt-1 text-sm font-medium leading-6 tracking-normal text-foreground sm:text-lg sm:leading-7">
            12819
          </p>
        </div>
      </div>
    </div>
  );
}
