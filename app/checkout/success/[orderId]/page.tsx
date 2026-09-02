import { redirect } from "next/navigation";

import { auth } from "@/auth";
import OrderSummaryPage from "@/components/cart/OrderSummaryPage";
import { getPaidOrderById } from "@/services/order.service";

interface OrderSummaryRouteProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSummaryRoute({
  params,
}: OrderSummaryRouteProps) {
  const session = await auth();
  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    redirect("/login");
  }

  const { orderId } = await params;

  const order = await getPaidOrderById(Number(orderId), Number(sessionUserId));

  if (!order) {
    redirect("/cart");
  }

  return <OrderSummaryPage order={order} />;
}
