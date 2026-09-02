import Link from "next/link";
import SuccessMark from "../icons/SuccessMark";

export default function RegisterSuccess() {
  return (
    <div className="w-full max-w-4xl px-4 text-center text-white">
      <SuccessMark className="mx-auto h-[75px] w-[75px]" />
      <h1 className="mt-10 text-[44px] leading-[54px] font-bold tracking-[-0.01em] text-[#FCFCFC]">
        Thank you!
      </h1>

      <p className="mt-2 text-[24px] leading-[36px] tracking-[-0.01em] font-medium text-[#FCFCFC]">
        You have successfully registered
      </p>

      <p className="mx-auto mt-8 max-w-5xl font-[400] text-[18px] leading-9 text-[#E7E7E7]">
        Please check your e-mail for further information. Let’s exploring our
        products and enjoy many gifts.
      </p>

      <p className="mt-[19px] text-[18px] leading-7 text-[#E7E7E7]">
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
