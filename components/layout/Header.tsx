"use client";
import Link from "next/link";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";

export default function Header() {
  return (
    <header className="flex flex-col justify-between mt-8 mb-8 ml-10 mr-10 border-b border-[#383B42]">
      <div className="flex flex-row justify-between items-center mb-10">
        <Link href="/">
          <p className="font-semibold text-[32px] leading-[44px] tracking-[-0.01em]">
            <span className=" text-orange ">Devstock</span>
            Hub
          </p>
        </Link>
        <HeaderActions />
      </div>
      <Navigation />
    </header>
  );
}
