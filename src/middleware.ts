import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";

const protectedRoutes = ["/", "/calendar", "/log"]; // 로그인이 필요한 페이지 목록
const publicRoutes = ["/login"]; // 로그인이 되면 접근할 수 없는 페이지 목록

export async function middleware(req: NextRequest) {
  await updateSession(req);

  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const currentPath: string = req.nextUrl.pathname;

  if (!user.data.user && protectedRoutes.includes(currentPath)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user.data.user && publicRoutes.includes(currentPath)) {
    const url = req.nextUrl.clone();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
