import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import UserIcon from "@/components/icons/UserIcon";
export default function HeaderActions() {
  return (
    <div className="flex flex-row gap-6">
      <button>
        <CartIcon className="w-6 h-6" />
      </button>
      <Link href="/profile">
        <UserIcon className="w-10 h-10" />
      </Link>
    </div>
  );
}
