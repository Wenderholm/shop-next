import Link from "next/link";

import LogoutButton from "@/components/auth/LogoutButton";
import UserIcon from "@/components/icons/UserIcon";
import TransactionIcon from "@/components/icons/ui/TransactionIcon";
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
        <div className="mb-[58px] flex items-center gap-6 text-base leading-6.5">
          <Link href="/" className="text-foreground-dim hover:text-white">
            Home
          </Link>
          <span className="text-foreground-dim">›</span>
          <span className="font-medium text-white">Profile</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-16">
          <aside className="h-fit rounded-md border border-border-default bg-surface p-6">
            <div className="flex items-center gap-6 border-b border-border-default pb-6">
              <div className="h-18 w-18 overflow-hidden rounded-full">
                <UserIcon className="h-full w-full" />
              </div>
              <div>
                <h1 className="align-middle text-base font-medium leading-6.5 tracking-normal text-foreground">
                  {user.firstName}
                </h1>
                <p className="mt-1 align-middle text-sm font-normal leading-6 tracking-normal text-foreground-soft">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <LogoutButton className="align-middle text-base font-medium leading-6.5 tracking-normal text-foreground-soft transition hover:text-orange">
                Logout
              </LogoutButton>
            </div>
          </aside>

          <section>
            <div className="mb-8 w-1/2 border-b border-orange pb-3 ">
              <h2 className="text-center text-lg font-semibold leading-7 tracking-normal text-orange">
                Transaction
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-2xl border border-border-default bg-surface px-6 py-16 text-center">
                <h3 className="text-2xl font-medium text-foreground">
                  You have no orders yet
                </h3>
                <p className="mt-3 text-foreground-dim">
                  Your completed orders will appear here.
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex rounded-md bg-orange px-6 py-3 font-medium text-foreground-inverse"
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
                      className="rounded-xl border border-border-default bg-surface p-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className="shrink-0 pt-1">
                          <TransactionIcon />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-base font-normal leading-6.5 tracking-normal text-foreground-soft">
                            {formattedDate}
                          </p>

                          <div className="mt-3.5 text-lg font-medium leading-7 tracking-normal text-foreground">
                            Your order nr {invoiceNumber}
                            <ul className="list-disc pl-4 text-lg font-medium leading-7 tracking-normal text-foreground">
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
