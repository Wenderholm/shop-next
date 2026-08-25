import Link from "next/link";
import { auth } from "@/auth";
import Navigation from "@/components/layout/Navigation";
import HeaderActions from "@/components/layout/HeaderActions";

export default async function Header() {
  const session = await auth();
  const userName =
    session?.user?.name?.trim() || session?.user?.email || "User";
  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="flex flex-col justify-between mt-8 mb-8 ml-10 mr-10 border-b border-[#383B42]">
      <div className="flex flex-row justify-between items-center mb-10">
        <Link href="/">
          <p className="font-semibold text-[32px] leading-[44px] tracking-[-0.01em]">
            <span className=" text-orange ">Devstock</span>
            Hub
          </p>
        </Link>
        <HeaderActions isAuthenticated={isAuthenticated} userName={userName} />
      </div>
      <Navigation isAuthenticated={isAuthenticated} />
    </header>
  );
}
