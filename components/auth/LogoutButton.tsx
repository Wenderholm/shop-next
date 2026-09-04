"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className,
  children,
}: LogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={
        className ??
        "rounded-xl border border-orange bg-orange px-5 py-3 font-semibold text-[16px] leading-6.5 text-[#262626] transition-colors hover:border-orange hover:text-white"
      }
    >
      {children ?? "Logout"}
    </button>
  );
}
