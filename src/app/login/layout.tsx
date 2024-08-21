import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={cn("w-full h-dvh flex items-center justify-center")}>
      {children}
    </main>
  );
}
