import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CheckoutPage from "@/components/cart/CheckoutPage";
import { prisma } from "@/lib/prisma";

export default async function CheckoutRoute() {
  const session = await auth();
  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(sessionUserId) },
    select: { address: true },
  });

  return <CheckoutPage userCountry={user?.address ?? "Poland"} />;
}
