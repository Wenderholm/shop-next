"use client";

import { useCartNotification } from "@/contexts/CartNotificationContext";
import SuccessMark from "../icons/SuccessMark";

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
        rounded-[6px]
        border
        border-[#22C55E]
        bg-[#295B40]
        px-6
        py-4
        shadow-lg
      "
    >
      <div className="flex items-center gap-4">
        <SuccessMark />
        <div className="w-full flex items-center justify-between">
          <span className="text-[#FCFCFC] text-[20px] leading-[30px] tracking-[-0.01em] ">
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
