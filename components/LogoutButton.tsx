"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-xl border border-orange bg-orange px-5 py-3 font-semibold text-[16px] leading-[26px] text-[#262626] transition-colors hover:border-orange hover:text-white"
    >
      Logout
    </button>
  );
}
