import type { Prisma } from "@/app/generated/prisma/client";

export const SHIPPING_PRICE = 5;
export const SHIPPING_INSURANCE = 6;
export const SERVICE_FEE = 0.5;

export type SerializedPrice = number | string;
export type PriceValue = SerializedPrice | Prisma.Decimal;

export type QuantityItem = {
  quantity: number;
};

export type PricedItem = QuantityItem & {
  priceAtPurchase: PriceValue;
};

export function calculateSubtotal(items: PricedItem[]) {
  return items.reduce(
    (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
    0,
  );
}

export function calculateItemCount(items: QuantityItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCheckoutFees(hasItems: boolean) {
  return {
    shippingPrice: hasItems ? SHIPPING_PRICE : 0,
    shippingInsurance: hasItems ? SHIPPING_INSURANCE : 0,
    serviceFee: hasItems ? SERVICE_FEE : 0,
  };
}

export function calculateGrandTotal(subtotal: number, protectionCount: number) {
  const { shippingPrice, shippingInsurance, serviceFee } = getCheckoutFees(
    subtotal > 0 || protectionCount > 0,
  );

  return (
    subtotal + protectionCount + shippingPrice + shippingInsurance + serviceFee
  );
}

export function calculateProtectionTotalFromGrandTotal(
  subtotal: number,
  grandTotal: number,
  hasItems: boolean,
) {
  const { shippingPrice, shippingInsurance, serviceFee } =
    getCheckoutFees(hasItems);

  return Math.max(
    grandTotal - subtotal - shippingPrice - shippingInsurance - serviceFee,
    0,
  );
}

export function buildInvoiceNumber(orderId: number, createdAt: Date) {
  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");
  const paddedId = String(orderId).padStart(4, "0");

  return `INV/${year}${month}${day}/${paddedId}`;
}
