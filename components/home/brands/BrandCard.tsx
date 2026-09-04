import { Brand } from "@/types/brand";
import LogitechLogo from "@/components/icons/logos/LogitechLogo";
import RazerLogo from "@/components/icons/logos/RazerLogo";
import RogLogo from "@/components/icons/logos/RogLogo";
import JblLogo from "@/components/icons/logos/JblLogo";
import AocLogo from "@/components/icons/logos/AocLogo";
import RexusLogo from "@/components/icons/logos/RexusLogo";

interface BrandCardProps {
  brand: Brand;
}

const logos = {
  Logitech: <LogitechLogo />,
  Razer: <RazerLogo />,
  ROG: <RogLogo />,
  JBL: <JblLogo />,
  AOC: <AocLogo />,
  Rexus: <RexusLogo />,
};

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <div
      className="
        flex
        h-47.5
        w-55
        shrink-0
        flex-col
        items-center
        justify-center
        gap-4
        rounded-lg
        border
        border-border-default
        bg-[#262626]
      "
    >
      <div className="">{logos[brand.name as keyof typeof logos]}</div>
      <p className="text-[20px] leading-7.5 tracking-[-0.01em] text-foreground">
        {brand.name}
      </p>
    </div>
  );
}
