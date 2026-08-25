import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import UserIcon from "@/components/icons/UserIcon";
import LogoutButton from "@/components/LogoutButton";

type HeaderActionsProps = {
  isAuthenticated: boolean;
  userName: string;
};

export default function HeaderActions({
  isAuthenticated,
  userName,
}: HeaderActionsProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-row items-center gap-4">
        <Link
          href="/login"
          className="rounded-xl border border-orange bg-orange px-5 py-3 font-semibold text-[16px] leading-[26px] text-[#262626] transition-colors hover:border-orange hover:text-white"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="rounded-xl border border-orange bg-orange px-5 py-3 font-semibold text-[16px] leading-[26px] text-[#262626] transition-colors hover:border-orange hover:text-white"
        >
          Create Account
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-6">
      <div className=" flex gap-5 justify-center align-middle text-right">
        <div>
          <p className="flex justify-centertext-sm text-[#B0B0B0]">Welcome</p>
        </div>
        <div>
          <p className="font-semibold text-white">{userName.toUpperCase()}</p>
        </div>
      </div>
      <LogoutButton />
      <button type="button" aria-label="Open cart">
        <CartIcon className="w-6 h-6" />
      </button>
      <Link href="/profile">
        <UserIcon className="w-10 h-10" />
      </Link>
    </div>
  );
}
