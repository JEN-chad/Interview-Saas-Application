import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoUserTag } from "@/features/jobInfos/dbCache";
import { Card, CardContent } from "@/components/ui/card";

export default function AppPage() {
  return (
    <Suspense
      // The FALLBACK is what shows while waiting.
      fallback={
        <div className="flex justify-center items-center h-screen-header">
          <Loader2Icon className="animate-spin size-24" />
        </div>
      }
    >
      {/* The COMPONENT that loads data goes here as a CHILD. */}
      <JobInfos />
    </Suspense>
  );
}

//? Creating  a function to get all Jobinfos for a user

async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  const jobInfos = await getJobInfos(userId);
  if (jobInfos.length === 0) {
    return <NoJobInfos />;
  }
  return null;
}

function NoJobInfos() {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to HireMind AI
      </h1>
      <p className="text-muted-foreground mb-8">
        To get started, enter information about the type of job you are wanting
        to apply for. This can be specific information copied directly from a
        job listing or general information such as the tech stack you want to
        work in. The more specific you are in the description the closer the
        test interviews will be to the real thing.
      </p>
      <Card>
        <CardContent>
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}

//? Getting the Jobinfos by matching the userId with JobTable.userId

async function getJobInfos(userId: string) {
  "use cache";
  cacheTag(getJobInfoUserTag(userId));
  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
    orderBy: desc(JobInfoTable.updatedAt),
  });
}
