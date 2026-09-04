import Link from "next/link";
import { auth } from "@/auth";
import Navigation from "@/components/layout/Navigation";
import HeaderActions from "@/components/layout/HeaderActions";
import LoginSuccessNotification from "@/components/layout/LoginSuccessNotification";

export default async function Header() {
  const session = await auth();

  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="mt-8 mb-8 ml-10 mr-10 flex flex-col justify-between border-b border-border-default">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/">
          <p className="font-semibold text-center text-[32px] leading-11 tracking-[-0.01em]">
            <span className=" text-orange ">Devstock</span>
            Hub
          </p>
        </Link>

        <LoginSuccessNotification />

        <HeaderActions isAuthenticated={isAuthenticated} />
      </div>
      <Navigation isAuthenticated={isAuthenticated} />
    </header>
  );
}
