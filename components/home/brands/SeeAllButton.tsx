import React from "react";

interface SeeAllButtonProps {
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
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
