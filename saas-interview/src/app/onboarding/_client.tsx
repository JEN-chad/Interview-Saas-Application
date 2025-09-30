"use client";

import { getUser } from "@/features/users/getUser";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export function OnBoardingClient({ userId }: {userId: string}) {
  
    const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(async () => {
       const user = await getUser(userId);
       if(user == null) return;

       router.replace("/app");
       return () => {clearInterval(intervalId)}
    }, 250);
  }, [userId, router]);

  return <Loader2Icon className="animate-spin size-24" />;
}
