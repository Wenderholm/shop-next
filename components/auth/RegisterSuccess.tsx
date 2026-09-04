import Link from "next/link";
import SuccessMark from "../icons/ui/SuccessMark";

export default function RegisterSuccess() {
  return (
    <div className="w-full max-w-4xl px-4 text-center text-white">
      <SuccessMark className="mx-auto h-18.75 w-18.75" />
      <h1 className="mt-10 text-[44px] leading-13.5 font-bold tracking-[-0.01em] text-foreground">
        Thank you!
      </h1>

      <p className="mt-2 text-[24px] leading-9 tracking-[-0.01em] font-medium text-foreground">
        You have successfully registered
      </p>

      <p className="mx-auto mt-8 max-w-5xl font-normal text-[18px] leading-9 text-foreground-soft">
        Please check your e-mail for further information. Let’s exploring our
        products and enjoy many gifts.
      </p>

      <p className="mt-4.75 text-[18px] leading-7 text-foreground-soft">
        Having problem?{" "}
        <Link
          href="/contact"
          className="text-[#f0b164] transition hover:text-orange"
        >
          Contact us
        </Link>
      </p>
    </div>
  );
}
