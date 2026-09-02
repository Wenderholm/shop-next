import { prisma } from "@/lib/prisma";

export async function getUserProfile(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      email: true,
      address: true,
    },
  });
}
