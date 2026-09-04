"use client";

import { useCartNotification } from "@/contexts/CartNotificationContext";
import SuccessMark from "../icons/ui/SuccessMark";

export default function CartNotification() {
  const { isOpen, hideNotification } = useCartNotification();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        mx-10
        my-4
        items-center
        justify-between
        rounded-md
        border
        border-[#22C55E]
        bg-[#295B40]
        px-6
        py-4
        shadow-lg
      "
    >
      <div className="flex items-center gap-4">
        <SuccessMark className="w-6.25 h-6.25" />
        <div className="w-full flex items-center justify-between">
          <span className="text-foreground text-[20px] leading-7.5 tracking-[-0.01em] ">
            Product Successfully Added
          </span>
          <button
            type="button"
            className="text-xl text-white"
            onClick={hideNotification}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
