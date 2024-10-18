import { cn } from "@/lib/utils";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={cn("w-full h-full flex justify-center")}>
      <section className="max-w-screen-sm w-full">{children}</section>
    </main>
  );
}

export default Layout;
