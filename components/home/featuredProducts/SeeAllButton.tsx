import { useState } from "react";

export default function SeeAllButton({
  showAll,
  setShowAll,
}: SeeAllButtonProps) {
  return (
    <button
      type="button"
      onClick={() => setShowAll(!showAll)}
      className="text-orange text-[16px] leading-[26px] font-medium"
    >
      {showAll ? "Show less" : "See all"}
    </button>
  );
}

interface SeeAllButtonProps {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
}
