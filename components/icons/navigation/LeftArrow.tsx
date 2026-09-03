interface LeftArrowProps {
  className?: string;
}

export default function LeftArrow({ className }: LeftArrowProps) {
  return (
    <svg
      className={className}
      // width="20"
      // height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33325 10L16.6666 10M8.33325 15L3.33325 10L8.33325 5"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
