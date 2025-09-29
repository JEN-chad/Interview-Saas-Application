import { ThemeToggle } from "@/components/ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex items-center gap-10">
      <SignInButton />
      <UserButton />
      <ThemeToggle />
    </div>
  );
}
