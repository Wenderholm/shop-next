export const SHIPPING_PRICE = 5;
export const SHIPPING_INSURANCE = 6;
export const SERVICE_FEE = 0.5;

export function calculateGrandTotal(subtotal: number, protectionCount: number) {
  return subtotal + protectionCount + SHIPPING_PRICE + SHIPPING_INSURANCE + SERVICE_FEE;
}

export function buildInvoiceNumber(orderId: number, createdAt: Date) {
  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");
  const paddedId = String(orderId).padStart(4, "0");

  return `INV/${year}${month}${day}/${paddedId}`;
}