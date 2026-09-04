import { labelStyle } from "./styles";

interface CheckoutExistingAddressProps {
  userCountry: string;
}

export default function CheckoutExistingAddress({
  userCountry,
}: CheckoutExistingAddressProps) {
  return (
    <div className="pt-8 text-foreground-soft">
      <div className="mb-3 flex gap-4">
        <p className="flex items-center justify-center text-base font-medium leading-6.5 tracking-normal text-foreground-soft">
          Address
        </p>
        <span className={labelStyle}>Main Address</span>
      </div>
      <div>
        <p className="text-lg font-medium leading-7 text-foreground">
          Bangalau Road No 23, RT 4/RW 6, Kinajaya
        </p>
      </div>

      <div className="mt-10 flex justify-between text-sm">
        <div>
          <p className="text-base font-medium leading-6.5 tracking-normal text-foreground-soft">
            Country
          </p>
          <p className="mt-1 text-base text-foreground">
            {userCountry || "Poland"}
          </p>
        </div>
        <div>
          <p className="text-base font-medium leading-6.5 tracking-normal text-foreground-soft">
            Province
          </p>
          <p className="mt-1 text-lg font-medium leading-7 tracking-normal text-foreground">
            Jakarta
          </p>
        </div>
        <div>
          <p className="text-base font-medium leading-6.5 tracking-normal text-foreground-soft">
            City
          </p>
          <p className="mt-1 text-lg font-medium leading-7 tracking-normal text-foreground">
            Jakarta
          </p>
        </div>
        <div>
          <p className="text-base font-medium leading-6.5 tracking-normal text-foreground-soft">
            Postal Code
          </p>
          <p className="mt-1 text-lg font-medium leading-7 tracking-normal text-foreground">
            12819
          </p>
        </div>
      </div>
    </div>
  );
}
