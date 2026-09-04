import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { calculateSubtotal } from "@/lib/checkout";

async function getUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  return userId ? Number(userId) : null;
}

async function recalculateTotal(orderId: number) {
  const items = await prisma.orderItem.findMany({ where: { orderId } });
  const totalAmount = calculateSubtotal(items);
  await prisma.order.update({ where: { id: orderId }, data: { totalAmount } });
}

export async function GET() {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  // cart pobranie koszyka z bazy danych dla zalogowanego użytkownika, jeśli nie ma koszyka to zwraca pusty koszyk
  // dane pobierane sa tak aby pobrać wszystkie produkty w koszyku wraz z ich kategoriami i posortowane po id
  const cart = await prisma.order.findFirst({
    where: { userId, status: "CART" },
    include: {
      orderItems: {
        orderBy: { id: "asc" },
        include: { product: { include: { category: true } } },
      },
    },
  });

  return NextResponse.json(cart ?? { orderItems: [], totalAmount: 0 });
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { productId, quantity = 1 } = await request.json();
  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });
  if (!product || quantity < 1 || quantity > product.stock) {
    return NextResponse.json(
      { message: "Invalid product or quantity" },
      { status: 400 },
    );
  }

  const cart = await prisma.order.findFirst({
    where: { userId, status: "CART" },
  });
  const order =
    cart ??
    (await prisma.order.create({
      data: { userId, status: "CART", totalAmount: 0 },
    }));
  const existingItem = await prisma.orderItem.findFirst({
    where: { orderId: order.id, productId: product.id },
  });
  const nextQuantity = (existingItem?.quantity ?? 0) + Number(quantity);
  if (nextQuantity > product.stock) {
    return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
  }

  if (existingItem) {
    await prisma.orderItem.update({
      where: { id: existingItem.id },
      data: { quantity: nextQuantity },
    });
  } else {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: product.id,
        quantity: Number(quantity),
        priceAtPurchase: product.price,
      },
    });
  }

  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id },
  });
  const totalAmount = calculateSubtotal(items);
  const updatedCart = await prisma.order.update({
    where: { id: order.id },
    data: { totalAmount },
  });
  return NextResponse.json(updatedCart, { status: 201 });
}

export async function PATCH(request: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { itemId, quantity } = await request.json();
  const item = await prisma.orderItem.findFirst({
    where: { id: Number(itemId), order: { userId, status: "CART" } },
    include: { product: true },
  });
  if (!item || quantity < 1 || quantity > item.product.stock)
    return NextResponse.json({ message: "Invalid quantity" }, { status: 400 });
  await prisma.orderItem.update({
    where: { id: item.id },
    data: { quantity: Number(quantity) },
  });
  await recalculateTotal(item.orderId);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { itemId } = await request.json();
  const item = await prisma.orderItem.findFirst({
    where: { id: Number(itemId), order: { userId, status: "CART" } },
  });
  if (!item)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  await prisma.orderItem.delete({ where: { id: item.id } });
  await recalculateTotal(item.orderId);
  return NextResponse.json({ success: true });
}
