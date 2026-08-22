import { prisma } from "@/lib/prisma";

export async function getBrands() {
  return prisma.brand.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

export async function getSearchBrands(category?: string) {
  return prisma.brand.findMany({
    where: category
      ? {
          products: {
            some: {
              category: {
                name: category,
              },
            },
          },
        }
      : undefined,

    select: {
      id: true,
      name: true,
    },
  });
}
