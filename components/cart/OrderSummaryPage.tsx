import Image from "next/image";
import Link from "next/link";

import SuccessMark from "@/components/icons/ui/SuccessMark";
import {
  buildInvoiceNumber,
  calculateItemCount,
  calculateProtectionTotalFromGrandTotal,
  calculateSubtotal,
  SERVICE_FEE,
  SHIPPING_INSURANCE,
  SHIPPING_PRICE,
} from "../../lib/checkout";
import type { OrderWithItems } from "@/services/order.service";

interface OrderSummaryPageProps {
  order: OrderWithItems;
}

export default function OrderSummaryPage({ order }: OrderSummaryPageProps) {
  const subtotal = calculateSubtotal(order.orderItems);
  const grandTotal = Number(order.totalAmount);
  const protectionTotal = calculateProtectionTotalFromGrandTotal(
    subtotal,
    grandTotal,
    order.orderItems.length > 0,
  );
  const itemCount = calculateItemCount(order.orderItems);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(order.createdAt));
  const invoiceNumber = buildInvoiceNumber(order.id, new Date(order.createdAt));
  const summaryRowClass =
    "flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 text-center sm:text-left font-medium text-base leading-[26px] tracking-normal align-middle";

  return (
    <main className="px-6 pb-20 pt-6 text-white lg:px-10">
      <div className="mx-auto w-full max-w-170 rounded-md border border-border-strong bg-surface p-4 sm:p-6">
        <SuccessMark className="mx-auto h-15 w-15" />

        <h1 className="mt-5 text-center text-2xl font-medium leading-8 tracking-[-0.01em] text-foreground sm:text-[28px] sm:leading-10">
          Thanks for Your Order!
        </h1>
        <p className="mt-6 text-center text-base leading-6.5 text-foreground">
          {invoiceNumber}
        </p>

        <section className="mt-6 ">
          <div className="border-b border-border-default pb-5">
            <p className="text-lg leading-7 text-foreground">
              Transaction Date
            </p>
            <p className="mt-3 text-base leading-6.5 text-foreground-soft">
              {formattedDate}
            </p>
          </div>

          <div className="border-b mt-6 border-border-default pb-5">
            <p className="text-lg leading-7 text-foreground">Payment Method</p>
            <div className="mt-4 flex items-center gap-3">
              <span>Apple Pay</span>
            </div>
          </div>

          <div className="border-b mt-6 border-border-default pb-5">
            <p className="text-lg leading-7 text-foreground">Shipping Method</p>
            <div className="mt-4 flex items-center gap-3">
              <span>NexusHub Courier</span>
            </div>
          </div>
        </section>

        <section className="mt-5 sm:mt-6">
          <p className="text-center text-xl font-medium leading-7 text-foreground sm:text-left sm:text-[28px] sm:leading-9">
            Your Order
          </p>
          <div className="mt-5 space-y-5">
            {order.orderItems.map((item) => (
              <article
                key={item.id}
                className="rounded-md border border-border-strong bg-surface"
              >
                <div className="flex min-w-0 flex-1 rounded-lg border border-border-strong bg-surface p-4 sm:p-5">
                  <div className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-start">
                    <Image
                      src={item.product.imageUrls[0]}
                      alt={item.product.name}
                      width={172}
                      height={138}
                      className="h-32 w-full rounded-md bg-white object-contain p-2 sm:h-34 sm:w-40 lg:w-40"
                    />

                    <div className="min-w-0 flex-1">
                      <div>
                        <h2 className="text-base sm:text-lg font-medium leading-7 tracking-[-0.01em] text-foreground sm:leading-7.5">
                          {item.product.name}
                        </h2>
                        <span className="mt-3 inline-flex rounded-md bg-brand-strong px-3 py-1 text-xs font-medium text-accent-soft sm:text-sm sm:leading-6">
                          {item.product.category.name}
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-between  sm:items-center sm:text-left">
                        <p className="mt-3 text-xl font-semibold leading-7 tracking-[-0.01em] text-foreground sm:mt-4 sm:text-[24px] sm:leading-10">
                          ${Number(item.priceAtPurchase).toFixed(2)}
                        </p>

                        <p className="mt-3 text-sm text-foreground sm:mt-4 sm:text-base sm:leading-6.5">
                          x {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-7.5 text-sm text-foreground-soft">
          <div className="space-y-4 border-b border-border-default pb-5">
            <div className={summaryRowClass}>
              <span>Total Product Price ({itemCount} Item)</span>
              <span className="  text-base text-foreground sm:text-lg">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className={summaryRowClass}>
              <span>Total Product Protection</span>
              <span className=" text-base text-foreground sm:text-lg">
                ${protectionTotal.toFixed(2)}
              </span>
            </div>
            <div className={summaryRowClass}>
              <span>Total Shipping Price</span>
              <span className="  text-base text-foreground sm:text-lg">
                ${SHIPPING_PRICE.toFixed(2)}
              </span>
            </div>
            <div className={summaryRowClass}>
              <span>Shipping Insurance</span>
              <span className="  text-base text-foreground sm:text-lg">
                ${SHIPPING_INSURANCE.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-4 border-b border-border-default py-5">
            <p className="text-center sm:text-left font-medium text-base text-foreground sm:text-lg">
              Transaction Fees
            </p>
            <div className={summaryRowClass}>
              <span>Service Fees</span>
              <span className=" text-base text-foreground sm:text-lg">
                ${SERVICE_FEE.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-1 py-5 sm:text-left">
            <span className="text-base text-foreground sm:text-lg">
              Grand total
            </span>
            <span className="text-[28px] font-medium leading-8 tracking-[-0.01em] text-foreground sm:text-[32px] sm:leading-9">
              ${grandTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border-default pb-5">
            <span className="text-base text-foreground sm:text-lg">Status</span>
            <span className="rounded-md bg-[#295B40] px-2.5 py-1.5 font-medium text-sm leading-6 tracking-normal text-[#DCFCE8]">
              Success
            </span>
          </div>

          <Link
            href="/products"
            className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-orange px-4 py-4 font-medium text-foreground-inverse transition hover:brightness-105"
          >
            Continue Shopping
          </Link>
        </section>
      </div>
    </main>
  );
}
