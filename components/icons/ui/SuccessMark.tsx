interface SuccessMarkProps {
  className?: string;
}

export default function SuccessMark({ className }: SuccessMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 8.5L9.74998 17.25L5.99992 13.5M23.5 12.25C23.5 18.4632 18.4632 23.5 12.25 23.5C6.0368 23.5 1 18.4632 1 12.25C1 6.0368 6.0368 1 12.25 1C18.4632 1 23.5 6.0368 23.5 12.25Z"
        stroke="#4ADE80"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
