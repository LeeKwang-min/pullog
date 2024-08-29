import { cn } from "@/lib/utils";

function Layout({ children }: { children: React.ReactNode }) {
  return <main className={cn("w-full h-dvh")}>{children}</main>;
}

export default Layout;
