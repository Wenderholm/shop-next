import Link from "next/link";

import LogoutButton from "@/components/LogoutButton";
import UserIcon from "@/components/icons/UserIcon";
import TransactionIcon from "@/components/icons/TransactionIcon";
import { buildInvoiceNumber } from "@/lib/checkout";

import type { OrderWithItems } from "@/services/order.service";

interface ProfilePageProps {
  user: {
    firstName: string;
    email: string;
    address: string;
  };
  orders: OrderWithItems[];
}

export default function ProfilePage({ user, orders }: ProfilePageProps) {
  return (
    <main className="px-6 pb-10 pt-6 text-white lg:px-10">
      <div className="mx-auto max-w-[1870px]">
        <div className="mb-[58px] flex items-center gap-6 text-[16px] leading-[26px]">
          <Link href="/" className="text-[#B0B0B0] hover:text-white">
            Home
          </Link>
          <span className="text-[#B0B0B0]">›</span>
          <span className="font-medium text-white">Profile</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-16">
          <aside className="h-fit rounded-md border border-[#383B42] bg-[#262626] p-6">
            <div className="flex items-center gap-6 border-b border-[#383B42] pb-6">
              <div className="h-[72px] w-[72px] overflow-hidden rounded-full">
                <UserIcon className="h-full w-full" />
              </div>
              <div>
                <h1 className="font-medium text-base leading-[26px] tracking-normal align-middle text-[#FCFCFC]">
                  {user.firstName}
                </h1>
                <p className="mt-1 font-normal text-sm leading-6 tracking-normal align-middle text-[#E7E7E7]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <LogoutButton className="font-medium text-base leading-[26px] tracking-normal align-middle text-[#E7E7E7] transition hover:text-orange">
                Logout
              </LogoutButton>
            </div>
          </aside>

          <section>
            <div className="mb-8 w-1/2 border-b border-orange pb-3 ">
              <h2 className="font-semibold text-lg leading-7 tracking-normal text-center text-[#F29145]">
                Transaction
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-2xl border border-[#383B42] bg-[#262626] px-6 py-16 text-center">
                <h3 className="text-2xl font-medium text-[#FCFCFC]">
                  You have no orders yet
                </h3>
                <p className="mt-3 text-[#B0B0B0]">
                  Your completed orders will appear here.
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex rounded-md bg-orange px-6 py-3 font-medium text-[#262626]"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const formattedDate = new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                    .format(new Date(order.createdAt))
                    .replace(",", "");
                  const invoiceNumber = buildInvoiceNumber(
                    order.id,
                    new Date(order.createdAt),
                  );

                  return (
                    <article
                      key={order.id}
                      className="rounded-xl border border-[#383B42] bg-[#262626] p-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className="shrink-0 pt-1">
                          <TransactionIcon />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-normal text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                            {formattedDate}
                          </p>

                          <div className="mt-[14px] font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                            Your order nr {invoiceNumber}
                            <ul className=" list-disc pl-4 font-medium text-lg leading-7 tracking-normal text-[#FCFCFC]">
                              {order.orderItems.map((item) => (
                                <li key={item.id}>{item.product.name}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
