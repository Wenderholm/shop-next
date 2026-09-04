interface FooterColumnProps {
  title: string;
  items: string[];
}

export default function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-8 text-[20px] font-semibold leading-7.5 tracking-[-0.01em]">
        {title}
      </h3>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="
              cursor-pointer
              text-[16px]
              leading-6.5
              text-foreground-soft
              transition-colors
              hover:text-orange
            "
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
