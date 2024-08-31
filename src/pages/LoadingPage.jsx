import { CircleCheck } from "lucide-react";

export function LoadingPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <CircleCheck className="animate-spin h-16 w-16" />
    </main>
  );
}
