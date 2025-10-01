import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { OnBoardingClient } from "./_client";


export default async function onboardingPage() {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (userId == null) return redirect("/");
  if (user != null) return redirect("/app");
  return (
    <div className="flex flex-col items-center justify-center h-screen container gap-4">
      <h1 className="text-4xl">Creating Your Account...</h1>
      <OnBoardingClient userId={userId}/>
    </div>
  );
}
