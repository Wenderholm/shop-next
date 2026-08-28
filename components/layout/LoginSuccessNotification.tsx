"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginSuccessNotification() {
  const searchParams = useSearchParams();
  const [isDismissed, setIsDismissed] = useState(false);
  const isLoginSuccessful = searchParams.get("login") === "success";

  useEffect(() => {
    if (!isLoginSuccessful) {
      return;
    }

    const timeout = window.setTimeout(() => setIsDismissed(true), 3000);

    return () => window.clearTimeout(timeout);
  }, [isLoginSuccessful]);

  if (!isLoginSuccessful || isDismissed) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed left-1/2 top-8 z-50 -translate-x-1/2 animate-[fade-in_200ms_ease-out] rounded-2xl border border-green-400/40 bg-[#202820] px-8 py-4 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <p className="text-sm font-medium uppercase tracking-[0.12em] text-green-300">
        Successfully logged in
      </p>
      <p className="mt-1 text-white">Welcome back!</p>
    </div>
  );
}
