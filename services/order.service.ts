// services/order.service.ts

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

const orderInclude = Prisma.validator<Prisma.OrderInclude>()({
  orderItems: {
    orderBy: {
      id: "asc",
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  },
});

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: typeof orderInclude;
}>;

export async function getUserPaidOrders(userId: number) {
  return prisma.order.findMany({
    where: {
      userId,
      status: "PAID",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: orderInclude,
  });
}

export async function getPaidOrderById(orderId: number, userId: number) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
      status: "PAID",
    },
    include: orderInclude,
  });
}
