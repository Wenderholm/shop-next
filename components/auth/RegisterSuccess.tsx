import Link from "next/link";

export default function RegisterSuccess() {
  return (
    <div className="w-full max-w-4xl px-4 text-center text-white">
      <div className="mx-auto flex h-34 w-34 items-center justify-center rounded-full border-[6px] border-[#79f2b0]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-16 w-16 text-[#79f2b0]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="mt-16 text-6xl font-semibold text-[#f5f5f5]">
        Thank you!
      </h1>

      <p className="mt-8 text-3xl font-medium">
        You have successfully registered
      </p>

      <p className="mx-auto mt-14 max-w-5xl text-xl leading-9 text-[#d2d2d2]">
        Please check your e-mail for further information.
      </p>

      <p className="mt-12 text-xl text-[#d2d2d2]">
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
