import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "./_Navbar";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (!userId) return redirect("/");
  if (!user) return redirect("/onboarding");

  const safeUser = {
    name: user.name || "User",
    imageUrl: user.imageUrl || "/default-avatar.png",
  };

  return (
    <div className="app-layout">
      <Navbar user={safeUser} />
      <main>{children}</main>
    </div>
  );
}
