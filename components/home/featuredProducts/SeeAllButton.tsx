import { useState } from "react";

interface SeeAllButtonProps {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
}

export default function SeeAllButton({
  showAll,
  setShowAll,
}: SeeAllButtonProps) {
  return (
    <button
      type="button"
      onClick={() => setShowAll(!showAll)}
      className="text-orange text-[16px] leading-6.5 font-medium "
    >
      {showAll ? "Show less" : "See all"}
    </button>
  );
}
