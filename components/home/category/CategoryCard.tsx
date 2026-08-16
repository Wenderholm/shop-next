import Link from "next/link";
import { Category } from "@/types/category";
import MouseIcon from "../../icons/MouseIcon";
import MonitorIcon from "../../icons/MonitorIcon";
import HeadphoneIcon from "../../icons/HeadphoneIcon";
import KeyboardIcon from "../../icons/KeyboardIcon";
import WebcamIcon from "../../icons/WebcamIcon";

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
        py-[28px]
        rounded-md
        border
        border-[#616674]
        bg-[#262626]
      "
    >
      <div>{icons[category.name as keyof typeof icons]}</div>

      <span className="font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
        {category.name}
      </span>
    </Link>
  );
}
