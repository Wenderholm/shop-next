import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfilePage from "@/components/profile/ProfilePage";
import { prisma } from "@/lib/prisma";

export default async function ProfileRoute() {
  const session = await auth();
  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(sessionUserId) },
    select: {
      firstName: true,
      email: true,
      address: true,
      orders: {
        where: { status: "PAID" },
        orderBy: { createdAt: "desc" },
        include: {
          orderItems: {
            orderBy: { id: "asc" },
            include: { product: { include: { category: true } } },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <ProfilePage
      user={{
        firstName: user.firstName,
        email: user.email,
        address: user.address,
      }}
      orders={user.orders.map((order) => ({
        ...order,
        totalAmount: order.totalAmount.toString(),
        orderItems: order.orderItems.map((item) => ({
          ...item,
          priceAtPurchase: item.priceAtPurchase.toString(),
        })),
      }))}
    />
  );
}
