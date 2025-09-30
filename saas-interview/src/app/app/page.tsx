import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen-header">
          <Loader2Icon className="animate-spin size-24" />
        </div>
      }
    ></Suspense>
  );
}
