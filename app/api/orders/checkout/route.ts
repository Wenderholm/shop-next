import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calculateGrandTotal } from "@/lib/checkout";

async function getUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  return userId ? Number(userId) : null;
}

export async function POST(request: Request) {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {
    protectionCount = 0,
    addressMode,
    country,
    makeMainAddress = false,
  } = await request.json();

  try {
    const order = await prisma.$transaction(async (tx) => {
      const cart = await tx.order.findFirst({
        where: { userId, status: "CART" },
        include: {
          orderItems: {
            include: { product: true },
          },
        },
      });

      if (!cart || cart.orderItems.length === 0) {
        throw new Error("CART_EMPTY");
      }

      const hasNotEnoughStock = cart.orderItems.some(
        (item) => item.quantity > item.product.stock,
      );

      if (hasNotEnoughStock) {
        throw new Error("NOT_ENOUGH_STOCK");
      }

      for (const item of cart.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      const subtotal = cart.orderItems.reduce(
        (sum, item) => sum + Number(item.priceAtPurchase) * item.quantity,
        0,
      );
      const grandTotal = calculateGrandTotal(subtotal, Number(protectionCount));

      const order = await tx.order.update({
        where: { id: cart.id },
        data: {
          status: "PAID",
          totalAmount: grandTotal,
        },
      });

      if (addressMode === "new" && makeMainAddress && country) {
        await tx.user.update({
          where: { id: userId },
          data: { address: String(country) },
        });
      }

      return order;
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "CART_EMPTY") {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    if (error instanceof Error && error.message === "NOT_ENOUGH_STOCK") {
      return NextResponse.json(
        { message: "Not enough stock" },
        { status: 400 },
      );
    }

    throw error;
  }
}
