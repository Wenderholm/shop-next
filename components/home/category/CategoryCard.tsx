import Link from "next/link";
import { Category } from "@/types/category";
import MouseIcon from "../../icons/product/MouseIcon";
import MonitorIcon from "../../icons/product/MonitorIcon";
import HeadphoneIcon from "../../icons/product/HeadphoneIcon";
import KeyboardIcon from "../../icons/product/KeyboardIcon";
import WebcamIcon from "../../icons/product/WebcamIcon";

interface CategoryCardProps {
  category: Category;
}

const icons = {
  Mouse: <MouseIcon />,
  Monitor: <MonitorIcon />,
  Headphone: <HeadphoneIcon />,
  Keyboard: <KeyboardIcon />,
  Webcam: <WebcamIcon />,
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.name}`}
      className="
        flex
        flex-col
        items-center
        gap-6
        py-7
        rounded-md
        border
        border-border-muted
        bg-[#262626]
      "
    >
      <div>{icons[category.name as keyof typeof icons]}</div>

      <span className="font-medium text-[20px] leading-7.5 tracking-[-0.01em] text-foreground">
        {category.name}
      </span>
    </Link>
  );
}
