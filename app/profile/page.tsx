import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfilePage from "@/components/profile/ProfilePage";
import { getUserProfile } from "@/services/user.service";
import { getUserPaidOrders } from "@/services/order.service";

export default async function ProfileRoute() {
  const session = await auth();
  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    redirect("/login");
  }

  const userId = Number(sessionUserId);

  const [user, orders] = await Promise.all([
    getUserProfile(userId),
    getUserPaidOrders(userId),
  ]);

  if (!user) {
    redirect("/login");
  }

  return <ProfilePage user={user} orders={orders} />;
}
