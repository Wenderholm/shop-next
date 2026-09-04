import React from "react";

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
      className="text-orange"
    >
      {showAll ? "See less" : "See all"}
    </button>
  );
}
