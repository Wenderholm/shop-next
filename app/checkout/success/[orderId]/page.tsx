import { redirect } from "next/navigation";

import { auth } from "@/auth";
import OrderSummaryPage from "@/components/cart/OrderSummaryPage";
import { prisma } from "@/lib/prisma";

interface OrderSummaryRouteProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSummaryRoute({ params }: OrderSummaryRouteProps) {
  const session = await auth();
  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    redirect("/login");
  }

  const { orderId } = await params;

  const order = await prisma.order.findFirst({
    where: {
      id: Number(orderId),
      userId: Number(sessionUserId),
      status: "PAID",
    },
    include: {
      orderItems: {
        orderBy: { id: "asc" },
        include: { product: { include: { category: true } } },
      },
    },
  });

  if (!order) {
    redirect("/cart");
  }

  return <OrderSummaryPage order={order} />;
}