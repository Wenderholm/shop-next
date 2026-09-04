import Link from "next/link";
import UserIcon from "@/components/icons/UserIcon";
import CartLink from "@/components/layout/CartLink";

type HeaderActionsProps = {
  isAuthenticated: boolean;
};

export default function HeaderActions({ isAuthenticated }: HeaderActionsProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4">
        <Link
          href="/login"
          className="w-full rounded-xl border border-orange bg-orange px-5 py-3 text-center font-semibold text-[16px] leading-6.5 text-[#262626] transition-colors hover:border-orange hover:text-white md:w-auto"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="w-full rounded-xl border border-orange bg-orange px-5 py-3 text-center font-semibold text-[16px] leading-6.5 text-[#262626] transition-colors hover:border-orange hover:text-white md:w-auto"
        >
          Create Account
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-6">
      <CartLink />
      <Link href="/profile">
        <UserIcon className="w-10 h-10" />
      </Link>
    </div>
  );
}
