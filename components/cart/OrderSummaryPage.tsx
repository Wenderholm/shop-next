import Image from "next/image";
import Link from "next/link";

import ApplePayIcon from "@/components/icons/paymentMethod/ApplePayIcon";
import GreenShield from "@/components/icons/GreenShield";
import SuccessMark from "@/components/icons/SuccessMark";
import {
  buildInvoiceNumber,
  SERVICE_FEE,
  SHIPPING_INSURANCE,
  SHIPPING_PRICE,
} from "../../lib/checkout";

interface OrderSummaryPageProps {
  order: {
    id: number;
    createdAt: Date;
    totalAmount: string;
    orderItems: Array<{
      id: number;
      quantity: number;
      priceAtPurchase: string | number;
      product: {
        id: number;
        name: string;
        imageUrls: string[];
        category: { name: string };
      };
    }>;
  };
}

export default function OrderSummaryPage({ order }: OrderSummaryPageProps) {
  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
    0,
  );
  const grandTotal = Number(order.totalAmount);
  const protectionTotal = Math.max(
    grandTotal - subtotal - SHIPPING_PRICE - SHIPPING_INSURANCE - SERVICE_FEE,
    0,
  );
  const itemCount = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(order.createdAt));
  const invoiceNumber = buildInvoiceNumber(order.id, new Date(order.createdAt));

  return (
    <main className="px-6 pb-20 pt-6 text-white lg:px-10">
      <div className="mx-auto w-full max-w-170 rounded-md border border-[#353535] bg-[#262626] p-4 sm:p-6">
        <SuccessMark className="mx-auto h-[60px] w-[60px]" />

        <h1 className="mt-5 text-center text-[28px] font-medium leading-10 tracking-[-0.01em] text-[#FCFCFC]">
          Thanks for Your Order!
        </h1>
        <p className="mt-6 text-center text-[16px] leading-[26px] text-[#FCFCFC]">
          {invoiceNumber}
        </p>

        <section className="mt-6 ">
          <div className="border-b border-[#383B42] pb-5">
            <p className="text-[18px] leading-[28px] text-[#FCFCFC]">
              Transaction Date
            </p>
            <p className="mt-3 text-[16px] leading-[26px] text-[#E7E7E7]">
              {formattedDate}
            </p>
          </div>

          <div className="border-b border-[#383B42] pb-5">
            <p className="text-[18px] leading-[28px] text-[#FCFCFC]">
              Payment Method
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span>Apple Pay</span>
            </div>
          </div>

          <div className="border-b border-[#383B42] pb-5">
            <p className="text-[18px] leading-[28px] text-[#FCFCFC]">
              Shipping Method
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span>NexusHub Courier</span>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <p className="text-[#FCFCFC]">Your Order</p>
          <div className="mt-4 space-y-4">
            {order.orderItems.map((item) => (
              <article
                key={item.id}
                className="flex gap-4 rounded-md border border-[#353535] bg-[#242424] p-4"
              >
                <div className="flex h-23 w-23 shrink-0 items-center justify-center rounded-md bg-white p-3">
                  <Image
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    width={72}
                    height={72}
                    className="h-auto w-auto object-contain"
                  />
                </div>

                <div className="flex min-w-0 flex-1 items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium text-[#FCFCFC]">
                      {item.product.name}
                    </h2>
                    <span className="mt-2 inline-flex rounded-md bg-[#E5610A] px-3 py-1 text-xs font-medium text-[#FDEDD7]">
                      {item.product.category.name}
                    </span>
                    <p className="mt-4 text-[30px] font-semibold leading-10 tracking-[-0.01em] text-[#FCFCFC]">
                      ${Number(item.priceAtPurchase).toFixed(2)}
                    </p>
                  </div>

                  <p className="pb-1 text-sm text-[#FCFCFC]">
                    x{item.quantity}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 border-t border-[#383B42] pt-5 text-sm text-[#D4D4D4]">
          <div className="space-y-4 border-b border-[#383B42] pb-5">
            <div className="flex items-start justify-between gap-4">
              <span>Total Product Price ({itemCount} Item)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span>Total Product Protection</span>
              <span>${protectionTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span>Total Shipping Price</span>
              <span>${SHIPPING_PRICE.toFixed(2)}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span>Shipping Insurance</span>
              <span>${SHIPPING_INSURANCE.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4 border-b border-[#383B42] py-5">
            <p className="font-medium text-[#FCFCFC]">Transaction Fees</p>
            <div className="flex items-start justify-between gap-4">
              <span>Service Fees</span>
              <span>${SERVICE_FEE.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 py-5">
            <span className="text-[#FCFCFC]">Grand total</span>
            <span className="text-[36px] font-medium leading-10 tracking-[-0.01em] text-[#FCFCFC]">
              ${grandTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-[#383B42] pb-5">
            <span className="text-[#FCFCFC]">Status</span>
            <span className="rounded-md bg-[#153B26] px-3 py-1 text-xs font-medium text-[#86EFAC]">
              Success
            </span>
          </div>

          <Link
            href="/products"
            className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-orange px-4 py-4 font-medium text-[#262626] transition hover:brightness-105"
          >
            Continue Shopping
          </Link>
        </section>
      </div>
    </main>
  );
}
